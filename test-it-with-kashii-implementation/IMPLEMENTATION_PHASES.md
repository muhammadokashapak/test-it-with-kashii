# Phase-by-Phase Implementation Plan

## Phase 0 — Foundation
**Goal:** Create a reproducible monorepo and local development environment.

Deliver:
- Repository structure
- Environment configuration
- Shared TypeScript/Python contracts
- Docker Compose
- PostgreSQL + Redis
- Basic Laravel API
- Basic Next.js shell
- Health endpoints
- Logging conventions
- CI skeleton

Acceptance:
- One command starts local dependencies.
- API health and worker health are observable.
- Frontend reaches backend through configured API URL.
- Shared contracts build successfully.

## Phase 1 — Identity / Organization / Project
**Goal:** Establish SaaS ownership and authorization boundaries.

Deliver:
- Users
- Sessions/authentication
- Roles and permissions
- Organizations
- Teams
- Projects
- Environments
- Allowed domains
- Audit foundation

Acceptance:
- User can create/select organization and project.
- Project belongs to exactly one organization.
- Environment belongs to project.
- Unauthorized users cannot access another organization's resources.

## Phase 2 — Requirements + Test Configuration
**Goal:** Turn project intent into executable test objectives.

Deliver:
- Requirement upload/storage
- Requirement parser abstraction
- Acceptance criteria
- Test objectives
- Test configuration
- Browser/viewports
- Scope
- max duration/actions/pages/AI calls
- risk/destructive policy
- authentication/test-data references

Acceptance:
- A requirement can become a test objective.
- A TestRun configuration can be validated before execution.
- Credentials are referenced, never placed into normal AI context.

## Phase 3 — Test Run Control Plane
**Goal:** Build reliable execution lifecycle.

Deliver:
- TestRun model
- State machine
- Laravel jobs
- Redis queues
- pause/resume/cancel
- worker heartbeat
- event contracts
- API contracts

States:
CREATED → INITIALIZING → ENVIRONMENT_CHECK → DISCOVERING → PLANNING → EXECUTING → VERIFYING → ANALYZING → REPORTING → COMPLETED

Terminal alternatives:
FAILED, BLOCKED, CANCELLED, TIMEOUT

Acceptance:
- Run can be created and queued.
- Worker consumes it.
- State transitions are persisted.
- Cancel/pause/resume are safe and idempotent.

## Phase 4 — Kashii Engine Core
**Goal:** Build the orchestration brain independent of UI.

Modules:
- RunManager
- StateManager
- ExecutionManager
- BudgetManager
- ContextManager
- EventManager
- EnvironmentAnalyzer

Acceptance:
- Engine can execute a deterministic mock run.
- Budget exhaustion ends safely.
- Repeated-state detection prevents infinite loops.
- Environment failure is distinguished from application failure.

## Phase 5 — Browser Worker
**Goal:** Give Kashii controlled browser hands.

Deliver:
- Playwright
- Chromium
- BrowserManager
- ContextManager
- PageManager
- NetworkManager
- ConsoleManager
- StorageManager
- DownloadManager
- UploadManager
- TraceManager

Actions:
navigate, click, fill, type, select, check, uncheck, hover, scroll, press, wait, upload, download.

Acceptance:
- Worker can launch isolated browser context.
- Actions produce structured action results.
- Browser crashes do not corrupt global run state.
- Allowed-domain policy is enforced.

## Phase 6 — Discovery + Application Graph
**Goal:** Understand application structure before intelligent testing.

Discover:
- routes
- links
- buttons
- forms
- inputs
- menus
- modals
- tables
- filters
- search
- tabs
- interactive components

State fingerprint:
URL + DOM fingerprint + visible elements + form state + auth state + filters + modal state + application data.

Acceptance:
- Target produces an application graph.
- Duplicate states can be identified.
- Discovery evidence is stored.

## Phase 7 — Planning + Scenario Generation
**Goal:** Convert discovered capabilities and requirements into test scenarios.

Scenarios:
- happy path
- negative path
- boundary
- empty input
- invalid input
- duplicate action
- unexpected sequence
- navigation
- state transition

Form engine:
- field type
- required
- validation
- min/max
- pattern
- placeholder
- label
- semantic meaning

Acceptance:
- Planner prioritizes critical/high-risk workflows.
- Scenario objects are deterministic and versioned.
- Each scenario has objective, preconditions, actions, expected outcomes.

## Phase 8 — Evidence + Assertions
**Goal:** Make every important conclusion evidence-driven.

Evidence:
- screenshot
- DOM
- network
- console
- trace
- video
- URL
- timing
- page state
- API response
- accessibility snapshot

