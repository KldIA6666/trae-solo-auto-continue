(() => {
  const MAX_CONTINUES = 20; // Safety cap to avoid infinite credit/quota burn
  const POLL_MS = 2000;
  const COOLDOWN_MS = 4000;

  clearInterval(window.traeSoloAutoContinue);

  let remaining = MAX_CONTINUES;
  let lastClickAt = 0;

  const isVisible = el =>
    !!(el && (el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0));

  window.traeSoloAutoContinue = setInterval(() => {
    if (remaining <= 0) {
      console.log('[SOLO Auto-Continue] Max cap reached, stopping.');
      clearInterval(window.traeSoloAutoContinue);
      return;
    }

    // Only pause while the chat input's own Stop icon is visible
    const stopIcon = document.querySelector('.chat-input-v2-send-button-stop-icon');
    if (isVisible(stopIcon)) return;

    // Find the visible Continue / Retry action button
    const buttons = [...document.querySelectorAll('button')].filter(b =>
      isVisible(b) &&
      !b.disabled &&
      /^(continue|继续|retry|重试)$/i.test((b.innerText || '').trim())
    );

    const continueBtn =
      buttons.find(b => b.className.includes('actionButton')) ||
      buttons[buttons.length - 1];

    if (!continueBtn) return;

    const now = Date.now();
    if (now - lastClickAt < COOLDOWN_MS) return;

    lastClickAt = now;
    remaining--;
    console.log(
      `[SOLO Auto-Continue] Clicking "${continueBtn.innerText.trim()}" (${remaining} left):`,
      continueBtn
    );
    continueBtn.click();
  }, POLL_MS);

  console.log('[SOLO Auto-Continue] Active. Stop with: clearInterval(window.traeSoloAutoContinue)');
})();