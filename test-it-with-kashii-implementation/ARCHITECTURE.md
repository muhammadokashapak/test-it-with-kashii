# Master Architecture

## End-to-end flow

USER
→ Next.js
→ Authorization
→ Project
→ Environment
→ Test Configuration
→ Laravel
→ PostgreSQL / Redis
→ Kashii Worker
→ Environment Analyzer
→ Browser Worker
→ Playwright
→ Chromium
→ Target Application
→ Discovery / Application Graph
→ Planner
→ Scenario Generator
→ AI Agent
→ Safety Check
→ Action
→ Evidence
→ Assertions
→ Verification
→ Findings
→ Deduplication
→ Severity + Confidence
→ Regression
→ Reporting
→ PostgreSQL + Object Storage
→ WebSocket/live updates
→ Next.js

## Internal Kashii loop

OBSERVE
→ UNDERSTAND
→ PLAN
→ SAFETY CHECK
→ ACT
→ COLLECT EVIDENCE
→ VERIFY
→ UPDATE STATE
→ MORE TESTS?
→ REPORT

## Repository topology

apps/
  web/
  api/

services/
  kashii-engine/
  browser-worker/
  ai-gateway/

packages/
  shared-types/
  contracts/
  schemas/
  logger/
  events/
  config/

infrastructure/
  docker/
  nginx/
  deployment/

database/
tests/
test-lab/
docs/
scripts/
