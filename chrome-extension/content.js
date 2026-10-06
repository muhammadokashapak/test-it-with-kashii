// Test It With Kashii — Content Script (Page Inspector)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'SCAN_DOM') {
    try {
      const links = document.querySelectorAll('a[href]');
      const buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"], [role="button"]');
      const inputs = document.querySelectorAll('input, textarea, select');
      const forms = document.querySelectorAll('form');

      const formSummary = Array.from(forms).slice(0, 5).map((form, idx) => {
        const fields = Array.from(form.querySelectorAll('input, select, textarea')).map((f) => ({
          name: f.name || f.id || 'unnamed',
          type: f.type || f.tagName.toLowerCase(),
          required: f.required || false,
        }));
        return {
          form_index: idx + 1,
          action: form.action || window.location.href,
          method: (form.method || 'GET').toUpperCase(),
          field_count: fields.length,
          fields,
        };
      });

      const summary = {
        page_title: document.title,
        url: window.location.href,
        discovery: {
          links_count: links.length,
          buttons_count: buttons.length,
          inputs_count: inputs.length,
          forms_count: forms.length,
        },
        forms: formSummary,
        interactive_fingerprint: {
          ready_state: document.readyState,
          body_child_nodes: document.body ? document.body.children.length : 0,
        },
      };

      sendResponse(summary);
    } catch (err) {
      sendResponse({ error: err.message });
    }
  }
  return true;
});
