<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'Test It With Kashii API',
        'status' => 'online',
        'health_url' => '/api/health',
    ]);
});
