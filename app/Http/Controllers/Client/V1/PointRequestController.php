<?php

namespace App\Http\Controllers\Client\V1;

use App\Http\Controllers\Controller;
use App\Services\PointRequestService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function makeRequest(Request $request): JsonResponse
    {
        $validate = Validator::make($request->all(), [
            'point' => 'required|int'
        ]);

        if ($request->get('point') < 1 ) {
            return $this->error('Must be at least 1 point', 'PRCFMR');
        }

        if ($validate->fails()) {
            return $this->errorValidation($validate->errors()->toArray());
        }

        if (!is_null($this->pointRequestService->checkPendingRequestByMemberId($request->user('client')->id))) {
            return $this->error('You have a request pending approval. You cannot create a new request right now', 'PRCFMR1');
        }

        $this->pointRequestService->createRequest($request);

        return $this->successCreate([], 'Request Made');
    }

}
