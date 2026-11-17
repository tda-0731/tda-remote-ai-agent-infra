# Cloud Task Execution Architecture

## Decision

Use Cloudflare as the initial cloud runtime:

- Cloudflare Workers: public HTTPS entry point and request validation.
- Cloudflare Durable Objects with SQLite: one isolated, durable execution coordinator per task/session.
- OpenCode Workerd SDK: run OpenCode inside the Durable Object using `@opencode/sdk/workerd`.
- Cloudflare R2: temporary project archives and generated result bundles.
- GitHub Actions: CI validation only; it is not the production task server.

This is preferred over using GitHub Actions as a long-running API server. GitHub Actions runners are ephemeral and are not designed to accept continuous desktop-client requests.

## Task lifecycle

1. Electron scans the selected local project and creates a filtered archive.
2. Electron requests a task upload session from the authenticated Worker.
3. Worker issues a short-lived, task-scoped upload authorization for R2.
4. Electron uploads the archive directly to R2; project files are not committed to GitHub.
5. Worker creates or wakes the task Durable Object.
6. The Durable Object retrieves the archive, validates paths and limits, and initializes the OpenCode Workerd host.
7. OpenCode processes the task in the isolated task context.
8. The worker packages proposed changes as a patch/result bundle in R2.
9. Electron downloads the result and displays the diff for review.
10. Only after explicit approval does Electron apply the patch locally.
11. Task objects and R2 objects are deleted on completion or expiry, with a scheduled cleanup fallback.

## Security requirements

- Do not embed Cloudflare API tokens, R2 credentials, or GitHub tokens in the Electron application.
- Authenticate desktop users with a short-lived user session; use OAuth PKCE or an equivalent flow. Do not use a shared permanent bearer token in a distributed client.
- Use short-lived, single-task upload/download authorization. Restrict each authorization to one object key and one operation.
- Validate archive size, file count, paths, symlinks, and decompression limits before processing.
- Never trust archive paths or task metadata supplied by the client.
- Do not expose the OpenCode host or its internal routes directly to the public internet.
- Keep model/provider credentials separate from task upload credentials.
- Treat project contents and model output as untrusted input.
- Never apply changes to the local project automatically.

## Free-tier expectations

Cloudflare R2 currently lists a free monthly allowance of 10 GB-month storage, 1 million Class A operations, and 10 million Class B operations; egress is free. Workers and Durable Objects have separate plan limits. These allowances are usage limits, not a guarantee of unlimited execution. Model inference may still require a provider with a free quota or a user-supplied API key.

## Implementation boundaries

- The existing Node.js worker and its SDK smoke test remain useful for local SDK validation.
- The production Cloudflare entry point must use the Workerd-specific SDK export documented by OpenCode.
- Do not assume a normal Node.js filesystem or child-process runtime inside Cloudflare Workers.
- Keep the first public deployment disabled until authentication, task-scoped storage access, and cleanup are implemented and tested.

## References

- OpenCode SDK: https://opencode.ai/docs/build/sdk
- OpenCode Cloudflare / Workerd guide: https://opencode.ai/docs/build/sdk/cloudflare
- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Cloudflare Workers Node.js compatibility: https://developers.cloudflare.com/workers/runtime-apis/nodejs/
