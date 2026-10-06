# Testing Strategy

## Kashii itself

Unit:
- state transitions
- budget manager
- policy engine
- schemas
- severity/confidence calculations

Integration:
- Laravel ↔ PostgreSQL
- Laravel ↔ Redis
- engine ↔ browser worker
- engine ↔ AI gateway
- artifact storage

E2E:
- create project
- create environment
- start run
- discover target
- execute scenario
- collect evidence
- create finding
- report
- regression compare

Security:
- cross-tenant access
- domain escape
- secret leakage
- prompt injection
- destructive action policy

## Test Lab

Every fixture should document:
- expected defect
- setup
- reproduction
- expected Kashii finding
- expected severity
- evidence required

CI should gate releases on critical fixture detection plus false-positive/performance thresholds.
