(() => {
  'use strict';

  const blockedStrings = ['events', 'backup', 'simple_response'];

  const safeIncludesBlockedString = (url) =>
    typeof url === 'string' && blockedStrings.some((str) => url.includes(str));

  const patchJQueryAjax = () => {
    const jq = window.jQuery || window.$;

    if (!jq || !jq.ajax || jq.__canvasHackPatchedAjax) {
      return false;
    }

    const originalAjax = jq.ajax;

    jq.ajax = function patchedAjax(...args) {
      const firstArg = args[0];
      const url = typeof firstArg === 'string' ? firstArg : firstArg?.url;

      if (safeIncludesBlockedString(url)) {
        console.log('[CanvasHack] AJAX request blocked:', url);
        return Promise.reject(
          new Error('Request blocked due to URL containing blocked strings.')
        );
      }

      return originalAjax.apply(this, args);
    };

    jq.__canvasHackPatchedAjax = true;
    return true;
  };

  const clearQlaEvents = () => {
    localStorage.removeItem('qla_events');
    console.log('[CanvasHack] qla_events cleared from localStorage.');
  };

  const bindSubmitButtonHandler = () => {
    const button = document.querySelector('#submit_quiz_button');

    if (!button || button.dataset.canvasHackBound === 'true') {
      return;
    }

    button.addEventListener('click', clearQlaEvents, { capture: true });
    button.dataset.canvasHackBound = 'true';
  };

  patchJQueryAjax();
  bindSubmitButtonHandler();

  const observer = new MutationObserver(() => {
    patchJQueryAjax();
    bindSubmitButtonHandler();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
