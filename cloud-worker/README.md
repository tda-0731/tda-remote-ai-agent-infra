# TDA Remote AI Agent — Cloud Worker

## Purpose

The Cloud Worker is the remote execution environment for TDA Remote AI Agent.

It runs the OpenCode SDK and processes temporary project workspaces uploaded by the Electron desktop application.

## Core Responsibilities

- Receive temporary project packages.
- Create isolated temporary workspaces.
- Execute AI coding tasks using OpenCode SDK.
- Run permitted tests and validation.
- Generate code changes and unified diffs.
- Return task results to the Electron application.
- Clean up temporary workspaces after task completion or expiration.

## Architecture Rules

- Project source code must not be committed to this repository.
- Project files must only be stored temporarily during task execution.
- AI execution must happen in the cloud, not on the user's PC.
- Changes must be reviewed and approved before local application.
- API keys and credentials must never be committed.
- Each task must execute in an isolated workspace.

## Technology

- Node.js
- OpenCode SDK
- GitHub Actions (initial cloud execution environment)
- Temporary object storage (to be selected and configured)

## Status

Initial infrastructure setup.
