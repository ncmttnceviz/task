<?php

namespace App\Http\Controllers\Client\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\MemberService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use UnexpectedValueException;

class AuthController extends Controller
{
    use ApiResponse;

    private MemberService $memberService;

    public function __construct(MemberService $memberService)
    {
        $this->memberService = $memberService;
    }

    /**
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $response = $this->memberService->login($request->get('email'), $request->get('password'));
        } catch (UnexpectedValueException $exception) {
            return $this->error($exception->getMessage(), 'AUCFLN');
        }

        return $this->success($response, 'Login Success');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $validate = Validator::make($request->all(), [
            'email' => ['required', 'email', Rule::unique('members')],
            'password' => 'required|min:8|max:16|confirmed',
            'firstName' => 'required|min:3',
            'lastName' => 'required|min:2'
        ]);

        if ($validate->fails()) {
            return $this->errorValidation($validate->errors()->toArray());
        }

        $this->memberService->register($request);

        return $this->successCreate([], 'Register Success');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user('client')->token()->revoke();
        return $this->success();
    }
}
