/* can import. should only be imports */
/* needs cleanup */
import {
   fetchPostsMultiple,
   fetchPosts,
   fetchMe,
   sendData,
} from "./app/fetchers.js";
import {
   sendTaplioCreds,
   sendUpdateMessageToTabs,
   setUpdateCSRFToken
} from "./app/utils.js";

import {
   callAPI
} from "./app/api.js";
import * as analytics from "./app/analytics.js";

const maxRefreshRate = 18; // in hours
const maxRefreshRateWhenForced = 4; // in hours

let lastRefreshDate = new Date(2022, 0, 1);
let lastFetchDateProfile = {};
let lastFetchDateAnyProfile = new Date(2022, 0, 1);

let conf = {

};

analytics.log("extension_init");

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
   //console.log("onUpdated");
   //console.log({tabId, changeInfo, tab});

   if (tab?.url?.includes("/in/") && changeInfo.status == 'complete') {
      try {
         let split1 = tab.url.split("https://www.linkedin.com/in/")[1];
         let split2 = split1.split("/");
         let username = split2[0]?.split("?")?.[0];
         console.log("check username: " + username);
         fetchFromUserName(username);

      }
      catch (e) {
         console.log("Error in getting user posts: " + e.message);
      }
   }


   if (tab?.url?.includes("/posts/") && changeInfo.status=='complete') {
      try {
         let split1 = tab.url.split("https://www.linkedin.com/posts/")[1];
         let split2 = split1.split("_");
         let username = split2[0];
         console.log("check username from post: " + username);
         fetchFromUserName(username);
         
      }
      catch (e) {
         console.log("Error in getting user posts: " + e.message);
      }
   }

   if (tab?.url?.includes("/messaging/thread/") && changeInfo.status=='complete') {
      try {
         sendUpdateMessageToTabs( "fetch_username_from_messaging_page", "" );
      }
      catch (e) {
         console.log("Error in getting user's username from messaging page (first message): " + e.message);
      }
   }
   
   if ((!tab?.url?.includes("/in/") && !tab?.url?.includes("/posts/")) && !tab?.url?.includes("/messaging/thread/") && changeInfo.status=='complete') {
      try {
         sendUpdateMessageToTabs( "url_change_not_profile_page", "" );
      }
      catch (e) {
         console.log("Error in navigation messages: " + e.message);
      }
   }

   try {
      if(tab?.url?.includes("linkedin.com")  && changeInfo.status == 'complete'){
         sendUpdateMessageToTabs( "url_check_whitelist", {url: tab?.url, tabId: tab?.id});
      }
   } catch (e) {
      console.log('error occured while sending message: url_check_whitelist');
   }

   try{

      if(tab?.url?.includes("linkedin.com")  && changeInfo.status == 'complete') {

         const sessionAndCreds = sendConnectToTaplio()

         sessionAndCreds.then((creds) => {
            sendUpdateMessageToTabs("fetch_users_taplio_session", creds)
         })
      }

      if(tab?.url?.match(/linkedin\.com\/(.+)?\/logout/)) {
         //console.log('log out detected...')
         onLogoutResetStorage()
      }

   } catch (e) {
      console.log('An error occured:' + e);
   }
});

// chrome.webRequest.onBeforeRequest.addListener((details) => {
//    const body = decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes)));
//    const parsedBody = JSON.parse(atob(body));
//    if (parsedBody["csp-report"].hasOwnProperty("sn"))
//        (0, sendErrorReport_1.default)(JSON.stringify({ ...details, body: { ...parsedBody, name: decode(parsedBody["csp-report"].sn) } }));
//    console.log("canceling Linkedin request: ", details);
//    return { cancel: true };
// }, {
//    urls: ["*://www.linkedin.com/platform-telemetry/contentsecurity/*"],
// }, ["requestBody", "blocking"]);

// chrome.webRequest.onBeforeRequest.addListener(function () {
//    return {
//        cancel: true,
//    };
// }, {
//    urls: [
//        "*://www.linkedin.com/platform-telemetry/*",
//        "*://www.linkedin.com/platform-telemetry/csp?f=l",
//        "*://www.linkedin.com/lite/contentsecurity",
//        "*://www.linkedin.com/lite/contentsecurity?f=p",
//        "*://www.linkedin.com/uas/js/TXbEYyrcV7m5DbGr",
//        "*://www.linkedin.com/sc/h/br/*",
//        "*://www.linkedin.com/sensorCollect/*",
//        "*://www.linkedin.com/litms/api/metadata/user",
//        "*://platform.linkedin.com/*",
//        "*://sb.scorecardresearch.com/*",
//        "*://www.linkedin.com/csp/*",
//    ],
// }, ["blocking"]);


