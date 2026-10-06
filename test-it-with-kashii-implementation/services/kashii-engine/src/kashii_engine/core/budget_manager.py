from dataclasses import dataclass
from typing import Dict, Any


class BudgetExhaustedError(Exception):
    def __init__(self, resource: str, current: int, maximum: int):
        self.resource = resource
        self.current = current
        self.maximum = maximum
        super().__init__(f"Budget exhausted for {resource}: current={current}, limit={maximum}")


@dataclass
class BudgetLimits:
    max_duration_seconds: int = 600
    max_pages: int = 50
    max_actions: int = 200
    max_ai_calls: int = 100


class BudgetManager:
    def __init__(self, limits: BudgetLimits):
        self.limits = limits
        self.duration_seconds: float = 0.0
        self.pages_visited: int = 0
        self.actions_executed: int = 0
        self.ai_calls_made: int = 0

    def record_page(self, count: int = 1) -> None:
        self.pages_visited += count
        if self.pages_visited > self.limits.max_pages:
            raise BudgetExhaustedError("pages", self.pages_visited, self.limits.max_pages)

    def record_action(self, count: int = 1) -> None:
        self.actions_executed += count
        if self.actions_executed > self.limits.max_actions:
            raise BudgetExhaustedError("actions", self.actions_executed, self.limits.max_actions)

    def record_ai_call(self, count: int = 1) -> None:
        self.ai_calls_made += count
        if self.ai_calls_made > self.limits.max_ai_calls:
            raise BudgetExhaustedError("ai_calls", self.ai_calls_made, self.limits.max_ai_calls)

    def update_duration(self, seconds: float) -> None:
        self.duration_seconds = seconds
        if self.duration_seconds > self.limits.max_duration_seconds:
            raise BudgetExhaustedError("duration_seconds", int(self.duration_seconds), self.limits.max_duration_seconds)

    def allows(self) -> bool:
        return (
            self.pages_visited < self.limits.max_pages
            and self.actions_executed < self.limits.max_actions
            and self.ai_calls_made < self.limits.max_ai_calls
            and self.duration_seconds < self.limits.max_duration_seconds
        )

    def to_dict(self) -> Dict[str, Any]:
        return {
            "consumed": {
                "duration_seconds": self.duration_seconds,
                "pages": self.pages_visited,
                "actions": self.actions_executed,
                "ai_calls": self.ai_calls_made,
            },
            "limits": {
                "max_duration_seconds": self.limits.max_duration_seconds,
                "max_pages": self.limits.max_pages,
                "max_actions": self.limits.max_actions,
                "max_ai_calls": self.limits.max_ai_calls,
            },
            "remaining": {
                "duration_seconds": max(0.0, self.limits.max_duration_seconds - self.duration_seconds),
                "pages": max(0, self.limits.max_pages - self.pages_visited),
                "actions": max(0, self.limits.max_actions - self.actions_executed),
                "ai_calls": max(0, self.limits.max_ai_calls - self.ai_calls_made),
            },
        }
