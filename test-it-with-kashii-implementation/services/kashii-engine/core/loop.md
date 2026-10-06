# Core Execution Loop

while budget.allows() and not state.terminal:

    observation = observe()
    context = understand(observation)

    proposed_action = planner.plan(context)

    policy.check(proposed_action)

    action_result = executor.execute(proposed_action)

    evidence.capture(action_result)

    assertion_results = assertions.evaluate(action_result)

    verification.update(assertion_results)

    state_manager.update(action_result, assertion_results)

    if verification.requires_replay():
        verifier.replay()

    findings.update()

    budget.consume()

report()
