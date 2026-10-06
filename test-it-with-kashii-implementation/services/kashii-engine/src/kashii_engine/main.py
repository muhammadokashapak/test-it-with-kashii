import os
import time
from datetime import datetime, timezone
from typing import Any, Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from kashii_engine.core.loop import ExecutionContext, KashiiLoop
from kashii_engine.core.budget_manager import BudgetLimits
from kashii_engine.core.state_machine import RunState

START_TIME = time.time()

app = FastAPI(
    title="Test It With Kashii — Execution Engine",
    description="Autonomous QA orchestration engine service",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MockRunRequest(BaseModel):
    run_id: str
    target_url: str = "http://localhost:3000"
    max_duration_seconds: int = 600
    max_pages: int = 50
    max_actions: int = 200
    max_ai_calls: int = 100


@app.get("/health")
async def health_check() -> Dict[str, Any]:
    uptime = time.time() - START_TIME
    dependencies = {
        "redis": {
            "status": "ok" if os.getenv("REDIS_HOST") else "degraded",
            "message": "Redis host configured" if os.getenv("REDIS_HOST") else "Running local memory queue",
        },
        "browser_worker": {
            "status": "ok",
            "message": "Browser worker channel ready",
        },
    }

    return {
        "service": "kashii-engine",
        "status": "healthy",
        "version": "0.1.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_seconds": round(uptime, 2),
        "dependencies": dependencies,
    }


@app.get("/status")
async def status_check() -> Dict[str, Any]:
    return {
        "service": "kashii-engine",
        "role": "Execution Engine",
        "version": "0.1.0",
        "active_runs": 0,
        "supported_states": [s.value for s in RunState],
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/runs/mock-execute")
async def mock_execute(req: MockRunRequest) -> Dict[str, Any]:
    limits = BudgetLimits(
        max_duration_seconds=req.max_duration_seconds,
        max_pages=req.max_pages,
        max_actions=req.max_actions,
        max_ai_calls=req.max_ai_calls,
    )
    context = ExecutionContext(run_id=req.run_id, target_url=req.target_url, limits=limits)
    engine_loop = KashiiLoop(context)
    result = engine_loop.execute_mock_lifecycle()
    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("kashii_engine.main:app", host="0.0.0.0", port=8001, reload=False)