const fetchFromUserName = async (username) => {

   sendUpdateMessageToTabs("specific_user_will_fetch", { username: username });

   let now = new Date();
   let lastFetchDate = lastFetchDateProfile[username];
   console.log("check fetch: " + lastFetchDate + " - lastFetchDateAnyProfile: " + lastFetchDateAnyProfile);

   // if (true) {
   //if (!lastFetchDate || (lastFetchDate-now > 1*60*1000) && conf.cookie_li_at) { // 1 minute
   if ((!lastFetchDate || (lastFetchDate - now > 72 * 60 * 60 * 1000)) // 72h
      && (!lastFetchDateAnyProfile || (lastFetchDateAnyProfile - now > 1 * 60 * 60 * 1000)) // 1h
      && conf.cookie_li_at
   ) { // 1 hour
      console.log("time ok to fetch: " + username);
      lastFetchDateProfile[username] = new Date();
      lastFetchDateAnyProfile = new Date();

      let response = await fetch("https://us-central1-ez4cast.cloudfunctions.net/linkedinFetcher-askFetch?username=" + username);
      let json = await response.json();

      // if (true) {
      if (json?.success && json?.data?.needToFetch && json?.data?.dashEntityUrn) {
         console.log("allowed to fetch: " + username + " - id: " + json.data.dashEntityUrn);

         // let nbIterations = json?.data?.fullFetch ? 10 : 1;
         let nbIterations = 1;

         let newConf = {
            ...conf,
            username: username,
            dashEntityUrn: "urn:li:fsd_profile:" + json.data.dashEntityUrn,
            disableFetchInteraction: true,
            // startCount: json?.data?.startCount ? Math.floor(json?.data?.startCount / 100) * 100 : 0,
         };
         // await fetchPostsMultiple(100, nbIterations, newConf);
         await fetchPosts(10, newConf);
         sendUpdateMessageToTabs("specific_user_posts_fetched", { username: username });
      }
   }
}

const getCookie = (isForceRefresh = false, countPost = 10) => {

   conf.cookie_JSESSIONID = "";
   conf.cookie_li_at = "";

   console.log("getCookie - countPost: " + countPost);

   chrome.cookies.get(
      { url: "https://www.linkedin.com", name: "li_at" },
      (cookie) => {
         // console.log("cookie", cookie);
         // console.log(cookie);
         if (cookie) {
            conf.cookie_li_at = cookie.value;
            chrome.storage.local.set({ "cookieLiAt": cookie.value });
            console.log("save cookieLiAt in local storage");
            sendUpdateMessageToTabs("cookie_updated");
         }

         fetchAll(isForceRefresh, countPost);

      },
   );
   chrome.cookies.get(
      // {url: "https://linkedin.com", name: "li_at"},
      { url: "https://www.linkedin.com", name: "JSESSIONID" },
      (cookie) => {
         // console.log("cookie JSESSIONID:");
         // console.log(cookie);
         if (cookie) {
            conf.cookie_JSESSIONID = cookie.value;
            chrome.storage.local.set({ "cookieJSESSIONID": cookie.value });
         }

         fetchAll(isForceRefresh, countPost);
      },
   );
}

const fetchAll = async (isForceRefresh, countPost = 100) => {

   if (conf.cookie_JSESSIONID && conf.cookie_li_at) {

      console.log("fetchAll - have both cookies - countPost: " + countPost);

      chrome.storage.local.get([
         "idUser",
         "username",
         "dashEntityUrn",
         "lastRefreshDate",
         "savedData",
         "nbFetchDone",
         "companies",
         "nbFetchProfileViews",
      ], async (result) => {

         conf.idUser = result["idUser"];
         conf.username = result["username"];
         conf.dashEntityUrn = result["dashEntityUrn"];
         conf.nbFetchDone = result["nbFetchDone"];
         conf.companies = result["companies"] ? JSON.stringify(result["companies"]) : null;
         conf.nbFetchProfileViews = result["nbFetchProfileViews"] ? 0 : result["nbFetchProfileViews"];
         conf.userAgent = navigator.userAgent;
         
         console.log('fetchAll - conf:', conf);

         // in any case, send the cookies
         if (conf.idUser && conf.username && conf.cookie_li_at) {
            sendData("cookie", {
               dashEntityUrn: conf.dashEntityUrn,
               idUser: conf.idUser,
               username: conf.username,
               cookie_JSESSIONID: conf.cookie_JSESSIONID,
               cookie_li_at: conf.cookie_li_at,
               userAgent: conf.userAgent,
            }, conf);
         }

         if (conf.nbFetchDone && conf.nbFetchDone > 0)
            countPost = 10;

         console.log("fetchAll - nb fetched: " + conf.nbFetchDone + " - count: " + countPost);

         try {
            let savedDataString = result["savedData"];
            conf.savedData = savedDataString ? JSON.parse(savedDataString) : { posts: [] };
         }
         catch (e) {
            console.log(e);
            conf.savedData = { posts: [] };
         }
         //console.log("savedData: ", conf.savedData);

         if (result["lastRefreshDate"]) {
            let tempDate = new Date(result["lastRefreshDate"]);
            if (!conf.lastRefreshDate || tempDate > conf.lastRefreshDate)
               conf.lastRefreshDate = tempDate;
         }

         // console.log("userAgent: " + userAgent);

         // console.log("fetchAll - idUser: " + idUser);
         console.log("fetchAll - lastRefreshDate: " + conf.lastRefreshDate);
         // console.log("fetchAll - diff: " + ((new Date().getTime() - lastRefreshDate.getTime()) / 1000 / 60) + " minutes");
         //isForceRefresh = true
         if (!conf.lastRefreshDate
            || (isForceRefresh && ((new Date().getTime() - conf.lastRefreshDate.getTime()) > (1000 * 60 * 60 * maxRefreshRateWhenForced))) 
            || ((new Date().getTime() - conf.lastRefreshDate.getTime()) > (1000 * 60 * 60 * maxRefreshRate) 
            || !conf?.idUser) //!conf?.idUser conditional check is required for users who logout or switch accounts or login after downloading the extension -- manoj.
         ) {
            // if (true) {

            console.log("will fetch");

            let newNbFetchDone = conf.nbFetchDone ? conf.nbFetchDone + 1 : 1;
            conf.lastRefreshDate = new Date();
            chrome.storage.local.set({ "lastRefreshDate": new Date().getTime(), nbFetchDone: newNbFetchDone });

            let newConf = await fetchMe(conf, countPost);
            conf = { ...conf, ...newConf };
            sendUpdateMessageToTabs("cookie_updated");

            // let url = "https://www.linkedin.com/in/stanislasnioxchateau";
            // await fetchFullProfile(url, conf);
         }
         else {
            console.log("Last refresh too soon: " + Math.floor((new Date().getTime() - conf.lastRefreshDate.getTime()) / 1000 / 60) + " minutes ago")
         }
      });
   }
}

