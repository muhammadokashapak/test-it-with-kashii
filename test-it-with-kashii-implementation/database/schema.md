# Database Master Schema

The schema follows the source hierarchy: organizations, users, teams, projects, environments, credentials, requirements, test suites/scenarios/runs, actions, browser sessions, evidence, assertions, results, findings, reports, artifacts, regression results, AI executions and audit logs.

## Core tables

### organizations
id, name, slug, created_at, updated_at

### users
id, name, email, password_hash, status, created_at, updated_at

### organization_members
id, organization_id, user_id, role, created_at

### teams
id, organization_id, name, created_at, updated_at

### projects
id, organization_id, name, description, target_url, repository_url, created_at, updated_at

### environments
id, project_id, name, base_url, allowed_domains_json, env_vars_encrypted, auth_config_json, safety_policy_json, created_at, updated_at

### credentials
id, project_id, environment_id, name, type, secret_ciphertext, metadata_json, created_at, updated_at

### requirements
id, project_id, source_type, title, body, acceptance_criteria_json, source_artifact_id, created_at, updated_at

### test_suites
id, project_id, name, description, created_at, updated_at

### test_scenarios
id, suite_id, requirement_id, title, objective, preconditions_json, steps_json, expected_results_json, risk_level, version, created_at, updated_at

### test_runs
id, project_id, environment_id, suite_id, configuration_json, status, state, budget_json, started_at, completed_at, failure_reason, created_at

### browser_sessions
id, test_run_id, browser, context_id, status, started_at, ended_at

### test_actions
id, test_run_id, browser_session_id, scenario_id, sequence_no, action_type, target_json, parameters_json, result_json, status, started_at, completed_at

### evidence
id, test_run_id, action_id, type, storage_key, metadata_json, captured_at

### assertions
id, test_run_id, action_id, assertion_type, expected_json, actual_json, status, evidence_ids_json, created_at

### test_results
id, test_run_id, scenario_id, status, summary, evidence_ids_json, created_at

### findings
id, project_id, test_run_id, title, description, type, severity, confidence, status, expected, actual, reproduction_json, root_cause_hint, recommendation, created_at, updated_at

### finding_evidence
finding_id, evidence_id

### finding_occurrences
id, finding_id, test_run_id, url, occurrence_metadata_json, created_at

### reports
id, project_id, test_run_id, report_type, storage_key, metadata_json, created_at

### artifacts
id, project_id, test_run_id, type, storage_key, size_bytes, checksum, metadata_json, created_at

### regression_results
id, project_id, baseline_run_id, comparison_run_id, finding_id, classification, details_json, created_at

### ai_executions
id, test_run_id, agent_type, model_provider, model_name, input_metadata_json, output_metadata_json, tool_call_count, token_usage_json, latency_ms, status, created_at

### audit_logs
id, organization_id, user_id, action, resource_type, resource_id, metadata_json, ip_hash, created_at

## Indexing essentials

- organization_id on tenant-owned tables
- project_id on project-owned tables
- test_run_id on execution tables
- finding status/severity
- created_at for event/history queries
- unique organization slug
- unique environment name per project
- unique scenario version per scenario lineage

## Storage rule

Large artifacts are not stored as database blobs by default. Store metadata in PostgreSQL and content in object storage.
