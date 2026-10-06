export type AgentToolName =
  | 'browser.navigate'
  | 'browser.click'
  | 'browser.fill'
  | 'browser.type'
  | 'browser.select'
  | 'browser.check'
  | 'browser.uncheck'
  | 'browser.hover'
  | 'browser.scroll'
  | 'browser.press'
  | 'browser.wait'
  | 'browser.upload'
  | 'browser.download'
  | 'browser.snapshot'
  | 'browser.dom'
  | 'browser.accessibility_snapshot'
  | 'browser.network'
  | 'browser.console'
  | 'browser.current_state';

export interface PolicyContext {
  allowed_domains: string[];
  max_risk_level?: string;
  allow_destructive?: boolean;
}

export interface AgentToolContract {
  request_id: string;
  tool: AgentToolName;
  arguments: Record<string, unknown>;
  context?: Record<string, unknown>;
  policy_context?: PolicyContext;
}

export interface AgentToolResultContract {
  request_id: string;
  tool: AgentToolName;
  success: boolean;
  result?: Record<string, unknown>;
  error?: string | null;
  evidence_ids?: string[];
  timestamp: string;
}
