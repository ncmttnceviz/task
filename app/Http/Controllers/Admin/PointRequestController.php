<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\PointRequestService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PointRequestController extends Controller
{
    use ApiResponse;

    private PointRequestService $pointRequestService;

    /**
     * @param PointRequestService $pointRequestService
     */
    public function __construct(PointRequestService $pointRequestService)
    {
        $this->pointRequestService = $pointRequestService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function readAll(Request $request): JsonResponse
    {
        $request->query->set('state', [0]);
        $data = $this->pointRequestService->filter($request);

        return $this->success($data);
    }

    /**
     * @param int $requestId
     * @param int $point
     * @param int $state
     * @param Request $request
     * @return JsonResponse
     */
    public function updateState(int $requestId, int $point, int $state, Request $request): JsonResponse
    {
        if ($point < 1) {
            return $this->error('Must be at least 1 point', 'PRCFUS1');
        }

        $user = $request->user('admin');

        if (!array_key_exists($state, PointRequestService::REQUEST_STATE_MAP)) {
            return $this->error('İnvalid State', 'PRCFUS');
        }

        $this->pointRequestService->updateRequestState($requestId, $point, $state, $user->id);

        return $this->success([], 'Request Updated');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function filter(Request $request): JsonResponse
    {
        $request->query->set('state', [1, 2]);
        $data = $this->pointRequestService->filter($request);

        return $this->success($data);
    }
}
