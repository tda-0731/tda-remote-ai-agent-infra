# TDA Remote AI Agent — Cloud Worker

## Purpose

The Cloud Worker is the remote execution environment for TDA Remote AI Agent.

It runs the OpenCode SDK and processes temporary project workspaces uploaded by the Electron desktop application.

## Current foundation

- Node.js ES modules.
- OpenCode in-process SDK: `@opencode/sdk`.
- Minimal HTTP health endpoint: `GET /health`.
- OpenCode session factory scoped to a supplied workspace directory.
- SDK smoke test that creates and closes a temporary session.

## Local development

1. Copy `.env.example` to `.env` if you need to override local defaults.
2. Install dependencies with `npm install`.
3. Run syntax checks with `npm run check`.
4. Run the SDK smoke test with `npm run test:sdk`.
5. Start the worker with `npm start`.

The health endpoint defaults to `http://127.0.0.1:8787/health`.

The smoke test creates a temporary directory under the operating system temp directory and removes it when finished. It does not send a prompt to a model and does not require a model API key.

## Architecture rules

- Project source code must not be committed to this repository.
- Project files must only be stored temporarily during task execution.
- AI execution must happen in the cloud, not on the user's PC.
- Changes must be reviewed and approved before local application.
- API keys and credentials must never be committed.
- Each task must execute in an isolated workspace.
- The HTTP server currently binds to loopback by default; do not expose it publicly before authentication and transport security are implemented.

## Technology

- Node.js 22 or newer.
- OpenCode SDK.
- GitHub Actions (planned initial cloud execution environment).
- Temporary object storage (to be selected and configured).

## Not implemented yet

- Authenticated task submission API.
- Temporary upload/download service.
- Workspace isolation and quotas.
- Model/provider configuration.
- Task queue, cancellation, and event streaming.
- Diff packaging and review/apply protocol.
- Automatic workspace expiration and cleanup.

## Status

Initial Node.js and OpenCode SDK foundation.
