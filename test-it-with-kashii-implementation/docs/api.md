# Laravel API Specification

Base path: `/api`

## Authentication
POST `/auth/login`
POST `/auth/logout`
GET  `/auth/me`

## Organizations
GET `/organizations`
POST `/organizations`
GET `/organizations/{id}`
PATCH `/organizations/{id}`

## Projects
GET `/projects`
POST `/projects`
GET `/projects/{id}`
PATCH `/projects/{id}`
DELETE `/projects/{id}`

## Environments
GET `/projects/{project}/environments`
POST `/projects/{project}/environments`
GET `/environments/{id}`
PATCH `/environments/{id}`

## Requirements
POST `/projects/{project}/requirements`
GET `/projects/{project}/requirements`
GET `/requirements/{id}`

## Test suites/scenarios
GET `/projects/{project}/test-suites`
POST `/projects/{project}/test-suites`
POST `/test-suites/{suite}/scenarios`
GET `/test-scenarios/{scenario}`

## Test runs
POST `/projects/{project}/runs`
GET `/runs/{run}`
POST `/runs/{run}/cancel`
POST `/runs/{run}/pause`
POST `/runs/{run}/resume`
GET `/runs/{run}/timeline`
GET `/runs/{run}/evidence`
GET `/runs/{run}/findings`

## Findings
GET `/projects/{project}/findings`
GET `/findings/{finding}`
POST `/findings/{finding}/verify`
POST `/findings/{finding}/retest`

## Reports
POST `/runs/{run}/reports`
GET `/reports/{report}`

## Regression
POST `/projects/{project}/regression`
GET `/regression/{id}`

## Worker/internal contracts
These should be private/internal routes or event-bus messages:
- test.start
- test.cancel
- test.pause
- test.resume
- test.status
- worker.heartbeat
- evidence.upload
- finding.submit

## API rules

- Tenant scope is mandatory.
- Authorization occurs before resource access.
- Mutating endpoints validate idempotency where appropriate.
- Every run-control mutation creates an audit/event record.
- Secrets are never returned in ordinary resource responses.
