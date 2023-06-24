'use strict';

export const closeExtPanel = async () => {
    //console.log("close");
    chrome.runtime.sendMessage({"message": "clicked_browser_action"});
};

export const initClosePanelListener = async (callback = () => {}) => {
    //console.log(cb)
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.message === "clicked_browser_action") {
                callback();
                return true;
            }
            
        }
    );
}

