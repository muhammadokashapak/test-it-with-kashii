// Test It With Kashii — Chrome Extension Popup Logic

const ENDPOINTS = {
  api: 'http://localhost:8000/api/ping',
  engine: 'http://localhost:8001/health',
  browser: 'http://localhost:8002/health',
  ai: 'http://localhost:8003/health',
  engineRun: 'http://localhost:8001/runs/mock-execute',
  dashboard: 'http://localhost:3000',
};

let currentTabUrl = '';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Get Active Tab URL
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      currentTabUrl = tab.url;
      document.getElementById('targetUrl').textContent = currentTabUrl;
    } else {
      document.getElementById('targetUrl').textContent = 'No active web tab detected';
    }
  } catch (err) {
    document.getElementById('targetUrl').textContent = 'Local Extension Context';
  }

  // 2. Initial Probe
  probeTopology();

  // 3. Event Listeners
  document.getElementById('refreshBtn').addEventListener('click', probeTopology);
  document.getElementById('scanDomBtn').addEventListener('click', scanTabDom);
  document.getElementById('triggerRunBtn').addEventListener('click', triggerTestRun);
  document.getElementById('openDashboardBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: ENDPOINTS.dashboard });
  });
});

async function checkHealth(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}

async function probeTopology() {
  const pills = {
    pillApi: ENDPOINTS.api,
    pillEngine: ENDPOINTS.engine,
    pillBrowser: ENDPOINTS.browser,
    pillAi: ENDPOINTS.ai,
  };

  for (const [pillId, url] of Object.entries(pills)) {
    const el = document.getElementById(pillId);
    el.className = 'status-pill';
    const isOnline = await checkHealth(url);
    if (isOnline) {
      el.className = 'status-pill online';
    } else {
      el.className = 'status-pill offline';
    }
  }
}

function showOutput(title, content) {
  const container = document.getElementById('outputArea');
  const titleEl = document.getElementById('outputTitle');
  const contentEl = document.getElementById('outputContent');

  container.style.display = 'block';
  titleEl.textContent = title;
  contentEl.textContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
}

async function scanTabDom() {
  showOutput('SCANNING ACTIVE TAB...', 'Sending inspector to page DOM...');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      showOutput('SCAN ERROR', 'Cannot inspect current tab.');
      return;
    }

    chrome.tabs.sendMessage(tab.id, { action: 'SCAN_DOM' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        showOutput(
          'DOM SCAN RESULT (DIRECT EVAL)',
          `Target: ${currentTabUrl}\nNote: Chrome internal pages or un-injected tabs cannot be read directly. Navigate to http://localhost:3000 or any website to inspect.`
        );
      } else {
        showOutput('PAGE DISCOVERY SUMMARY', response);
      }
    });
  } catch (err) {
    showOutput('SCAN ERROR', err.message);
  }
}

async function triggerTestRun() {
  const runId = 'ext-run-' + Date.now().toString(36);
  const target = currentTabUrl.startsWith('http') ? currentTabUrl : 'http://localhost:3000';

  showOutput('TRIGGERING RUN...', `Run ID: ${runId}\nTarget: ${target}\nCalling Kashii Engine :8001...`);

  try {
    const res = await fetch(ENDPOINTS.engineRun, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        run_id: runId,
        target_url: target,
      }),
    });

    if (!res.ok) {
      throw new Error(`Engine returned HTTP ${res.status}`);
    }

    const data = await res.json();
    showOutput('AUTONOMOUS RUN COMPLETED ✅', data);
  } catch (err) {
    showOutput('EXECUTION ERROR ❌', `Could not reach Kashii Engine at :8001.\nError: ${err.message}\nMake sure Engine is running.`);
  }
}
