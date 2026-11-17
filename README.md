# TDA Remote AI Agent Infrastructure

Cloud-first AI coding agent infrastructure using the OpenCode SDK.

## Components

- `cloud-worker/`: OpenCode SDK host and cloud execution foundation.
- [Cloud Task Execution Architecture](cloud-worker/ARCHITECTURE.md): Cloudflare Workers, Durable Objects, R2, task lifecycle, and security requirements.
- `.github/workflows/`: GitHub Actions CI validation.

Project source code must remain local and must never be committed to this infrastructure repository.
