'use strict'

export const initCookieUpdaterListener = (cbUpdateCookie = () => {}) => {
    chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
        if (message.message == "cookie_updated" && !window.taplioExtState.cookieLiAt) { 
          cbUpdateCookie();
          return true;
        }
    });
}
