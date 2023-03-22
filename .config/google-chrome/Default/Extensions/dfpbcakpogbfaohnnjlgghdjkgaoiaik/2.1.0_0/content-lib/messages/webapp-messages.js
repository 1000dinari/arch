'use strict';

export const initWebAppMessageListeners = async (iframeElem = null) => {
    window.addEventListener("message", (event)=>{
        //use this listener for messages coming from webapp
        //console.log(event,"messages outside")
        if(event?.data?.messageEventType == "taplioExtApp") {
          const webAppMessage = event?.data?.message || "default";
          const webAppMessagePayload = event?.data?.payload || {};
        //console.log(webAppMessage, webAppMessagePayload,"message from the webapp")
          const messageAction = {

            'refresh_linkedin': (payload) => { window.location.reload(); },

            'check_url_on_load_for_profile': (payload) => {
             
              if(window?.location?.href.toLowerCase().includes("linkedin.com/in/")) {
                console.log('checking for profile page on ext load...' );
                //setInterval required for new or reloaded pages that use dashEntityURN in linkedin which redirects the page in linked in to one with the correct user name. Need this to fishin before sending a message to the webapp.
                setTimeout(
                  () => {
                    const username = window.location.href.split("https://www.linkedin.com/in/")?.[1]?.split("/")?.[0].split("?")?.[0];
                    let message = {
                      message: "specific_user_will_fetch",
                      data: {
                        username
                      }
                    };
                    //console.log("is a profile page on load/refresh with username:", username);
                    window.taplioExtState.username =  username;
                    if(iframeElem) iframeElem.contentWindow.postMessage(message, "*");
                  }, 1200
                );
              }
              
            },

            'tapliox_is_dark_mode': () => {
              const message = {
                message: "tapliox_is_dark_mode",
                payload: window.taplioExtState.isLinkedinDarkMode
              }
          
              iframeElem.contentWindow.postMessage(message, "*");
            },

            'default': () => {}

          };
      
          messageAction[webAppMessage](webAppMessagePayload);
      
          return true;
      
        }
      });
}
