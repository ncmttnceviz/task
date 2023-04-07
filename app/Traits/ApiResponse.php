<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use function response;

trait ApiResponse
{
    private ?string $message = null;
    private ?string $errorCode = null;
    private array $data = [];
    private ?int $statusCode = null;

    /**
     * @param array $data
     * @param string|null $message
     * @param int|null $status
     * @return JsonResponse
     */
    public function success(array $data = [], string $message = null, int $status = null): JsonResponse
    {
        $this->data = $data['data'] ?? $data;
        $this->message = $message;
        $this->statusCode = $status ?: Response::HTTP_OK;

        return $this->response();
    }

    /**
     * @param array $data
     * @param string|null $message
     * @return JsonResponse
     */
    public function successCreate(array $data = [], string $message = null): JsonResponse
    {
        $this->message = $message;
        $this->data = $data['data'] ?? $data;
        $this->statusCode = Response::HTTP_CREATED;

        return $this->response();
    }

    /**
     * @param string $message
     * @param string $errorCode
     * @param array $data
     * @param int $statusCode
     * @return JsonResponse
     */
    public function error(string $message, string $errorCode, array $data = [], int $statusCode = Response::HTTP_BAD_REQUEST): JsonResponse
    {
        $this->message = $message;
        $this->data = $data;
        $this->statusCode = $statusCode;
        $this->errorCode = $errorCode;

        return $this->response();
    }

    /**
     * @param array $errors
     * @param string|null $errorMessage
     * @return JsonResponse
     */
    public function errorValidation(array $errors, string $errorMessage = null): JsonResponse
    {
        $this->statusCode = Response::HTTP_UNPROCESSABLE_ENTITY;
        $this->data = $errors;
        $this->message = $errorMessage;

        return $this->response();
    }

    /**
     * @return JsonResponse
     */
    private function response(): JsonResponse
    {
        return response()->json([
            'message' => $this->message,
            'errorCode' => $this->errorCode,
            'data' => $this->data
        ], $this->statusCode);
    }
}
