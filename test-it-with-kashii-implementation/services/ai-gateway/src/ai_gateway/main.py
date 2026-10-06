import os
import time
from datetime import datetime, timezone
from typing import Any, Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai_gateway.tool_registry import ToolRegistry, ToolNotAllowedError

START_TIME = time.time()

app = FastAPI(
    title="Test It With Kashii — AI Gateway",
    description="Tool-sandboxed AI Gateway for autonomous test reasoning",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ToolValidationRequest(BaseModel):
    tool: str
    arguments: Dict[str, Any] = {}


@app.get("/health")
async def health_check() -> Dict[str, Any]:
    uptime = time.time() - START_TIME
    provider = os.getenv("AI_PROVIDER", "mock")
    return {
        "service": "ai-gateway",
        "status": "healthy",
        "version": "0.1.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_seconds": round(uptime, 2),
        "dependencies": {
            "provider": {
                "status": "ok",
                "message": f"Configured AI provider: {provider}",
            },
            "sandbox": {
                "status": "ok",
                "message": "Tool schema validation active",
            },
        },
    }


@app.get("/status")
async def status_check() -> Dict[str, Any]:
    return {
        "service": "ai-gateway",
        "role": "AI Gateway",
        "provider": os.getenv("AI_PROVIDER", "mock"),
        "model": os.getenv("AI_MODEL", "mock-agent-v1"),
        "allowed_tools_count": len(ToolRegistry.ALLOWED_TOOLS),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/tools/validate")
async def validate_tool(req: ToolValidationRequest) -> Dict[str, Any]:
    try:
        ToolRegistry.validate_tool_request(req.tool, req.arguments)
        return {"tool": req.tool, "allowed": True, "status": "valid"}
    except ToolNotAllowedError as e:
        raise HTTPException(status_code=403, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("ai_gateway.main:app", host="0.0.0.0", port=8003, reload=False)
