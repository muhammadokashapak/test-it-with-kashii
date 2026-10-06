import pytest
from kashii_engine.core.state_machine import (
    RunStateMachine,
    RunState,
    InvalidStateTransitionError,
)


def test_state_machine_happy_path():
    sm = RunStateMachine()
    assert sm.current_state == RunState.CREATED
    assert not sm.is_terminal

    sm.transition(RunState.INITIALIZING)
    sm.transition(RunState.ENVIRONMENT_CHECK)
    sm.transition(RunState.DISCOVERING)
    sm.transition(RunState.PLANNING)
    sm.transition(RunState.EXECUTING)
    sm.transition(RunState.VERIFYING)
    sm.transition(RunState.ANALYZING)
    sm.transition(RunState.REPORTING)
    sm.transition(RunState.COMPLETED)

    assert sm.current_state == RunState.COMPLETED
    assert sm.is_terminal
    assert len(sm.history) == 9


def test_invalid_state_transition():
    sm = RunStateMachine()
    with pytest.raises(InvalidStateTransitionError):
        # Cannot jump straight from CREATED to COMPLETED
        sm.transition(RunState.COMPLETED)


def test_cancellation_priority():
    sm = RunStateMachine()
    sm.transition(RunState.INITIALIZING)
    sm.transition(RunState.ENVIRONMENT_CHECK)
    sm.transition(RunState.DISCOVERING)

    # Can cancel anytime from active state
    sm.transition(RunState.CANCELLED, reason="User requested cancellation")
    assert sm.current_state == RunState.CANCELLED
    assert sm.is_terminal


def test_idempotent_transition():
    sm = RunStateMachine()
    sm.transition(RunState.INITIALIZING)
    # Transitioning to same state is a safe no-op
    entry = sm.transition(RunState.INITIALIZING)
    assert entry.reason == "Idempotent transition"
    assert sm.current_state == RunState.INITIALIZING
