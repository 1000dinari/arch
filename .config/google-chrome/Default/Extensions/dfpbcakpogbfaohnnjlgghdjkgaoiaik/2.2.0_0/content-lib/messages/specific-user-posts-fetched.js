'use strict'

export const initSpecificUserPostFetchListener = async (iframeElem = null) => {
    if(!iframeElem) return;

    chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
        //console.log("Message received on React: " + message.message);
        if (message.message == "specific_user_posts_fetched" && message?.data?.username) { 
            //console.log("specific_user_posts_fetched: " + message?.data?.username);
            window.taplioExtState.username = message?.data?.username;
            iframeElem.contentWindow.postMessage(message, "*");
            return true;
          }
    });
}