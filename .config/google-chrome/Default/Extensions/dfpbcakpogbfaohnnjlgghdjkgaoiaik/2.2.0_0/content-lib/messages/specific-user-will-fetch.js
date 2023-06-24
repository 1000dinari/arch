'use strict'

export const initSpecificUserFetchListener = async (iframeElem = null, usernameFromMessagePage = () => {}) => {
    if(!iframeElem) return;
    chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
        // console.log("Message received on React: " + message.message);
        if (message.message == "specific_user_will_fetch" && message?.data?.username) { 
          //console.log("specific_user_will_fetch: " + message?.data?.username);
          window.taplioExtState.username = message?.data?.username;
          iframeElem.contentWindow.postMessage(message, "*");
          return true;
        }

        if (message.message == "fetch_username_from_messaging_page") { 
          //console.log("specific_user_will_fetch: " + message?.data?.username);
          const profilePageUrl = document?.querySelector('a.msg-thread__link-to-profile')?.href || null;
          // console.log(profilePageUrl, 'fetch user from messaging page');
          if(profilePageUrl) {
             usernameFromMessagePage(profilePageUrl, iframeElem, message);
          } else {
            console.log("cannot find profile url from messaging page");
            // message.message = "url_change_not_profile_page";       
            // iframeElem.contentWindow.postMessage(message, "*");
          }
         
          return true;
        }
    });
    
}
