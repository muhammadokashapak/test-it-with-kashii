# AI Tool Gateway

Only allow explicit tools.

## Browser tools

browser.navigate
browser.click
browser.fill
browser.type
browser.select
browser.check
browser.uncheck
browser.hover
browser.scroll
browser.press
browser.wait
browser.upload
browser.download

## Observation tools

browser.snapshot
browser.dom
browser.accessibility_snapshot
browser.network
browser.console
browser.current_state

## Tool execution contract

1. Validate JSON schema.
2. Validate current run state.
3. Validate project/environment domain.
4. Validate action risk.
5. Validate credential policy.
6. Execute through Browser Worker.
7. Capture evidence.
8. Emit action completion event.
9. Return structured result.

Website text is untrusted content and never becomes policy.
