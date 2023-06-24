console.log('loaded api bridge')

//loads a div that we can check within Taplio app to make sure api-bridge-is-loaded...
const divToCheckApiBridgeLoad = document.createElement( 'div' )
divToCheckApiBridgeLoad.setAttribute( "width", "1px" )
divToCheckApiBridgeLoad.setAttribute( "height", "0px" )
divToCheckApiBridgeLoad.setAttribute( "id", "api-bridge-loaded" )
document.body.appendChild(divToCheckApiBridgeLoad);

window.addEventListener( "message", (event) => {

    //use this listener for messages coming from webapp
    const apiCallDetails = ( checkJSONString(event.data) )? JSON.parse(event.data) : {};
    
    if( apiCallDetails?.message == "taplio_app_api_call" ){

        //console.log("api call details", apiCallDetails)
        const taplioAPIMessage = apiCallDetails?.message || "default"
        const replyCallFnName = apiCallDetails?.replyCallFnName
        const taplioAPIPayload = {
            args: apiCallDetails.args,
            callUrl: apiCallDetails.callURL,
            callName: apiCallDetails.callName,
            mode: apiCallDetails.mode,
            returnMessage: apiCallDetails.returnMessage,
        }

        chrome.runtime.sendMessage( { "message":taplioAPIMessage, "payload":taplioAPIPayload }, ( results )=>{
          //console.log( "api call results before passing them onto to Taplio app", results)

          if( !results ) results = {};

          window.postMessage( JSON.stringify( {returnMessage: taplioAPIPayload.returnMessage, payload:results, replyCallFnName} ), "*" )

        })
    }

    return true

  })

const checkJSONString = (jsonstring="") => {

  try{

    JSON.parse(jsonstring)

  } catch ( e ){

    return false

  }
  
  return true
  
}
  
