#!/usr/bin/env node

/**
 * Health Check Prober for Test It With Kashii
 * Validates availability and contracts across all platform services.
 */

const http = require('http');

const endpoints = [
  { name: 'Laravel API', url: 'http://localhost:8000/api/health', critical: true },
  { name: 'Laravel Ping', url: 'http://localhost:8000/api/ping', critical: true },
  { name: 'Kashii Engine', url: 'http://localhost:8001/health', critical: true },
  { name: 'Browser Worker', url: 'http://localhost:8002/health', critical: true },
  { name: 'AI Gateway', url: 'http://localhost:8003/health', critical: true },
  { name: 'Next.js Frontend', url: 'http://localhost:3000', critical: false },
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(url, { timeout: 3000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const latency = Date.now() - start;
        try {
          const json = JSON.parse(data);
          resolve({ ok: res.statusCode < 400, statusCode: res.statusCode, latency, data: json });
        } catch {
          resolve({ ok: res.statusCode < 400, statusCode: res.statusCode, latency, raw: data.slice(0, 100) });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ ok: false, error: err.message, latency: Date.now() - start });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, error: 'Connection timed out (3s)', latency: 3000 });
    });
  });
}

async function run() {
  console.log('\n======================================================');
  console.log('  TEST IT WITH KASHII — HEALTH PROBE SUITE');
  console.log('======================================================\n');

  let allOk = true;

  for (const ep of endpoints) {
    process.stdout.write(`Checking ${ep.name.padEnd(20)} [${ep.url}] ... `);
    const result = await checkUrl(ep.url);
    if (result.ok) {
      console.log(`✅ OK (${result.latency}ms)`);
    } else {
      if (ep.critical) allOk = false;
      console.log(`❌ DOWN (${result.error || `HTTP ${result.statusCode}`})`);
    }
  }

  console.log('\n------------------------------------------------------');
  if (allOk) {
    console.log('🎉 All critical platform services are healthy!');
  } else {
    console.log('⚠️  Some services are offline. Run `docker compose up --build` or check local processes.');
  }
  console.log('------------------------------------------------------\n');
}

run();
