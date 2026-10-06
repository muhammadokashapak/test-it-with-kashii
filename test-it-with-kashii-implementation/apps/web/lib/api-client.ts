export interface ServiceHealthResponse {
  service: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  timestamp: string;
  execution_time_ms?: number;
  dependencies?: Record<string, {
    status: 'ok' | 'degraded' | 'down';
    latency_ms?: number;
    message?: string;
  }>;
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchApiHealth(): Promise<ServiceHealthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/health`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`API health check returned status ${res.status}`);
  }
  return res.json();
}

export async function fetchApiPing(): Promise<{ pong: boolean; service: string; timestamp: string }> {
  const res = await fetch(`${API_BASE_URL}/api/ping`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`API ping returned status ${res.status}`);
  }
  return res.json();
}

export async function fetchApiStatus(): Promise<Record<string, unknown>> {
  const res = await fetch(`${API_BASE_URL}/api/status`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`API status returned status ${res.status}`);
  }
  return res.json();
}
