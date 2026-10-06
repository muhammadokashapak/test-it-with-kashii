from enum import Enum
from typing import Dict, List, Optional, Set
from datetime import datetime, timezone


class RunState(str, Enum):
    CREATED = "CREATED"
    INITIALIZING = "INITIALIZING"
    ENVIRONMENT_CHECK = "ENVIRONMENT_CHECK"
    DISCOVERING = "DISCOVERING"
    PLANNING = "PLANNING"
    EXECUTING = "EXECUTING"
    VERIFYING = "VERIFYING"
    ANALYZING = "ANALYZING"
    REPORTING = "REPORTING"
    COMPLETED = "COMPLETED"

    # Terminal / Interrupt states
    FAILED = "FAILED"
    BLOCKED = "BLOCKED"
    CANCELLED = "CANCELLED"
    TIMEOUT = "TIMEOUT"
    PAUSED = "PAUSED"


class InvalidStateTransitionError(Exception):
    pass


class StateTransition:
    def __init__(
        self,
        from_state: RunState,
        to_state: RunState,
        reason: Optional[str] = None,
        timestamp: Optional[str] = None,
    ):
        self.from_state = from_state
        self.to_state = to_state
        self.reason = reason
        self.timestamp = timestamp or datetime.now(timezone.utc).isoformat()

    def to_dict(self) -> Dict[str, Optional[str]]:
        return {
            "from_state": self.from_state.value,
            "to_state": self.to_state.value,
            "reason": self.reason,
            "timestamp": self.timestamp,
        }


class RunStateMachine:
    # Allowed linear and branching transitions
    VALID_TRANSITIONS: Dict[RunState, Set[RunState]] = {
        RunState.CREATED: {RunState.INITIALIZING, RunState.CANCELLED},
        RunState.INITIALIZING: {RunState.ENVIRONMENT_CHECK, RunState.FAILED, RunState.CANCELLED},
        RunState.ENVIRONMENT_CHECK: {
            RunState.DISCOVERING,
            RunState.BLOCKED,
            RunState.FAILED,
            RunState.CANCELLED,
            RunState.TIMEOUT,
        },
        RunState.DISCOVERING: {
            RunState.PLANNING,
            RunState.FAILED,
            RunState.CANCELLED,
            RunState.TIMEOUT,
            RunState.PAUSED,
        },
        RunState.PLANNING: {
            RunState.EXECUTING,
            RunState.FAILED,
            RunState.CANCELLED,
            RunState.TIMEOUT,
            RunState.PAUSED,
        },
        RunState.EXECUTING: {
            RunState.VERIFYING,
            RunState.ANALYZING,
            RunState.FAILED,
            RunState.CANCELLED,
            RunState.TIMEOUT,
            RunState.PAUSED,
        },
        RunState.VERIFYING: {
            RunState.EXECUTING,
            RunState.ANALYZING,
            RunState.FAILED,
            RunState.CANCELLED,
            RunState.TIMEOUT,
        },
        RunState.ANALYZING: {
            RunState.REPORTING,
            RunState.FAILED,
            RunState.CANCELLED,
            RunState.TIMEOUT,
        },
        RunState.REPORTING: {
            RunState.COMPLETED,
            RunState.FAILED,
            RunState.CANCELLED,
        },
        RunState.PAUSED: {
            RunState.EXECUTING,
            RunState.DISCOVERING,
            RunState.PLANNING,
            RunState.CANCELLED,
        },
        # Terminal states have no outward transitions
        RunState.COMPLETED: set(),
        RunState.FAILED: set(),
        RunState.BLOCKED: set(),
        RunState.CANCELLED: set(),
        RunState.TIMEOUT: set(),
    }

    TERMINAL_STATES: Set[RunState] = {
        RunState.COMPLETED,
        RunState.FAILED,
        RunState.BLOCKED,
        RunState.CANCELLED,
        RunState.TIMEOUT,
    }

    def __init__(self, initial_state: RunState = RunState.CREATED):
        self.current_state = initial_state
        self.history: List[StateTransition] = []

    @property
    def is_terminal(self) -> bool:
        return self.current_state in self.TERMINAL_STATES

    def can_transition_to(self, target_state: RunState) -> bool:
        # Cancellation has priority over any active non-terminal state
        if target_state == RunState.CANCELLED and not self.is_terminal:
            return True
        allowed = self.VALID_TRANSITIONS.get(self.current_state, set())
        return target_state in allowed

    def transition(self, target_state: RunState, reason: Optional[str] = None) -> StateTransition:
        # Idempotency: if already in the target state, return without error
        if self.current_state == target_state:
            return StateTransition(self.current_state, target_state, reason="Idempotent transition")

        if not self.can_transition_to(target_state):
            raise InvalidStateTransitionError(
                f"Cannot transition from {self.current_state.value} to {target_state.value}. Reason: {reason}"
            )

        prev = self.current_state
        self.current_state = target_state
        entry = StateTransition(prev, target_state, reason=reason)
        self.history.append(entry)
        return entry
