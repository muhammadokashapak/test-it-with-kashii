# Test It With Kashii

Autonomous AI-powered QA/testing platform.

**Core Principle:**
> Kashii observes -> plans -> acts -> collects evidence -> verifies -> classifies -> reports -> retests.
> AI must NOT independently declare that something is a bug. A finding becomes a confirmed defect only through deterministic evidence, assertions, verification, replay/retesting, and the defined finding-classification pipeline.

## Implementation Workspace

The complete implementation monorepo is located in [`test-it-with-kashii-implementation`](./test-it-with-kashii-implementation).

### Quick Start

```bash
cd test-it-with-kashii-implementation

# With Docker Compose:
docker compose up --build

# Or with local runner (Windows PowerShell):
.\scripts\dev.ps1

# Or with local runner (Linux / macOS):
./scripts/dev.sh
```
