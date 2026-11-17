import { createServer } from "node:http";

const host = process.env.HOST || "127.0.0.1";
const port = Number.parseInt(process.env.PORT || "8787", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port.");
}

const server = createServer((request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    });
    response.end(JSON.stringify({
      status: "ok",
      service: "tda-remote-ai-agent-cloud-worker"
    }));
    return;
  }

  response.writeHead(404, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify({
    error: "not_found"
  }));
});

server.listen(port, host, () => {
  process.stdout.write(
    `TDA Remote AI Agent Cloud Worker listening on http://${host}:${port}\n`
  );
});

function shutdown() {
  server.close((error) => {
    if (error) {
      process.stderr.write(`${error.message}\n`);
      process.exitCode = 1;
    }
  });
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
