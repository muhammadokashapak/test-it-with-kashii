# Run State Machine

CREATED
→ INITIALIZING
→ ENVIRONMENT_CHECK
→ DISCOVERING
→ PLANNING
→ EXECUTING
→ VERIFYING
→ ANALYZING
→ REPORTING
→ COMPLETED

Alternative terminal states:
FAILED
BLOCKED
CANCELLED
TIMEOUT

Rules:
1. Persist every transition.
2. Reject invalid transitions.
3. Transitions are idempotent by event/run version.
4. Cancellation has priority over new work.
5. A timeout produces evidence and an explicit reason.
