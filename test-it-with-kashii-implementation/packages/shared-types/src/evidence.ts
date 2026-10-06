export type EvidenceType =
  | 'screenshot'
  | 'dom_snapshot'
  | 'network_log'
  | 'console_log'
  | 'trace'
  | 'video'
  | 'har'
  | 'accessibility_tree';

export interface EvidenceContract {
  id: string;
  run_id: string;
  action_id?: string | null;
  type: EvidenceType;
  storage_key: string;
  mime_type?: string;
  size_bytes?: number;
  checksum?: string;
  metadata?: Record<string, unknown>;
  captured_at: string;
}
