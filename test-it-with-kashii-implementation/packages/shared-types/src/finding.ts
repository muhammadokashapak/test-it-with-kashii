export type FindingType =
  | 'FUNCTIONAL'
  | 'VISUAL'
  | 'NETWORK'
  | 'CONSOLE_ERROR'
  | 'PERFORMANCE'
  | 'ACCESSIBILITY'
  | 'SECURITY';

export type FindingSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type FindingStatus =
  | 'UNVERIFIED'
  | 'LIKELY'
  | 'CONFIRMED'
  | 'FLAKY'
  | 'REJECTED'
  | 'FIXED';

export interface FindingContract {
  id: string;
  project_id: string;
  test_run_id: string;
  title: string;
  description: string;
  type: FindingType;
  severity: FindingSeverity;
  confidence: number;
  status: FindingStatus;
  expected: string;
  actual: string;
  reproduction_steps: string[];
  evidence_ids: string[];
  affected_urls?: string[];
  root_cause_hint?: string | null;
  recommendation?: string | null;
  created_at: string;
  updated_at?: string;
}
