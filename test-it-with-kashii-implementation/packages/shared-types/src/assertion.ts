export type AssertionType =
  | 'element_exists'
  | 'element_visible'
  | 'text_matches'
  | 'url_matches'
  | 'navigation_succeeds'
  | 'api_status'
  | 'response_schema'
  | 'download_exists'
  | 'file_contents'
  | 'state_changed';

export type AssertionStatus = 'PASS' | 'FAIL' | 'SKIPPED';

export interface AssertionContract {
  id: string;
  run_id: string;
  action_id?: string | null;
  scenario_id?: string | null;
  assertion_type: AssertionType;
  expected: Record<string, unknown>;
  actual: Record<string, unknown>;
  status: AssertionStatus;
  evidence_ids?: string[];
  created_at: string;
}
