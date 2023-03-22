/* figured out import exports in content.js etc... */

(async () => {
  const src = chrome.runtime.getURL("content-lib/main.js");
  const contentMain = await import(src);
  await contentMain.initTaplioXApp();
  
})();
