# TRAE SOLO Auto-Continue

Automatically clicks the **Continue / Retry** button in **TRAE SOLO** when the agent pauses at thinking or turn limits (e.g. `"Model thinking limit reached, please enter 'Continue' to get more."`).

Tested on **TRAE 3.6.13** (`Darwin arm64`, Electron 39).

> Inspired by [NyaMisty's original Trae v2.0.1 gist](https://gist.github.com/NyaMisty/850f6b126d7425a71a1d4d35f29a094a), updated for TRAE SOLO (`solo-lite`).

## Usage

1. Open **TRAE** and switch to **SOLO** mode.
2. Open Developer Tools:
   - **macOS:** `Cmd + Shift + P` → `Developer: Toggle Developer Tools`
   - **Windows / Linux:** `Ctrl + Shift + P` → `Developer: Toggle Developer Tools`
   *(If DevTools attaches to the wrong frame, switch the Console frame dropdown from `top` to the chat frame, or run `Developer: Open Webview Developer Tools`.)*
3. Verify you are in the chat frame by running this in the **Console** tab (it should **not** return `null`):
   ```js
   document.querySelector('.chat-input-v2-input-box-editable')
   ```
4. Copy the contents of [`trae-solo-auto-continue.js`](./trae-solo-auto-continue.js), paste into the Console, and press **Enter**.

### Stop the Script
```js
clearInterval(window.traeSoloAutoContinue)
```

## Configuration

Edit the constants at the top of `trae-solo-auto-continue.js` before pasting:
- `MAX_CONTINUES` (default `20`): safety cap to prevent endless loops and excessive quota/credit usage.
- `POLL_MS` (default `2000`): check interval in milliseconds.
- `COOLDOWN_MS` (default `4000`): minimum delay between clicks to prevent double-clicking.

## Notes
- Runs in memory only—if you restart or reload TRAE, paste the script again.
- Only pauses when the chat input's own stop icon (`.chat-input-v2-send-button-stop-icon`) is visible, so background terminal/run stop buttons won't block it.
