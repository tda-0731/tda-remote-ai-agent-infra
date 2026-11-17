import { mkdir } from "node:fs/promises";
import path from "node:path";
import { OpenCode } from "@opencode/sdk";

export async function createAgentSession(workspaceDirectory) {
  const resolvedWorkspace = path.resolve(workspaceDirectory);

  await mkdir(resolvedWorkspace, { recursive: true });

  const opencode = await OpenCode.create();

  try {
    const session = await opencode.sessions.create({
      location: {
        directory: resolvedWorkspace
      }
    });

    return {
      opencode,
      session,
      workspaceDirectory: resolvedWorkspace
    };
  } catch (error) {
    await opencode.close();
    throw error;
  }
}
