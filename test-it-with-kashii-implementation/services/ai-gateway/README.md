# AI Gateway

Central boundary between Kashii and model providers.

Responsibilities:
- model configuration
- prompt/context construction
- structured output validation
- tool-call validation
- usage/latency telemetry
- provider abstraction

AI never receives raw secrets.
