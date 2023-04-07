<?php

namespace App\Repository;

use App\Models\PointRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PointRequestRepository extends AbstractRepository
{
    public function __construct()
    {
        parent::__construct(PointRequest::class);
    }

    /**
     * @param array $params
     * @param int $offset
     * @param int $limit
     * @return LengthAwarePaginator
     */
    public function filter(array $params, int $offset, int $limit): LengthAwarePaginator
    {
        $query = $this->getQueryBuilder()
            ->select('point_requests.id', 'point_requests.desired_point', 'point_requests.added_point', 'point_requests.state', 'point_requests.created_at', 'members.name', 'users.name as admin', 'flags.color_code as flag')
            ->join('members', 'point_requests.member_id', '=', 'members.id')
            ->leftJoin('users', 'point_requests.user_id', '=', 'users.id')
            ->leftJoin('flags', 'members.flag_id', '=', 'flags.id');
        if (isset($params['user_id'])) {
            $query->where('users.id', '=', $params['user_id']);
        }
        if (isset($params['state'])) {
            $query->whereIn('point_requests.state', $params['state']);
        }
        if (isset($params['username'])) {
            $query->where('members.name', 'Ilike', '%' . $params['username'] . '%');
        }
        if (isset($params['flag'])) {
            $query->where('members.flag_id', '=', $params['flag']);
        }

        return $query->orderBy('point_requests.id', 'DESC')->offset($offset)->paginate($limit);
    }


    /**
     * @param int $memberId
     * @param int $desiredPoint
     * @param int $state
     * @return bool
     */
    public function create(int $memberId, int $desiredPoint, int $state): bool
    {
        return $this->getQueryBuilder()
            ->insert([
                'member_id' => $memberId,
                'desired_point' => $desiredPoint,
                'state' => $state,
                'created_at' => now()
            ]);
    }

    /**
     * @param int $id
     * @param int $addedPoint
     * @param int $state
     * @param int $userId
     * @return int
     */
    public function update(int $id, int $addedPoint, int $state, int $userId): int
    {
        return $this->getQueryBuilder()
            ->where('id', '=', $id)
            ->update([
                'state' => $state,
                'added_point' => $addedPoint,
                'user_id' => $userId
            ]);
    }

    /**
     * @param int $memberId
     * @param int $state
     * @return object|null
     */
    public function findOnePendingRequestByMemberAndState(int $memberId, int $state): ?object
    {
        return $this->getQueryBuilder()
            ->where('state', '=', $state)
            ->where('member_id', '=', $memberId)
            ->first();
    }
}
