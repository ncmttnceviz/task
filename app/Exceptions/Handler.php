<?php

namespace App\Exceptions;

use App\Traits\ApiResponse;
use ErrorException;
use Illuminate\Contracts\Container\Container;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Mockery\Exception;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class Handler extends ExceptionHandler
{
    use ApiResponse;

    private Request $request;

    /**
     * @param Container $container
     * @param Request $request
     */
    public function __construct(Container $container, Request $request)
    {
        $this->request = $request;
        parent::__construct($container);
    }

    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (ErrorException $e) {
            $this->render($this->request, $e);
        });

        $this->reportable(function (Exception $e) {
            $this->render($this->request, $e);
        });
    }

    /**
     * @param $exception
     * @return JsonResponse
     */
    private function errorResponse($exception): JsonResponse
    {
        if ($exception instanceof ValidationException) {
            return $this->errorValidation($exception->errors(), 'ERHLVL');
        }

        if (env('APP_DEBUG')) {
            return response()->json([
                'message' => $exception->getMessage(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'trace' => $exception->getTrace()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->error('Something Went Wrong', 'ERH500', [], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function render($request, Throwable $e): \Illuminate\Http\Response|JsonResponse|Response
    {
        return $this->errorResponse($e);
    }
}
