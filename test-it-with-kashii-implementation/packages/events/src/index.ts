export const KashiiEvents = {
  TEST_RUN_CREATED: 'test.run.created',
  TEST_RUN_INITIALIZED: 'test.run.initialized',
  TEST_RUN_ENVIRONMENT_CHECK: 'test.run.environment_check',
  TEST_RUN_DISCOVERING: 'test.run.discovering',
  TEST_RUN_PLANNING: 'test.run.planning',
  TEST_RUN_EXECUTING: 'test.run.executing',
  TEST_RUN_VERIFYING: 'test.run.verifying',
  TEST_RUN_ANALYZING: 'test.run.analyzing',
  TEST_RUN_REPORTING: 'test.run.reporting',
  TEST_RUN_COMPLETED: 'test.run.completed',
  TEST_RUN_FAILED: 'test.run.failed',
  TEST_RUN_CANCELLED: 'test.run.cancelled',
  TEST_RUN_PAUSED: 'test.run.paused',
  TEST_RUN_RESUMED: 'test.run.resumed',

  ACTION_REQUESTED: 'action.requested',
  ACTION_EXECUTING: 'action.executing',
  ACTION_COMPLETED: 'action.completed',
  ACTION_FAILED: 'action.failed',

  EVIDENCE_CAPTURED: 'evidence.captured',
  ASSERTION_EVALUATED: 'assertion.evaluated',

  FINDING_DISCOVERED: 'finding.discovered',
  FINDING_VERIFIED: 'finding.verified',

  WORKER_HEARTBEAT: 'worker.heartbeat',
} as const;

export type KashiiEventName = (typeof KashiiEvents)[keyof typeof KashiiEvents];

export interface BaseEvent<T = Record<string, unknown>> {
  id: string;
  name: KashiiEventName;
  run_id: string;
  timestamp: string;
  payload: T;
}