//functions for keeping background service worker running during inactive periods for preventing gray screen of death.
const onMessaged = (msg, port) => {
   console.log(msg, port.name)
   //return true
}

const forceReconnect = (port) => {
   deleteTimer(port)
   port.disconnect()
}

const deleteTimer = (port) => {
   if (port._timer) {
      clearTimeout(port._timer)
      delete port._timer
   }
}

try {

   // for debug purposes: 
   // chrome.storage.local.set({ "cookieLiAt": "", "cookieJSESSIONID": "", "idUser": "", "dashEntityUrn": "", "username": "" });

   getCookie();

   setInterval(() => {
      console.log("launch regular fetch - time: " + new Date());
      getCookie();
   }, 1000 * 60 * 60 * 1); // 1 hour
   // }, 1000 * 60 * 1); // 1 min

   // console.log("Adding onMessage listener");
   chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      // Send a message to the active tab
      console.log("background - action: " + request.action);
      console.log("background - message: " + request.message);

      if (request.action == "getCookie") {
         getCookie(request?.force == "true");
      }

      else if (request.action == "open_sidebar") {
         getCookie(true, 10);
      }

      if (request.message == "clicked_browser_action") {
         chrome.tabs.sendMessage(sender.tab.id, { "message": "clicked_browser_action" });
      }

      if (request.message == "fetch_users_taplio_session") {

         const sessionAndCreds = sendConnectToTaplio()

         sessionAndCreds.then((creds) => {
            sendResponse(creds)
         })
      }

      if( request.message == "get_endpoint_url_for_taplio" ) {
         chrome.management.getSelf(function(app_info){
                  sendResponse({env: app_info.installType});
            
         });
      }

      return true; //needed for all onMessages. keeps the channel from closing abruptly.

   });

   chrome.runtime.onInstalled.addListener(function (object) {
      // console.log("addListener triggered - reason:" + object.reason);
      if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
         chrome.tabs.create({ url: "https://ponyexpress.notion.site/Taplio-X-Chrome-Extension-User-Manual-61c234a17a0143d180e5b4b6cd306b7d" }, function (tab) {
            console.log("New tab launched with https://ponyexpress.notion.site/Taplio-X-Chrome-Extension-User-Manual-61c234a17a0143d180e5b4b6cd306b7d");
         });
      }
   });

   //for making sure the service workers continue on
   chrome.runtime.onConnect.addListener((port) => {
      if (port.name == 'keepAlive') {
         port.onMessage.addListener(onMessaged)
         port.onDisconnect.addListener(deleteTimer)
         port._timer = setTimeout(forceReconnect, 250e3, port)
         return true;
      }
   });
}
catch (e) {

   console.log("An error occured: " + e);
}

const sendConnectToTaplio = async () => {

   const dataToSave = await chrome.storage.local.get(["idUser", "dashEntityUrn", "username"])

   let taplioUserCreds = await sendTaplioCreds()

   taplioUserCreds.dataToSave = dataToSave

   return taplioUserCreds

}

const onLogoutResetStorage = async () => {

   await chrome.storage.local.set({ "idUser": "" })
   //console.log(dataToSave)

}

//keeps the csrf token fresh...used for making api requests from taplio app...
setUpdateCSRFToken()

//init the messaging for calling api from taplio app...
callAPI(conf)

chrome.windows.onBoundsChanged.addListener((w)=>{
   sendUpdateMessageToTabs('resize_on_the_fly', {width: w?.width, height:w?.height});
});
