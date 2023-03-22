'use strict'

export const initUrlChangeNotProfileListener = async (iframeElem = null) => {
    if(!iframeElem) return;

    chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
        //console.log("Message received on React: " + message.message);
        if(message.message == "url_change_not_profile_page") {
          iframeElem.contentWindow.postMessage(message, "*");
          return true;
        }
    });
}