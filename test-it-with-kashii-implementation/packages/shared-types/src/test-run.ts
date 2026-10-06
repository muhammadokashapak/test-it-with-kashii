export type TestRunStatus =
  | 'CREATED'
  | 'INITIALIZING'
  | 'ENVIRONMENT_CHECK'
  | 'DISCOVERING'
  | 'PLANNING'
  | 'EXECUTING'
  | 'VERIFYING'
  | 'ANALYZING'
  | 'REPORTING'
  | 'COMPLETED'
  | 'FAILED'
  | 'BLOCKED'
  | 'CANCELLED'
  | 'TIMEOUT'
  | 'PAUSED';

export interface TestRunBudget {
  max_duration_seconds: number;
  max_pages: number;
  max_actions: number;
  max_ai_calls: number;
}

export interface TestRunConfiguration {
  target_url: string;
  allowed_domains: string[];
  browser?: 'chromium' | 'firefox' | 'webkit';
  viewport?: { width: number; height: number };
  risk_level?: 'LOW' | 'MEDIUM' | 'HIGH';
  allow_destructive?: boolean;
  max_duration_seconds?: number;
  auth_config?: Record<string, unknown>;
}

export interface TestRunContract {
  id: string;
  project_id: string;
  environment_id: string;
  suite_id?: string | null;
  configuration_id?: string | null;
  configuration?: TestRunConfiguration;
  status: TestRunStatus;
  budget?: TestRunBudget;
  failure_reason?: string | null;
  created_at: string;
  started_at?: string | null;
  completed_at?: string | null;
}
