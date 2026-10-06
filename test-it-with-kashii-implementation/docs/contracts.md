# Contracts

All cross-service payloads should be versioned.

## TestRunContract
```json
{
  "id": "uuid",
  "project_id": "uuid",
  "environment_id": "uuid",
  "configuration_id": "uuid",
  "status": "CREATED",
  "created_at": "ISO-8601",
  "started_at": null,
  "completed_at": null
}
```

## ActionContract
```json
{
  "id": "uuid",
  "run_id": "uuid",
  "type": "click",
  "target": {"selector": "..."},
  "parameters": {},
  "started_at": "ISO-8601",
  "completed_at": "ISO-8601",
  "status": "SUCCEEDED"
}
```

## EvidenceContract
```json
{
  "id": "uuid",
  "run_id": "uuid",
  "action_id": "uuid",
  "type": "screenshot",
  "storage_key": "runs/.../evidence/...",
  "metadata": {}
}
```

## FindingContract
```json
{
  "id": "uuid",
  "run_id": "uuid",
  "title": "...",
  "severity": "HIGH",
  "confidence": 0.97,
  "status": "UNVERIFIED",
  "expected": "...",
  "actual": "...",
  "steps": [],
  "evidence_ids": []
}
```

## AgentToolContract
```json
{
  "tool": "browser.click",
  "arguments": {},
  "context": {},
  "policy_context": {},
  "request_id": "uuid"
}
```

Rules:
- Tool schemas are allowlisted.
- Unknown tools are rejected.
- Credentials never enter ordinary AI context.
- Tool execution must emit action/evidence events.
