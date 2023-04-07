<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\FlagService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FlagController extends Controller
{
    use ApiResponse;

    private FlagService $flagService;

    /**
     * @param FlagService $flagService
     */
    public function __construct(FlagService $flagService)
    {
        $this->flagService = $flagService;
    }

    /**
     * @return JsonResponse
     */
    public function readAll() : JsonResponse
    {
        $data = $this->flagService->getAll();

        return $this->success($data);
    }

    public function create(Request $request) : JsonResponse
    {
        $validate = Validator::make($request->all(),[
            'title' => 'required|string',
            'colorCode' => 'required|string'
        ]);

        if ($validate->fails()) {
            return $this->errorValidation($validate->errors()->toArray());
        }

        $this->flagService->createFlag($request);

        return $this->successCreate([], 'Successfully added');
    }
}
