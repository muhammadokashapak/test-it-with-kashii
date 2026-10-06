<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthTest extends TestCase
{
    public function test_api_ping_returns_pong(): void
    {
        $response = $this->getJson('/api/ping');

        $response->assertStatus(200)
            ->assertJson([
                'pong' => true,
                'service' => 'kashii-api',
            ]);
    }

    public function test_api_status_returns_operational(): void
    {
        $response = $this->getJson('/api/status');

        $response->assertStatus(200)
            ->assertJson([
                'platform' => 'Test It With Kashii',
                'role' => 'Control Plane API',
                'status' => 'operational',
            ]);
    }

    public function test_api_health_endpoint(): void
    {
        $response = $this->getJson('/api/health');

        $this->assertContains($response->status(), [200, 503]);
        $response->assertJsonStructure([
            'service',
            'status',
            'version',
            'timestamp',
            'execution_time_ms',
            'dependencies' => [
                'database',
                'redis',
                'storage',
            ],
        ]);
    }
}
