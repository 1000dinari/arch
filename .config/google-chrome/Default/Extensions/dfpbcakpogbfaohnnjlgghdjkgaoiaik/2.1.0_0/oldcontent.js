/* figured out import exports in content.js etc... */

window.showTaplioExt = false; //state

(async () => {
  const src = chrome.runtime.getURL("content-lib/app.js");
  const contentMain = await import(src);
  contentMain.initTaplioXApp();
  console.log(contentMain?.initTaplioXApp());
})();

const extLoadURLWhiteList = [
  'linkedin.com/feed/',
  'linkedin.com/jobs/',
  'linkedin.com/messaging/',
  'linkedin.com/notifications/',
  'linkedin.com/in/',
  'linkedin.com/home',
  'linkedin.com/logout'
];

let idUser, cookieLiAt, username, params;

const app = document.createElement( 'div' );
const isLeftSideBarPresentapX = (document.getElementsByClassName('scaffold-layout__aside')?.[0]?.offsetWidth) || false;
const leftSidebarWidth = (document.getElementsByClassName('scaffold-layout__aside')?.[0]?.offsetWidth) || 321;
const appContainerWidth = ((window?.innerWidth - document.getElementsByClassName("scaffold-layout-container")?.[0]?.offsetWidth)/2) + leftSidebarWidth;
const appContainerTop = document.getElementById('global-nav')?.offsetHeight;
app.id = "my-extension-root";
app.style.width = (appContainerWidth + 10) + 'px';
app.style.paddingLeft = "6px";
app.style.top = (isLeftSideBarPresentapX) ? (appContainerTop ) + 'px' : "0px";

const linkedInNavBar = document.getElementsByClassName('global-nav__primary-items')[0];
const extNavButtonLi = document.createElement('li');
const extNavButtonImg = chrome.runtime.getURL('logo_48.png');
const taplioXCloseButtonAnchor = document.createElement('a');
extNavButtonLi.id = "li-tapliox-button-container";
extNavButtonLi.classList.add('global-nav__primary-item');
taplioXCloseButtonAnchor.addEventListener('click', onClickAssistant, false);
taplioXCloseButtonAnchor.id = "tap-close-button-click";
taplioXCloseButtonAnchor.classList.add('app-aware-link','global-nav__primary-link');
taplioXCloseButtonAnchor.rel = "noopener noreferrer";
taplioXCloseButtonAnchor.innerHTML = '<div class="ivm-image-view-model global-nav__icon-ivm"><div class="ivm-view-attr__img-wrapper ivm-view-attr__img-wrapper--use-img-tag display-flex" style="height:24px"><li-icon aria-hidden="true" type="nav-small-job-posting-icon" active="true" size="large"><img src="'+extNavButtonImg+'" width="23" height="23" class="ember-view"/> </li-icon></div></div><span class="t-12 break-words block t-black--light t-normal    global-nav__primary-link-text" title="Post a job">Taplio X</span>';

const toIframe = document.createElement( 'iframe' );
toIframe.setAttribute( "width", leftSidebarWidth + 0 + "px");
toIframe.setAttribute( "height", "100%" )
toIframe.setAttribute( "id", "taplioIframe" )
toIframe.setAttribute( "class", "home" )
toIframe.setAttribute( "position", "relative" )

const closeButtonDiv = document.createElement( 'div' )
const taplioCloseButton = document.createElement( 'button' )
const closeIconURL = chrome.runtime.getURL( 'closeicon.png' )
const closeIconImg = document.createElement('img')
closeIconImg.src = closeIconURL

taplioCloseButton.onclick = function(){ close() }
//closeButtonDiv.style.left = (window?.innerWidth - (appContainerWidth + 10)) + "px";
closeButtonDiv.id="taplioCloseDiv";
taplioCloseButton.id="taplioCloseButton";

const loadTaplioXAppIntoContainer = (fallback = false) => {
  try {
    const messageAndAppContainer = document.getElementsByClassName('application-outlet')?.[0];
    messageAndAppContainer.appendChild(app);
  } catch (e) {
    console.log("Error Mouting App to Message Container...trying again...");
    if(!fallback) {
      setTimeout(
        () => {
          loadTaplioXAppIntoContainer(true);
        }, 3000
      )
    } else {
      console.log("Failed Mouting App to Message Container...mouting on main window");
      document.body.appendChild(app);
    }
  }
}

const getCookie = () => {

  chrome.storage.local.get([
    "idUser",
    "cookieLiAt"
  ], function (result) {

    if( result["idUser"] == "" || result["idUser"] == undefined ) result["idUser"] = false;

    console.log("idUser: " + result["idUser"]);
    
    let newIdUser = result["idUser"] ;
    let newCookieLiAt = result["cookieLiAt"];

    if ( newIdUser !== idUser && newIdUser!="") {
    //if(newIdUser !== idUser){
      idUser = newIdUser;

    } 

    if ( idUser == undefined || idUser == null ) {

      idUser = false

    }
    
    if (newCookieLiAt && newCookieLiAt !== cookieLiAt) {
      cookieLiAt = newCookieLiAt;
      // console.log("idInterval: " + refInterval.current);
      // clearInterval(refInterval.current);
    }

    //uncomment the right one.
    let url = "http://localhost:3001";
    // let url = "https://stats.taplio.com";
    // let url = "https://stats-dev.taplio.com";
    //let url = "https://analytics-mske8cyes-ponyexpress.vercel.app/"
    //let url = "https://analytics-dum2wkc9m-ponyexpress.vercel.app/"
    
    params = "?idUser=" + idUser + "&cookieLiAt=" + cookieLiAt + "&_vercel_no_cache=1" + "&tstamp=" + new Date().getTime();
    
    //iframe src has to be here, if getCookie is called from anywher, the iframe will refresh because of the following line.
    toIframe.src = url + params;
    
    //console.log("App - params: " + params);
    
  });
}


