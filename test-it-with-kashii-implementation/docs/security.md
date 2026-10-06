# Safety & Security Specification

## Authorization
- Tenant isolation on every query.
- Project/environment permissions checked server-side.
- Role-based permissions: Super Admin, Organization Admin, Project Owner, QA Engineer, Developer, Viewer.

## Scope
- Every run has allowed domains.
- Browser worker rejects navigation outside allowlist.
- Redirects are revalidated.

## Destructive actions
Examples:
delete, irreversible submission, production mutation, bulk destructive operation.

Policy options:
- deny
- require approval
- allow in explicitly configured test environment

## Secrets
- Encrypt at rest.
- Redact logs.
- Do not put credentials into normal AI prompts.
- Do not expose secrets through reports.
- Prefer short-lived credentials.

## Prompt injection
Hierarchy:
SYSTEM POLICY
→ USER TASK
→ TOOL PERMISSIONS
→ WEBSITE CONTENT

Website content cannot change system policy or tool permissions.

## Sandbox
Control:
network, filesystem, credentials, downloads, uploads, processes.

## Kill switch
Operator can stop a run; worker must honor cancellation and clean up browser context.
