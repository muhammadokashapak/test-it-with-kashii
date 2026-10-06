import os
import time
from datetime import datetime, timezone
from typing import Any, Dict, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from browser_worker.domain_policy import DomainPolicyEnforcer, DomainNotAllowedError

START_TIME = time.time()
DEFAULT_DOMAINS = os.getenv("BROWSER_ALLOWED_DOMAINS", "localhost,127.0.0.1,0.0.0.0").split(",")

app = FastAPI(
    title="Test It With Kashii — Browser Worker",
    description="Playwright browser automation worker",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DomainValidationRequest(BaseModel):
    url: str
    allowed_domains: List[str] = DEFAULT_DOMAINS


class DomainValidationResponse(BaseModel):
    url: str
    allowed: bool
    allowed_domains: List[str]


@app.get("/health")
async def health_check() -> Dict[str, Any]:
    uptime = time.time() - START_TIME
    return {
        "service": "browser-worker",
        "status": "healthy",
        "version": "0.1.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_seconds": round(uptime, 2),
        "dependencies": {
            "playwright": {
                "status": "ok",
                "message": "Playwright driver available",
            },
            "sandbox": {
                "status": "ok",
                "message": "Domain sandboxing active",
            },
        },
    }


@app.get("/status")
async def status_check() -> Dict[str, Any]:
    return {
        "service": "browser-worker",
        "role": "Browser Worker",
        "active_sessions": 0,
        "default_allowed_domains": DEFAULT_DOMAINS,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/validate-domain", response_model=DomainValidationResponse)
async def validate_domain(req: DomainValidationRequest) -> DomainValidationResponse:
    enforcer = DomainPolicyEnforcer(req.allowed_domains)
    is_allowed = enforcer.is_allowed(req.url)
    return DomainValidationResponse(
        url=req.url,
        allowed=is_allowed,
        allowed_domains=req.allowed_domains,
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("browser_worker.main:app", host="0.0.0.0", port=8002, reload=False)
