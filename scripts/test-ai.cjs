// Test the AI test endpoint
const https = require("node:https");

function testAi(name, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/__test_ai__",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
        rejectUnauthorized: false,
      },
      (res) => {
        let chunks = "";
        res.on("data", (c) => (chunks += c));
        res.on("end", () => {
          console.log(`=== ${name} ===`);
          console.log("Status:", res.statusCode);
          try {
            const parsed = JSON.parse(chunks);
            console.log("Response:", JSON.stringify(parsed, null, 2));
          } catch {
            console.log("Response:", chunks);
          }
          console.log();
          resolve();
        });
      }
    );
    req.on("error", (e) => {
      console.log(`=== ${name} === ERROR:`, e.message);
      resolve();
    });
    req.write(data);
    req.end();
  });
}

(async () => {
  // Test 1: Local model (mock Ollama)
  await testAi("AI Test - Local Model (mock-llama)", {
    endpoint: "https://localhost:3000/__lm__/ollama/v1",
    apiKey: "local",
    model: "mock-llama",
  });

  // Test 2: Invalid endpoint
  await testAi("AI Test - Invalid Endpoint", {
    endpoint: "https://localhost:3000/__lm__/nonexistent/v1",
    apiKey: "local",
    model: "test",
  });

  // Test 3: Missing model
  await testAi("AI Test - Missing Model", {
    endpoint: "https://localhost:3000/__lm__/ollama/v1",
    apiKey: "local",
  });

  // Test 4: Direct mock model (bypass proxy)
  await testAi("AI Test - Direct Mock Model", {
    endpoint: "http://127.0.0.1:11434/v1",
    apiKey: "local",
    model: "mock-llama",
  });
})();
