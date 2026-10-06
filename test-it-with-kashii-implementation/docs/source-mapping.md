# Source-to-Implementation Mapping

The supplied architecture document defines:

- Presentation: Next.js/React/TypeScript
- Control plane: Laravel/PHP
- Data: PostgreSQL, Redis, object storage
- Execution: Kashii Engine
- AI roles: Planner, Explorer, Reasoner/Analyzer, Reporter
- Browser: Playwright/Chromium
- QA intelligence: Discovery, scenarios, assertions, verification, findings
- Evidence: screenshots, DOM, network, console, trace, state
- Safety: authorization, sandbox, permissions, secrets, prompt-injection defense
- Reporting: executive, QA, developer, machine-readable
- Regression: run comparison, retesting, trends
- Observability: logs, metrics, traces, audit
- Infrastructure: Docker, CI/CD, workers, deployment

This package preserves that structure and converts it into implementation phases. Where the source only says a capability should exist, this package treats the detailed implementation choice as a future engineering decision rather than claiming it was specified by the source.
