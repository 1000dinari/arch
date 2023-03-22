## Refactored, clean extension dir. without webpack and without react.

- No need to run yarn watch / build. Make changes in the code and directly reload the ***extension*** dir in Chrome/Chromium based browsers.
- Everything React and Webpack have been removed. 
- **Please note:** Imports only work in background.js and for js files in app.js. Imports / Exports will not work in content.js (chrome/chromium limitation on content scripts).
