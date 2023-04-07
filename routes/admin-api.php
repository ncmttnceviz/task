<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/auth')->controller(\App\Http\Controllers\Admin\AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth.admin');
});

Route::prefix('/flags')->middleware('auth.admin')->controller(\App\Http\Controllers\Admin\FlagController::class)->group(function () {
    Route::get('/', 'readAll');
    Route::post('/', 'create');
});

Route::prefix('/members')->middleware('auth.admin')->controller(\App\Http\Controllers\Admin\MemberController::class)->group(function () {
    Route::get('/', 'readAll');
    Route::put('{memberId}/flag/{flagId}', 'updateFlag');
});

Route::prefix('/point_requests')->middleware('auth.admin')->controller(\App\Http\Controllers\Admin\PointRequestController::class)->group(function () {
    Route::get('/', 'readAll');
    Route::put('/{requestId}/point/{point}/state/{state}', 'updateState');
    Route::post('/', 'filter');
});

Route::prefix('/users')->middleware('auth.admin')->controller(\App\Http\Controllers\Admin\UserController::class)->group(function () {
    Route::get('/', 'readAll');
});

