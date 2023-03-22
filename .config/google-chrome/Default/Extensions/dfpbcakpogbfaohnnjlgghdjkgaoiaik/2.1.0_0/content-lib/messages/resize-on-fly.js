'use strict'

export const initWindowResizeListener = async (resizeCallback = () => {}) => {

    window.addEventListener('resize', function(e) {
        //console.log(window.innerWidth, 'resized');
        resizeCallback();
    });

    chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
        //used for zoom events in the browser
        if(message.message == "resize_on_the_fly") {
            resizeCallback();
            return true;
        }   
    });
}