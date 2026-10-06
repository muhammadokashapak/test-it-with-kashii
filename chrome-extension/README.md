# 🛡️ Test It With Kashii — Chrome Extension Copilot

This Chrome Extension (Manifest V3) connects directly to your local **Test It With Kashii** platform.

## 🚀 How to Install in Google Chrome (10 Seconds)

1. Open **Google Chrome** (or Edge / Brave).
2. Go to the address:
   ```
   chrome://extensions/
   ```
3. Enable **Developer mode** toggle in the top-right corner.
4. Click the **"Load unpacked"** button in the top-left corner.
5. Select this folder:
   ```
   o:\Projects\test-it-with-kashii\chrome-extension
   ```
6. The **Test It With Kashii** icon will appear in your Chrome toolbar!

---

## ⚡ Features

- **Auto Target Detection**: Detects the URL of whichever tab you have open.
- **Worker Topology Status**: Shows real-time connection status for:
  - Laravel API (`:8000`)
  - Kashii Execution Engine (`:8001`)
  - Playwright Browser Worker (`:8002`)
  - AI Gateway (`:8003`)
- **🔍 Scan Tab DOM & Elements**: Analyzes interactive elements, buttons, links, forms, and input fields on the active page.
- **⚡ Trigger Autonomous Run**: Starts an autonomous test run on the active target URL via Kashii Engine.
- **↗ Open Dashboard**: One-click shortcut to the full Next.js SaaS Dashboard (`http://localhost:3000`).
