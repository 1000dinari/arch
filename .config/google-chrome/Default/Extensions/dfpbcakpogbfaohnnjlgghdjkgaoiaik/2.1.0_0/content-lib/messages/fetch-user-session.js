'use strict';

export const fetchUserSessionCreds = (shouldToggle = true, appIframeElem = null, callBackOnToggle = () => {}) => {
    //console.log(shouldToggle, callBackOnToggle, appIframeElem)
    if(!appIframeElem) return;

    if(shouldToggle) callBackOnToggle();

    chrome.runtime.sendMessage({"action": "open_sidebar"},(res)=>{return true});
    chrome.runtime.sendMessage(

    { "message": "fetch_users_taplio_session" }, 

    ( creds ) => {
        creds.userLoggedIntoTaplio = false
        creds.userLoggedIntoLinkedIn = false
        
        if( creds.user != undefined ){
        creds.userLoggedIntoTaplio = true
        }

        if( creds.dataToSave?.idUser != undefined ){
        creds.userLoggedIntoLinkedIn = true
        }

        creds.message = "fetched_users_taplio_session"

        appIframeElem.contentWindow.postMessage( creds, "*" )
        return true;
    });
    
}

export const initFetchUsersTaplioSessionListener = (iframeElem) => {
    if(!iframeElem) return;

    chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
        if(message.message == "fetch_users_taplio_session") {
      
            const creds = message.data;
            creds.userLoggedIntoTaplio = false;
            creds.userLoggedIntoLinkedIn = false;
           
            if(creds.user != undefined) {
              creds.userLoggedIntoTaplio = true;
            }
        
            if(creds.dataToSave?.idUser != undefined) {
              creds.userLoggedIntoLinkedIn = true;
            }
        
            creds.message = "fetched_users_taplio_session";
            iframeElem.contentWindow.postMessage( creds, "*" );

            return true;
          }
    })
}

