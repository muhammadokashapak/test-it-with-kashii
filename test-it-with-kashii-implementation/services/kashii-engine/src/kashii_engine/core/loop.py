import time
from typing import Any, Dict, List, Optional
from kashii_engine.core.state_machine import RunStateMachine, RunState
from kashii_engine.core.budget_manager import BudgetManager, BudgetLimits, BudgetExhaustedError


class ExecutionContext:
    def __init__(self, run_id: str, target_url: str, limits: Optional[BudgetLimits] = None):
        self.run_id = run_id
        self.target_url = target_url
        self.state_machine = RunStateMachine()
        self.budget = BudgetManager(limits or BudgetLimits())
        self.observations: List[Dict[str, Any]] = []
        self.actions: List[Dict[str, Any]] = []
        self.evidence: List[Dict[str, Any]] = []
        self.assertions: List[Dict[str, Any]] = []
        self.findings: List[Dict[str, Any]] = []


class KashiiLoop:
    """Core Kashii execution engine implementing:
    Observe -> Understand -> Plan -> Safety Check -> Act -> Collect Evidence -> Verify -> Update State -> Report
    """

    def __init__(self, context: ExecutionContext):
        self.context = context

    def execute_mock_lifecycle(self) -> Dict[str, Any]:
        """Executes a full validated lifecycle transition for smoke/health verification."""
        ctx = self.context
        sm = ctx.state_machine
        start_time = time.time()

        # Step 1: Initializing
        sm.transition(RunState.INITIALIZING, "Starting run workers")

        # Step 2: Environment Check
        sm.transition(RunState.ENVIRONMENT_CHECK, "Verifying target connectivity")
        ctx.budget.update_duration(time.time() - start_time)

        # Step 3: Discovering
        sm.transition(RunState.DISCOVERING, "Exploring entrypoint routes")
        ctx.budget.record_page(1)

        # Step 4: Planning
        sm.transition(RunState.PLANNING, "Generating test scenarios")
        ctx.budget.record_ai_call(1)

        # Step 5: Executing
        sm.transition(RunState.EXECUTING, "Executing generated scenario actions")
        ctx.budget.record_action(1)

        # Step 6: Verifying
        sm.transition(RunState.VERIFYING, "Evaluating assertions and replay checks")

        # Step 7: Analyzing
        sm.transition(RunState.ANALYZING, "Synthesizing evidence and defect classification")

        # Step 8: Reporting
        sm.transition(RunState.REPORTING, "Compiling multi-audience reports")

        # Step 9: Completed
        sm.transition(RunState.COMPLETED, "Run finished within budget limits")
        ctx.budget.update_duration(time.time() - start_time)

        return {
            "run_id": ctx.run_id,
            "final_state": sm.current_state.value,
            "is_terminal": sm.is_terminal,
            "history": [t.to_dict() for t in sm.history],
            "budget": ctx.budget.to_dict(),
        }