try {
  extNavButtonLi.appendChild(taplioXCloseButtonAnchor);
  linkedInNavBar.appendChild(extNavButtonLi);
} catch (e) {
 console.log('Error with attaching the button to the navbar or logged out');
}

closeButtonDiv.appendChild( taplioCloseButton )
taplioCloseButton.appendChild( closeIconImg )

app.appendChild( closeButtonDiv )
app.appendChild( toIframe )
loadTaplioXAppIntoContainer();

//do not open for smaller width screens
if(window?.innerWidth <= 1200) app.style.display = "none";

getCookie(); //init the app with the values of idUser and cookieLiAt

toIframe.onload = function(){
  // app.removeChild( puffLoader );
  onClickAssistant(false);
  resizeMessagingBoxTaplioX();
};



const removeExt = () => {
  document.body.removeChild(app);
}

const initExt = () => {
  document.body.appendChild(app);
}

const resizeOnFlyTaplioX = () => {
  //will be used for auto sizing the iframe, etc
  const messagingBoxWidth = appContainerWidth - leftSidebarWidth - 10;
    const messagingBox = document.getElementsByClassName('msg-overlay-list-bubble')[0];
    // const messagingBoxReStyle = document.createElement('style');
    // messagingBoxReStyle.innerHTML = '.msg-overlay-list-bubble{ widht: 200px}';
    // messagingBox.appendChild(messagingBoxReStyle);
    messagingBox.style.width = messagingBoxWidth + "px";
    messagingBox.setAttribute('style','flex: 0 0 ' + messagingBox.style.width);
    // console.log(messagingBox);
}

const resizeMessagingBoxTaplioX = (fallback = false) => {
  try {
    resizeOnFlyTaplioX();
  } catch (e) {
    console.log('Error resizing and accomdating messaging box. Trying again...' + e);
    setTimeout(
      () => {
        if(!fallback) resizeOnFlyTaplioX(true);
      }, 3000
    )
  }
  
}

//script for keeping connection alive with background service workers
let port;
function connectKeepAlive(){
  try{
    port = chrome.runtime.connect({name:'keepAlive'})
    port.onDisconnect.addListener(connectKeepAlive)
    port.onMessage.addListener((msg) => {
      console.log(msg, 'from bg')
      //return true;
    })
  }catch{
    console.log('port closed')
  }
}
connectKeepAlive()


const close = () => {
   //console.log("close");
  chrome.runtime.sendMessage({"message": "clicked_browser_action"});
};

// const forceRefresh = () => {
//   console.log("forceRefresh");
//   chrome.runtime.sendMessage({"action": "getCookie", "force": "true"},(res)=>{return true});
// };


function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}

function onClickAssistant (shouldToggle = true) {
  if(shouldToggle) toggle();
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

    toIframe.contentWindow.postMessage( creds, "*" )

    return true

  })

}
    
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      toggle();
    }
    return true;
  }
);

chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
  //console.log("Message received on React: " + message.message);
  
  if (message.message == "cookie_updated" && !cookieLiAt) { 
    // console.log("cookie_updated");
    getCookie();
  }

  if (message.message == "specific_user_will_fetch" && message?.data?.username) { 
    //console.log("specific_user_will_fetch: " + message?.data?.username);
    username = message?.data?.username;
    document.getElementById('taplioIframe').contentWindow.postMessage(message, "*");
  }

  if(message.message == "url_change_not_profile_page") {
    document.getElementById('taplioIframe').contentWindow.postMessage(message, "*");
  }

  if(message.message == "url_check_whitelist") {
   
    window.showTaplioExt = new RegExp(extLoadURLWhiteList.join("|")).test(message?.data?.url);
    
    console.log(window.showTaplioExt, message?.data?.tabId); 

  }
  
  if (message.message == "specific_user_posts_fetched" && message?.data?.username) { 
    //console.log("specific_user_posts_fetched: " + message?.data?.username);
    username = message?.data?.username;
    document.getElementById('taplioIframe').contentWindow.postMessage(message, "*");
  }
  
  if( message.message == "fetch_users_taplio_session" ){
    
    creds = message.data
    
    creds.userLoggedIntoTaplio = false
    creds.userLoggedIntoLinkedIn = false
   
    if( creds.user != undefined ){
      creds.userLoggedIntoTaplio = true
    }

    if( creds.dataToSave?.idUser != undefined ){
      creds.userLoggedIntoLinkedIn = true
    }

    creds.message = "fetched_users_taplio_session"
    
    toIframe.contentWindow.postMessage( creds, "*" );

  }

  return true;
});


window.addEventListener("message", (event)=>{
  //use this listener for messages coming from webapp
  //console.log(event,"messages outside")
  if( event?.data?.messageEventType == "taplioExtApp" ) {

    const webAppMessage = event?.data?.message || "default"
    const webAppMessagePayload = event?.data?.payload || {}
  //console.log(webAppMessage, webAppMessagePayload,"message from the webapp")
    const messageAction = {
      'refresh_linkedin': (payload) => { window.location.reload(); },
      'default': () => {}
                        
    };

    messageAction[webAppMessage](webAppMessagePayload);

    return true;

  }

});