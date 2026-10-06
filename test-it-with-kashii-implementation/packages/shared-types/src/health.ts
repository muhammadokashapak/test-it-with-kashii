export type ServiceHealthStatus = 'healthy' | 'degraded' | 'unhealthy';
export type DependencyStatus = 'ok' | 'degraded' | 'down';

export interface DependencyHealth {
  status: DependencyStatus;
  latency_ms?: number;
  message?: string;
}

export interface HealthCheckContract {
  service: string;
  status: ServiceHealthStatus;
  version?: string;
  timestamp: string;
  uptime_seconds?: number;
  dependencies?: Record<string, DependencyHealth>;
}
