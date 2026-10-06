import json
import logging
import sys
from datetime import datetime, timezone
from typing import Any, Dict, Optional


class JSONFormatter(logging.Formatter):
    def __init__(self, service: str):
        super().__init__()
        self.service = service

    def format(self, record: logging.LogRecord) -> str:
        log_entry: Dict[str, Any] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname.lower(),
            "service": self.service,
            "message": record.getMessage(),
        }
        if hasattr(record, "run_id") and record.run_id:
            log_entry["run_id"] = record.run_id
        if hasattr(record, "action_id") and record.action_id:
            log_entry["action_id"] = record.action_id
        if hasattr(record, "context") and isinstance(record.context, dict):
            log_entry["context"] = record.context

        return json.dumps(log_entry)


def get_logger(service: str, level: int = logging.INFO) -> logging.Logger:
    logger = logging.getLogger(service)
    logger.setLevel(level)
    logger.handlers.clear()

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JSONFormatter(service))
    logger.addHandler(handler)
    logger.propagate = False
    return logger
