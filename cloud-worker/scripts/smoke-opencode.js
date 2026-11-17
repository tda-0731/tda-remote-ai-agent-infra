import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createAgentSession } from "../src/opencode.js";

const workspaceDirectory = await mkdtemp(
  path.join(os.tmpdir(), "tda-agent-smoke-")
);

let agent;

try {
  agent = await createAgentSession(workspaceDirectory);

  if (!agent.session?.id) {
    throw new Error("OpenCode did not return a session ID.");
  }

  process.stdout.write("OpenCode SDK host: OK\n");
  process.stdout.write("OpenCode session: OK\n");
} finally {
  if (agent?.opencode) {
    await agent.opencode.close();
  }

  await rm(workspaceDirectory, {
    recursive: true,
    force: true
  });
}
