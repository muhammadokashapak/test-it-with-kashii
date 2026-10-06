# 🛡️ Test It With Kashii
### Autonomous AI-Powered QA & Continuous Verification Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black?style=for-the-badge&logo=next.js)
![Laravel](https://img.shields.io/badge/Control%20Plane-Laravel%2012-FF2D20?style=for-the-badge&logo=laravel)
![Playwright](https://img.shields.io/badge/Browser-Playwright-2EAD33?style=for-the-badge&logo=playwright)
![Python](https://img.shields.io/badge/Engine-Python%203.12-3776AB?style=for-the-badge&logo=python)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2016-336791?style=for-the-badge&logo=postgresql)
![Redis](https://img.shields.io/badge/Queue-Redis%207-DC382D?style=for-the-badge&logo=redis)
![Docker](https://img.shields.io/badge/Infrastructure-Docker%20Compose-2496ED?style=for-the-badge&logo=docker)
![Status](https://img.shields.io/badge/Phase%200-Foundation%20Verified%20%E2%9C%85-success?style=for-the-badge)

<p align="center">
  <b>Observe → Plan → Act → Collect Evidence → Verify → Classify → Report → Retest</b>
</p>

</div>

---

## ⚡ The Core Invariant

> **AI must NOT independently declare that something is a bug.**
> 
> In *Test It With Kashii*, the AI agent understands the application, formulates hypotheses, plans exploratory paths, and inspects context. However, a finding becomes a **confirmed defect** *only* through deterministic evidence, reproducible assertions, browser replay, and a multi-stage classification pipeline.

---

## 🏛️ Master Architecture & Execution Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             USER INTERACTION                                │
│                   Next.js 15 Modern SaaS Dashboard Shell                    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ REST / Events
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONTROL PLANE (Laravel 12 / PHP 8.3)                     │
│    Auth • Organizations • Projects • Environments • Queues • Audit Logs     │
└───────────────────┬─────────────────────────────────┬───────────────────────┘
                    │                                 │
     Jobs / State   ▼                  Artifact Meta  ▼
      ┌───────────────────────┐            ┌──────────────────────────┐
      │  Redis 7 Pub/Sub &    │            │ PostgreSQL 16 Multi-     │
      │  Distributed Locks    │            │ Tenant Persistence       │
      └─────────────┬─────────┘            └──────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 KASHII EXECUTION ENGINE (Python 3.12 Core)                   │
│      Run Manager • State Machine • Budget Manager • Loop Coordinator        │
└──────────────┬──────────────────────────────┬───────────────────────────────┘
               │                              │
     Sandboxed │ Tools              Evidence  │ Collection
               ▼                              ▼
┌─────────────────────────────┐  ┌────────────────────────────────────────────┐
│      AI AGENT GATEWAY       │  │        PLAYWRIGHT BROWSER WORKER           │
│ Strict Tool Whitelist Schema│  │ Isolated Chromium Context • Network Proxy  │
│  Prompt-Injection Defenses  │  │ Domain Sandbox • HAR • Screenshots • Traces│
└─────────────────────────────┘  └─────────────────────┬──────────────────────┘
                                                       │
                                                       ▼
                                         ┌───────────────────────────┐
                                         │  MinIO S3 Object Storage  │
                                         │  Screenshots • DOM • Logs │
                                         └───────────────────────────┘
```

---

## 🔄 The Autonomous Execution Loop

```
[OBSERVE] ──────────► [UNDERSTAND] ────────► [PLAN] ──────────► [SAFETY CHECK]
    ▲                                                                 │
    │                                                                 ▼
[MORE TESTS?] ◄────── [UPDATE STATE] ◄──── [VERIFY] ◄──────────── [ACT]
    │                                          │                      │
    ▼                                          ▼                      ▼
 [REPORT]                              [EVIDENCE STORE]        [ASSERTION CHECK]
```

---

## 📦 Monorepo Topology

| Path | Component | Technology | Responsibility |
|---|---|---|---|
| [`apps/web`](./test-it-with-kashii-implementation/apps/web) | **Presentation Shell** | Next.js 15, React 19, Tailwind CSS | SaaS Dashboard, real-time topology prober, evidence viewer |
| [`apps/api`](./test-it-with-kashii-implementation/apps/api) | **Control Plane** | Laravel 12, PHP 8.2+ | Identity, tenant isolation, project config, job queues |
| [`services/kashii-engine`](./test-it-with-kashii-implementation/services/kashii-engine) | **Execution Engine** | Python 3.10+, FastAPI | Lifecycle state machine, budget enforcement, execution loop |
| [`services/browser-worker`](./test-it-with-kashii-implementation/services/browser-worker) | **Browser Plane** | Playwright, Chromium, Python | Sandboxed browser automation, domain allowlist enforcement |
| [`services/ai-gateway`](./test-it-with-kashii-implementation/services/ai-gateway) | **AI Gateway** | FastAPI, Python | Tool-sandboxed reasoning, strict schema allowlisting |
| [`packages/contracts`](./test-it-with-kashii-implementation/packages/contracts) | **Data Contracts** | JSON Schema (Draft-07) | Versioned cross-service payload schemas |
| [`packages/shared-types`](./test-it-with-kashii-implementation/packages/shared-types) | **Type Definitions** | TypeScript 5 | Compiled `.d.ts` types and runtime contracts |
| [`packages/logger`](./test-it-with-kashii-implementation/packages/logger) | **Structured Logger** | TypeScript & Python | Standardized JSON log format with correlation IDs |
| [`packages/events`](./test-it-with-kashii-implementation/packages/events) | **Event System** | TypeScript | Standard lifecycle & action event constants |
| [`packages/config`](./test-it-with-kashii-implementation/packages/config) | **System Config** | TypeScript | Ports, default budgets, approved tool whitelist |

---

## 🚀 Quick Start Guide

### Option A: Complete Docker Compose (Production / Staging)

Everything boots with one single command:

```bash
cd test-it-with-kashii-implementation
docker compose up --build
```

#### Service Port Mappings:
- **Next.js Web Frontend:** [http://localhost:3000](http://localhost:3000)
- **Laravel Control Plane API:** [http://localhost:8000](http://localhost:8000)
  - API Health: [http://localhost:8000/api/health](http://localhost:8000/api/health)
  - API Ping: [http://localhost:8000/api/ping](http://localhost:8000/api/ping)
- **Kashii Execution Engine:** [http://localhost:8001](http://localhost:8001)
  - Health: [http://localhost:8001/health](http://localhost:8001/health)
- **Playwright Browser Worker:** [http://localhost:8002](http://localhost:8002)
  - Health: [http://localhost:8002/health](http://localhost:8002/health)
- **AI Gateway:** [http://localhost:8003](http://localhost:8003)
  - Health: [http://localhost:8003/health](http://localhost:8003/health)
- **PostgreSQL 16:** `localhost:5432`
- **Redis 7:** `localhost:6379`
- **MinIO S3 Storage:** `localhost:9000` (Console: [http://localhost:9001](http://localhost:9001))

---

### Option B: Local Native Verification (No Docker Required)

#### Windows (PowerShell):
```powershell
cd test-it-with-kashii-implementation
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1
```

#### Linux / macOS (Bash):
```bash
cd test-it-with-kashii-implementation
chmod +x scripts/dev.sh
./scripts/dev.sh
```

#### Run Health Probe Suite:
```bash
node test-it-with-kashii-implementation/scripts/health-check.js
```

---

## 🧪 Automated Test Verification

Every major service contains automated tests and passes with 100% success:

```bash
# 1. Shared JSON Schemas & Contracts
node packages/contracts/index.js
# Output: ✅ @kashii/contracts: All schemas loaded successfully.

# 2. Kashii Engine Core & State Machine (pytest)
PYTHONPATH="services/kashii-engine/src" pytest services/kashii-engine/tests
# Output: 6 passed in 0.04s

# 3. Browser Worker Domain Sandbox (pytest)
PYTHONPATH="services/browser-worker/src" pytest services/browser-worker/tests
# Output: 2 passed in 0.02s

# 4. AI Gateway Tool Allowlist (pytest)
PYTHONPATH="services/ai-gateway/src" pytest services/ai-gateway/tests
# Output: 3 passed in 0.03s

# 5. Laravel API Control Plane (PHPUnit)
cd apps/api && php vendor/phpunit/phpunit/phpunit
# Output: 3 tests, 14 assertions - OK (100%)
```

---

## 🗺️ Phase Implementation Roadmap

- [x] **Phase 0 — Foundation & Reproducible Monorepo** (Complete & Verified ✅)
- [ ] **Phase 1 — Identity, Organizations, Projects & Environments**
- [ ] **Phase 2 — Requirements Ingestion & Test Configuration**
- [ ] **Phase 3 — Test Run Control Plane, Queues & Life Cycle**
- [ ] **Phase 4 — Kashii Engine Core, State Machine & Budgets**
- [ ] **Phase 5 — Playwright Browser Worker Automation**
- [ ] **Phase 6 — Application Discovery & State Graph Generation**
- [ ] **Phase 7 — Intelligent Planning & Scenario Generation**
- [ ] **Phase 8 — Deterministic Evidence & Assertion Engine**
- [ ] **Phase 9 — AI Agent & Tool Gateway with Prompt-Injection Defense**
- [ ] **Phase 10 — Verification & Finding Engine (Replay & Deduplication)**
- [ ] **Phase 11 — Multi-Audience Reporting (Exec, QA, Dev, JUnit)**
- [ ] **Phase 12 — Regression Engine & Fix Verification**
- [ ] **Phase 13 — Test Lab (Broken Applications & Failure Injection)**
- [ ] **Phase 14 — Enterprise Security & Observability Hardening**
- [ ] **Phase 15 — Production Infrastructure & CI/CD Quality Gate**
- [ ] **Phase 16 — V2 Extensions (Source Code, API & Visual Diffing)**
- [ ] **Phase 17 — V3 Autonomous Remediation & PR Generation**

---

## 📄 License & Confidentiality

Proprietary platform created for **Test It With Kashii**. All rights reserved.
