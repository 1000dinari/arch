

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getRandomInList = (list, nbToKeep) => {

    let selected = [];

    for(let i=0; i<nbToKeep; i++) {
        if (list.length > 0) {
            let randomIndex = Math.floor(Math.random() * list.length);
            selected.push(list[randomIndex]);
            list.splice(randomIndex, 1);
        }
    }

    return selected;
}

export const sendUpdateMessageToTabs = (message = "cookie_updated", data = {}) => {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       for (var i=0; i<tabs.length; ++i) {
          // console.log("send message to: " + tabs[i].url);
          chrome.tabs.sendMessage(tabs[i].id, { "message": message, data }).catch((e) => {
             // console.log("send message error: " + e);
          });
       }
    }); 
}

export const sendTaplioCreds = async () => {
  
  let creds = await fetch(
      'https://app.taplio.com/api/auth/session', 
      
      {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
      })

      creds = await creds.json()
      return creds
      
  }
 
 export function setUpdateCSRFToken(){
  //set csrftoken constantly whenever possible to use for the api. 
  chrome.webRequest.onBeforeSendHeaders.addListener( ( data ) => {

    //console.log(data)

    chrome.storage.local.get( [ 'csrfToken' ], ( results ) => {
      //check old against new, if new value update csrfToken. 
      let newCsrfToken;
      if( data?.requestHeaders ){
          newCsrfToken = data.requestHeaders.filter( ( header ) => {
            return header.name == 'csrf-token'
          })
          
      }
      
      if( newCsrfToken && newCsrfToken.length > 0 && newCsrfToken[0].name == 'csrf-token' && newCsrfToken[0].value != results.csrfToken ){
          chrome.storage.local.set( { 'csrfToken': newCsrfToken[0].value }, () => {
            console.log( "new token detected, setting New Token: ", newCsrfToken[0].value, " - Old Token: ", results.csrfToken );
          } )
      }     
    } )
    
  
  },{
    urls:[ "https://www.linkedin.com/*" ],
    types: [ "xmlhttprequest" ]
  },
    [ "requestHeaders" ]
  )
 }

 