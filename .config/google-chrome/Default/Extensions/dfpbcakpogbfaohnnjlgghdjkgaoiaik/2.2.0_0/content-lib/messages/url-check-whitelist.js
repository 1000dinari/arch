'use strict'

export const initUrlCheckWhiteListListener = async (whiteListCallBack = (url = null) => {}) => {
    
    chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
        //console.log("Message received on React: " + message.message);
        if(message.message == "url_check_whitelist") {
            //   window.showTaplioExt = new RegExp(extLoadURLWhiteList.join("|")).test(message?.data?.url);
            whiteListCallBack(message?.data?.url);
            //console.log(window.taplioExtState.showExt, message?.data); 
            return true;
          }
    });
}