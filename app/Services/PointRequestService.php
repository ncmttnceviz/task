<?php

namespace App\Services;

use App\Repository\PointRequestRepository;
use Illuminate\Http\Request;


class PointRequestService
{
    const PAGINATION_LIMIT = 25;
    const REQUEST_STATE_PENDING = 0;
    const REQUEST_STATE_APPROVED = 1;
    const REQUEST_STATE_REJECTED = 2;

    const REQUEST_STATE_MAP = [
        self::REQUEST_STATE_PENDING => 'Pending',
        self::REQUEST_STATE_APPROVED => 'Approved',
        self::REQUEST_STATE_REJECTED => 'Rejected'
    ];

    private PointRequestRepository $pointRequestRepository;

    /**
     * @param PointRequestRepository $pointRequestRepository
     */
    public function __construct(PointRequestRepository $pointRequestRepository)
    {
        $this->pointRequestRepository = $pointRequestRepository;
    }

    /**
     * @param Request $request
     * @return array
     */
    public function filter(Request $request): array
    {
        $offset = ($request->query->getInt('page', 1) - 1) * self::PAGINATION_LIMIT;
        $data = $this->pointRequestRepository->filter($request->all(), $offset, self::PAGINATION_LIMIT)->toArray();

        return [
            'requests' => $data['data'],
            'total' => $data['total'],
            'per_page' => $data['per_page']
        ];
    }

    /**
     * @param Request $request
     * @return bool
     */
    public function createRequest(Request $request): bool
    {
        return $this->pointRequestRepository->create($request->user('client')->id, $request->get('point'), self::REQUEST_STATE_PENDING);
    }

    /**
     * @param int $memberId
     * @return object|null
     */
    public function checkPendingRequestByMemberId(int $memberId): ?object
    {
        return $this->pointRequestRepository->findOnePendingRequestByMemberAndState($memberId, self::REQUEST_STATE_PENDING);
    }

    /**
     * @param int $requestId
     * @param int $point
     * @param int $state
     * @param int $userId
     * @return int
     */
    public function updateRequestState(int $requestId, int $point, int $state, int $userId): int
    {
        return $this->pointRequestRepository->update($requestId, $point, $state, $userId);
    }
}
