<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Throwable;

class HealthController extends Controller
{
    public function health(): JsonResponse
    {
        $startTime = microtime(true);
        $dependencies = [];
        $isHealthy = true;

        // Database health check
        $dbStart = microtime(true);
        try {
            DB::connection()->getPdo();
            $dbLatency = round((microtime(true) - $dbStart) * 1000, 2);
            $dependencies['database'] = [
                'status' => 'ok',
                'latency_ms' => $dbLatency,
                'message' => 'Database connection successful',
            ];
        } catch (Throwable $e) {
            $isHealthy = false;
            $dependencies['database'] = [
                'status' => 'down',
                'latency_ms' => round((microtime(true) - $dbStart) * 1000, 2),
                'message' => $e->getMessage(),
            ];
        }

        // Redis health check
        $redisStart = microtime(true);
        try {
            if (extension_loaded('redis')) {
                Redis::connection()->ping();
                $redisLatency = round((microtime(true) - $redisStart) * 1000, 2);
                $dependencies['redis'] = [
                    'status' => 'ok',
                    'latency_ms' => $redisLatency,
                    'message' => 'Redis connection successful',
                ];
            } else {
                $dependencies['redis'] = [
                    'status' => 'degraded',
                    'message' => 'Redis extension not loaded on host, using mock/array queue',
                ];
            }
        } catch (Throwable $e) {
            $dependencies['redis'] = [
                'status' => 'degraded',
                'latency_ms' => round((microtime(true) - $redisStart) * 1000, 2),
                'message' => $e->getMessage(),
            ];
        }

        // Storage check
        $storageStart = microtime(true);
        try {
            Storage::disk('local')->put('.health_check', 'ok');
            Storage::disk('local')->delete('.health_check');
            $dependencies['storage'] = [
                'status' => 'ok',
                'latency_ms' => round((microtime(true) - $storageStart) * 1000, 2),
                'message' => 'Storage accessible',
            ];
        } catch (Throwable $e) {
            $dependencies['storage'] = [
                'status' => 'degraded',
                'message' => $e->getMessage(),
            ];
        }

        $statusCode = $isHealthy ? 200 : 503;

        return response()->json([
            'service' => 'kashii-api',
            'status' => $isHealthy ? 'healthy' : 'degraded',
            'version' => '0.1.0',
            'timestamp' => now()->toIso8601String(),
            'execution_time_ms' => round((microtime(true) - $startTime) * 1000, 2),
            'dependencies' => $dependencies,
        ], $statusCode);
    }

    public function ping(): JsonResponse
    {
        return response()->json([
            'pong' => true,
            'service' => 'kashii-api',
            'timestamp' => now()->toIso8601String(),
        ]);
    }

    public function status(): JsonResponse
    {
        return response()->json([
            'platform' => 'Test It With Kashii',
            'role' => 'Control Plane API',
            'version' => '0.1.0',
            'phase' => 'Phase 0 — Foundation',
            'status' => 'operational',
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
