// Test It With Kashii — Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  console.log('[Kashii Extension] Installed successfully.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PING') {
    sendResponse({ status: 'PONG', timestamp: new Date().toISOString() });
  }
  return true;
});
