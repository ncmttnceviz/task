<?php

namespace App\Repository;

use App\Models\Member;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

class MemberRepository extends AbstractRepository
{
    public function __construct()
    {
        parent::__construct(Member::class);
    }

    /**
     * @param string $email
     * @return object|null
     */
    public function findByEmail(string $email): ?object
    {
        return $this->getQueryBuilder()
            ->where('email', '=', $email)
            ->first();
    }

    /**
     * @param int $id
     * @param int $point
     * @return int
     */
    public function addPoint(int $id, int $point): int
    {
        return $this->getQueryBuilder()
            ->find($id)
            ->increment('point', $point);
    }

    /**
     * @param int $id
     * @return Model|null
     */
    public function findById(int $id): ?Model
    {
        return $this->getQueryBuilder()->find($id);
    }

    /**
     * @param string $name
     * @param string $email
     * @param string $password
     * @return bool
     */
    public function create(string $name, string $email, string $password): bool
    {
        return $this->getQueryBuilder()
            ->insert([
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'created_at' => now()
            ]);
    }

    /**
     * @param int $offset
     * @param int $limit
     * @param int|null $state
     * @return LengthAwarePaginator
     */
    public function filter(int $offset, int $limit, int $state = null): LengthAwarePaginator
    {
        $query = $this->getQueryBuilder()
            ->select('members.id', 'members.name' ,'members.email', 'flags.title as flag_name', 'flags.id as flag_id')
            ->leftJoin('flags', 'members.flag_id', '=', 'flags.id');

        if (!is_null($state)) {
            $query->where('state', '=', $state);
        }

        return $query->orderBy('id', 'DESC')->offset($offset)->paginate($limit);
    }

    /**
     * @param int $id
     * @param int|null $flagId
     * @return int
     */
    public function updateFlagByMemberId(int $id, ?int $flagId) : int
    {
        return $this->getQueryBuilder()
            ->where('id', '=', $id)
            ->update([
                'flag_id' => $flagId,
                'updated_at' => now()
            ]);
    }


}