Assertions:
- element exists
- element visible
- text matches
- URL matches
- navigation succeeds
- API status
- response schema
- download exists
- file contents
- state changed

Acceptance:
- Evidence is timestamped and tied to TestRun/Action.
- Assertions return PASS/FAIL/SKIPPED with evidence references.
- Network and console data can be correlated with UI actions.

## Phase 9 — AI Agent + Tool Gateway
**Goal:** Add controlled reasoning without giving AI unrestricted computer access.

AI context:
- current state
- available actions
- requirements
- previous actions
- evidence
- objective
- budget

Tool pipeline:
AI → tool request → schema validation → safety policy → permission check → execution → evidence → AI

Agents:
- Planner
- Explorer
- Scenario Generator
- Analyzer
- Finding Interpreter
- Reporter

Acceptance:
- AI cannot directly execute arbitrary browser operations.
- Every tool call validates schema and permissions.
- Tool calls are logged.
- Website content is treated as untrusted data.

## Phase 10 — Verification + Findings
**Goal:** Separate suspicion from confirmed defects.

Flow:
AI hypothesis
→ deterministic assertion
→ evidence
→ replay
→ verification
→ final verdict

Finding fields:
title, description, type, severity, confidence, status, expected, actual, steps, evidence, affected URLs, root-cause hint, reproduction, recommendation.

Verification:
CONFIRMED / INTERMITTENT / UNVERIFIED

Severity:
CRITICAL / HIGH / MEDIUM / LOW / INFO

Acceptance:
- No finding becomes CONFIRMED without defined verification evidence.
- Severity and confidence are separate.
- Duplicate root causes are grouped.

## Phase 11 — Reporting + Coverage + Health
**Goal:** Make results useful to executives, QA, developers, and automation.

Reports:
- Executive
- QA
- Developer
- JSON
- HTML
- JUnit

Coverage:
- route
- interaction
- flow
- requirement
- risk

Health score:
Explain using critical/high issues, coverage, failures and blocked areas; never present unexplained precision.

Acceptance:
- Every report links findings to evidence.
- Machine-readable output validates against schema.
- Health score has an explainable breakdown.

## Phase 12 — Regression + Retesting
**Goal:** Compare runs and verify fixes.

States:
FIXED / STILL FAILING / REGRESSED / NEW / RESOLVED / CHANGED

Retest:
original reproduction
→ targeted retest
→ related tests
→ regression suite
→ result

Acceptance:
- Same finding can be tracked across runs.
- Fixed vs regressed status is reproducible.
- Retesting can reuse original reproduction steps.

## Phase 13 — Test Lab + Failure Injection
**Goal:** Prove Kashii works against intentionally broken systems.

Apps:
- broken-login
- broken-checkout
- static-dashboard
- broken-forms
- broken-api
- responsive-broken
- accessibility-broken
- flaky-app

Injected defects:
500 API, 404 route, broken button, static data, wrong validation, slow endpoint, missing label, overflow, broken authentication.

Acceptance:
- Each fixture has expected defects.
- CI runs Kashii against fixtures.
- Critical expected defects are detected within defined false-positive/performance thresholds.

## Phase 14 — Observability + Security
**Goal:** Make execution traceable and safe.

Observability:
logs, metrics, traces, events, audit.

Security:
authorization, scope, domain allowlist, action risk, destructive actions, credential protection, network restrictions, filesystem restrictions, rate limits, kill switch, prompt-injection defense.

Acceptance:
- Every run has correlation IDs.
- Secrets are encrypted/redacted.
- Website instructions cannot override system policy.
- Destructive actions require policy approval.
- Audit trail captures sensitive administrative actions.

## Phase 15 — Production Infrastructure
**Goal:** Reliable deployment.

Local Docker services:
frontend, backend, postgres, redis, kashii-engine, browser-worker.

Production:
Docker + a production scheduler/orchestrator selected later.

CI/CD:
Git push → build → deploy preview → Kashii tests → report → quality gate.

Acceptance:
- Reproducible image builds.
- Database migrations are automated safely.
- Health/readiness checks exist.
- Critical Kashii Test Lab scenarios gate releases.

## Phase 16 — V2
- source analysis
- OpenAPI testing
- database-aware testing
- test mailbox/email
- advanced accessibility
- WebSockets/SSE
- advanced visual testing
- CI/CD integration

## Phase 17 — V3
- automatic diagnosis
- fix suggestions
- code patch generation
- Git integration
- PR creation
- automatic retesting
- continuous QA
- team collaboration
