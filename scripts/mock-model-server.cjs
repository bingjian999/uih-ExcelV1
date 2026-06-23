"use strict";
// Mock OpenAI-compatible local model server (simulates Ollama on :11434)
const http = require("node:http");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1:11434");
  console.log("[mock-model]", req.method, url.pathname);

  if (url.pathname === "/api/tags") {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ models: [{ name: "mock-llama:latest" }] }));
    return;
  }
  if (url.pathname === "/v1/models" && req.method === "GET") {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ object: "list", data: [{ id: "mock-llama", object: "model" }] }));
    return;
  }
  if (url.pathname === "/v1/chat/completions" && req.method === "POST") {
    // Read body to check stream flag
    let bodyStr = "";
    req.on("data", (c) => (bodyStr += c));
    req.on("end", () => {
      let isStream = true;
      try { isStream = JSON.parse(bodyStr).stream !== false; } catch {}
      if (!isStream) {
        // Non-streaming: return regular JSON
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({
          id: "chatcmpl-mock",
          object: "chat.completion",
          choices: [{
            index: 0,
            message: { role: "assistant", content: "Hello from local model!" },
            finish_reason: "stop",
          }],
          usage: { prompt_tokens: 5, completion_tokens: 5, total_tokens: 10 },
        }));
        return;
      }
      // Streaming: SSE
      res.setHeader("content-type", "text/event-stream");
      res.setHeader("cache-control", "no-cache");
      const chunks = [
        { choices: [{ delta: { content: "Hello " }, index: 0 }] },
        { choices: [{ delta: { content: "from local model!" }, index: 0 }] },
      ];
      let i = 0;
      const timer = setInterval(() => {
        if (i < chunks.length) {
          res.write(`data: ${JSON.stringify(chunks[i])}\n\n`);
          i++;
        } else {
          res.write("data: [DONE]\n\n");
          res.end();
          clearInterval(timer);
        }
      }, 50);
    });
    return;
  }
  res.statusCode = 404;
  res.end("not found");
});

server.listen(11434, "127.0.0.1", () => {
  console.log("[mock-model] listening on http://127.0.0.1:11434");
});
