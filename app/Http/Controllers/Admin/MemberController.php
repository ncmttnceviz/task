<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\MemberService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    use ApiResponse;

    private MemberService $memberService;

    /**
     * @param MemberService $memberService
     */
    public function __construct(MemberService $memberService)
    {
        $this->memberService = $memberService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function readAll(Request $request) : JsonResponse
    {
        $data = $this->memberService->readAll($request->get('page',1));

        return $this->success($data);
    }

    /**
     * @param int $memberId
     * @param int $flagId
     * @return JsonResponse
     */
    public function updateFlag(int $memberId, int $flagId) : JsonResponse
    {
        $this->memberService->updateFlag($memberId, $flagId);

        return $this->success([], 'Flag Updated');
    }
}
