export type ActionType =
  | 'navigate'
  | 'click'
  | 'type'
  | 'fill'
  | 'select'
  | 'check'
  | 'uncheck'
  | 'hover'
  | 'scroll'
  | 'press'
  | 'wait'
  | 'upload'
  | 'download';

export type ActionStatus = 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'SKIPPED';

export interface ActionTarget {
  selector?: string;
  url?: string;
  coordinates?: { x: number; y: number };
}

export interface ActionError {
  message: string;
  stack?: string;
  code?: string;
}

export interface ActionContract {
  id: string;
  run_id: string;
  browser_session_id?: string | null;
  scenario_id?: string | null;
  sequence_no: number;
  type: ActionType;
  target: ActionTarget;
  parameters?: Record<string, unknown>;
  result?: Record<string, unknown> | null;
  status: ActionStatus;
  error?: ActionError | null;
  started_at: string;
  completed_at?: string | null;
}
