export const DEFAULT_PORTS = {
  WEB: 3000,
  API: 8000,
  ENGINE: 8001,
  BROWSER_WORKER: 8002,
  AI_GATEWAY: 8003,
  POSTGRES: 5432,
  REDIS: 6379,
  MINIO_API: 9000,
  MINIO_CONSOLE: 9001,
} as const;

export const DEFAULT_BUDGETS = {
  MAX_DURATION_SECONDS: 600,
  MAX_PAGES: 50,
  MAX_ACTIONS: 200,
  MAX_AI_CALLS: 100,
} as const;

export const LIFECYCLE_STATES = [
  'CREATED',
  'INITIALIZING',
  'ENVIRONMENT_CHECK',
  'DISCOVERING',
  'PLANNING',
  'EXECUTING',
  'VERIFYING',
  'ANALYZING',
  'REPORTING',
  'COMPLETED',
  'FAILED',
  'BLOCKED',
  'CANCELLED',
  'TIMEOUT',
  'PAUSED',
] as const;

export const ALLOWED_TOOLS = [
  'browser.navigate',
  'browser.click',
  'browser.fill',
  'browser.type',
  'browser.select',
  'browser.check',
  'browser.uncheck',
  'browser.hover',
  'browser.scroll',
  'browser.press',
  'browser.wait',
  'browser.upload',
  'browser.download',
  'browser.snapshot',
  'browser.dom',
  'browser.accessibility_snapshot',
  'browser.network',
  'browser.console',
  'browser.current_state',
] as const;
