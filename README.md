# CanvasHack Chrome Extension

This repository is now set up as a Chrome extension (Manifest V3).

## What it does

- Patches `jQuery.ajax` (when available) to block requests whose URLs contain:
  - `events`
  - `backup`
  - `simple_response`
- Clears `localStorage.qla_events` when `#submit_quiz_button` is clicked.

## Install in Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select this repository folder.

## Notes

- The extension runs on Canvas-like domains defined in `manifest.json`.
- If your Canvas URL doesn't match those patterns, add your domain under `content_scripts.matches`.
