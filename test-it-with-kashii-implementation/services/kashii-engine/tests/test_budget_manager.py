import pytest
from kashii_engine.core.budget_manager import (
    BudgetManager,
    BudgetLimits,
    BudgetExhaustedError,
)


def test_budget_manager_within_limits():
    limits = BudgetLimits(max_actions=5, max_pages=3, max_ai_calls=2, max_duration_seconds=10)
    bm = BudgetManager(limits)

    bm.record_action(2)
    bm.record_page(1)
    bm.record_ai_call(1)
    bm.update_duration(4.5)

    assert bm.allows()
    status = bm.to_dict()
    assert status["consumed"]["actions"] == 2
    assert status["remaining"]["actions"] == 3


def test_budget_manager_exhaustion():
    limits = BudgetLimits(max_actions=2)
    bm = BudgetManager(limits)

    bm.record_action(1)
    bm.record_action(1)

    with pytest.raises(BudgetExhaustedError) as exc_info:
        bm.record_action(1)

    assert exc_info.value.resource == "actions"
