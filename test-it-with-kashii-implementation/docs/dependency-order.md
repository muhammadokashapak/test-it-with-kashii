# Dependency Order

```text
Phase 0 Foundation
    ↓
Phase 1 Identity/Projects
    ↓
Phase 2 Requirements/Config
    ↓
Phase 3 Run Control + Contracts
    ↓
Phase 4 Engine Core
    ↓
Phase 5 Browser Worker
    ↓
Phase 6 Discovery/State
    ↓
Phase 7 Planner/Scenarios
    ↓
Phase 8 Evidence/Assertions
    ↓
Phase 9 AI Agent
    ↓
Phase 10 Verification/Findings
    ↓
Phase 11 Reporting
    ↓
Phase 12 Regression
    ↓
Phase 13 Test Lab
    ↓
Phase 14 Security/Observability
    ↓
Phase 15 Production
    ↓
Phase 16 V2
    ↓
Phase 17 V3
```

Parallel work becomes safe after Phase 3 when contracts are stable:
- frontend UI
- engine internals
- browser worker
- API resources
- test fixtures

But cross-service integration should always use versioned contracts.
