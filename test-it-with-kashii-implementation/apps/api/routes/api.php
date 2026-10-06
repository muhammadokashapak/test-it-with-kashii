<?php

use App\Http\Controllers\HealthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Health and core control plane endpoints for Test It With Kashii.
|
*/

Route::get('/health', [HealthController::class, 'health']);
Route::get('/ping', [HealthController::class, 'ping']);
Route::get('/status', [HealthController::class, 'status']);
