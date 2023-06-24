'use strict';

export const extLoadURLWhiteList = [
    'linkedin.com/feed/',
    'linkedin.com/posts/',
    'linkedin.com/messaging/',
    'linkedin.com/notifications/',
    'linkedin.com/in/',
    'linkedin.com/home',
    'linkedin.com/logout'
];

export const getLeftSidebarWidthTapX = () => { 
    return (document.getElementsByClassName('scaffold-layout__aside')?.[0]?.offsetWidth) || 321;
    
}

export const isLeftSideBarPresentapX = () => {
    return (document.getElementsByClassName('scaffold-layout__aside')?.[0]?.offsetWidth) || false;
}

export const getLeftSideBarAsAppContainer = () => {
    return (document.getElementsByClassName('scaffold-layout__aside')?.[0]);
}

export const getTaplioXContainerWidth = () => {
    return ((window?.innerWidth - document.getElementsByClassName("scaffold-layout-container")?.[0]?.offsetWidth)/2) + getLeftSidebarWidthTapX();
}
//scaffold-layout__inner scaffold-layout-container scaffold-layout-container--reflow
export const getTaplioXContainerTop = () => {
    return document.getElementById('global-nav')?.offsetHeight;
}

export const getLinkedInNavBar = ()  => {
    return (document.querySelector('ul.global-nav__primary-items') || document.getElementsByClassName('top-nav-menu')[0] || document.getElementsByClassName('global-nav__primary-items')[0]);
}

export const getMessageAndAppContainer = ()  => {
    return document.getElementsByClassName('application-outlet')?.[0];
}

export const getNavBarButtonLi = () => {
    return document.getElementById('li-tapliox-button-container');
}

export const getLinkedInMessagingBox = () => {
    return document.getElementsByClassName('msg-overlay-list-bubble')[0];
}

export const getMainTaplioXRoot = () => {
    return document.getElementById('taplio-extension-root');
}

export const getTaplioIframe = () => {
    return document.getElementById('taplio-iframe');
}

export const getLinkedInProfileToolBar = () => {
    return document.querySelector('.scaffold-layout-toolbar.scaffold-layout-toolbar--is-fixed');
}

export const generateTaplioXDiv = () => {
    let app = document.createElement('div');
    app.id = "taplio-extension-root";
    app.style.display = "none"
    if(window.taplioExtState.isLinkedinDarkMode) app.style.backgroundColor = "#000000";
    app = autoSizeMainRootTaplioX(app);
    const showExt = getShowTaplioX(window.location.href);
    if(window?.innerWidth <= 1200 || !showExt) app.style.display = "none";
    return app;
}

export const generateTaplioXIframe = (iframeOnLoad = (event) => {}) => {
    let toIframe = document.createElement( 'iframe' );
    toIframe = autoSizeIframeTaplioX(toIframe);
    toIframe.setAttribute("height", "100%")
    toIframe.setAttribute("id", "taplio-iframe")
    toIframe.setAttribute("class", "home")
    toIframe.setAttribute("position", "relative")
    if(window.taplioExtState.isLinkedinDarkMode) toIframe.style.backgroundColor = "#000000";
    toIframe.addEventListener("load", iframeOnLoad, false)
    // toIframe.onload = async function(event){
    //     await iframeOnLoad(event);
    // };
    return toIframe;
}

export const generateNavButtons = (onCloseButtonCB = () => {}) => {
    const extNavButtonLi = document.createElement('li');
    const extNavButtonImg = chrome.runtime.getURL('logo_48.png');
    const taplioXCloseButtonAnchor = document.createElement('a');
    extNavButtonLi.id = "li-tapliox-button-container";
    extNavButtonLi.classList.add('global-nav__primary-item');
    taplioXCloseButtonAnchor.addEventListener('click', onCloseButtonCB, false);
    taplioXCloseButtonAnchor.id = "tap-close-button-click";
    taplioXCloseButtonAnchor.classList.add('app-aware-link','global-nav__primary-link');
    taplioXCloseButtonAnchor.rel = "noopener noreferrer";
    taplioXCloseButtonAnchor.innerHTML = '<div class="ivm-image-view-model global-nav__icon-ivm"><div class="ivm-view-attr__img-wrapper ivm-view-attr__img-wrapper--use-img-tag display-flex" style="height:24px"><li-icon aria-hidden="true" type="nav-small-job-posting-icon" active="true" size="large"><img src="'+extNavButtonImg+'" width="23" height="23" class="ember-view"/> </li-icon></div></div><span class="t-12 break-words block t-black--light t-normal    global-nav__primary-link-text" title="Post a job">Taplio X</span>';

    const showExt = getShowTaplioX(window.location.href);
    if(!showExt) taplioXCloseButtonAnchor.style.display = "none";

    return {extNavButtonLi, taplioXCloseButtonAnchor};
}

export const generateCloseButtonIcon = (onCloseButtonCB = () => {}) => {
    const closeButtonDiv = document.createElement( 'div' )
    const taplioCloseButton = document.createElement( 'button' )
    const closeIconURL = chrome.runtime.getURL( 'closeicon.png' )
    const closeIconImg = document.createElement('img')
    closeIconImg.src = closeIconURL;
    taplioCloseButton.onclick = onCloseButtonCB;
    closeButtonDiv.id="taplioCloseDiv";
    taplioCloseButton.id="taplioCloseButton";
    appendTaplioXElements(closeButtonDiv, taplioCloseButton);
    appendTaplioXElements(taplioCloseButton, closeIconImg);
    return closeButtonDiv;
}

export const toggleTaplioXDisplays = (elem = null) => {
    if(!elem) return;
    
    return () => {
        if (elem.style.display === "none") {
            elem.style.display = "block";
            window.localStorage.setItem('extShouldDisplay', true);
        } else {
            elem.style.display = "none";
            window.localStorage.setItem('extShouldDisplay', false);
        }
        
    }   
}

export const appendTaplioXElements = (parent, child) => {
    if(!parent || !child) throw "Parent or child missing";
    parent?.appendChild(child);
}


export const getCookie = (iframeElem = null) => {
    chrome.storage.local.get([
      "idUser",
      "cookieLiAt"
    ], function (result) {
  
      if( result["idUser"] == "" || result["idUser"] == undefined ) result["idUser"] = false;
  
      console.log("idUser: " + result["idUser"]);
      
      let newIdUser = result["idUser"] ;
      let newCookieLiAt = result["cookieLiAt"];
  
      if ( newIdUser !== window.taplioExtState.idUser && newIdUser!="") {
      //if(newIdUser !== idUser){
        window.taplioExtState.idUser = newIdUser;
      } 
  
      if ( window.taplioExtState.idUser == undefined || window.taplioExtState.idUser == null ) {
        window.taplioExtState.idUser = false;
      }
      
      if (newCookieLiAt && newCookieLiAt !== window.taplioExtState.cookieLiAt) {
        window.taplioExtState.cookieLiAt = newCookieLiAt;
        // console.log("idInterval: " + refInterval.current);
        // clearInterval(refInterval.current);
      }
      
      window.taplioExtState.params = window.taplioExtState.cookieLiAt = "?idUser=" + window.taplioExtState.idUser + "&cookieLiAt=" + window.taplioExtState.cookieLiAt + "&_vercel_no_cache=1" + "&tstamp=" + new Date().getTime();
      

      //iframe src has to be here, if getCookie is called from anywher, the iframe will refresh because of the following line.
      const taplioWebAppFrame = (iframeElem)? iframeElem : getTaplioIframe();
      taplioWebAppFrame.src = window.taplioExtState.endpoint + window.taplioExtState.params;
      
      //console.log("App - params: " + params);
      
    });
}

export const autoSizeMainRootTaplioX = (appElem = null) => {
    if(!appElem) return;
    appElem.style.width = (getTaplioXContainerWidth() + 10) + 'px';
    appElem.style.paddingLeft = "6px";
    appElem.style.top = (isLeftSideBarPresentapX()) ? (getTaplioXContainerTop()) + 'px' : "0px";
    return appElem;
}

export const autoSizeIframeTaplioX = (iframeElem = null) => {
    if(!iframeElem) return;
    iframeElem.setAttribute( "width", getLeftSidebarWidthTapX() + 0 + "px");
    return iframeElem;
}

export const getShowTaplioX = (url = null) => {
    if(!url) return;
   
    return (window.taplioExtState.showExt = new RegExp(extLoadURLWhiteList.join("|")).test(url));
}

export const getUsernameFromMessagingPage =  (profilePageUrl = null, iframeElem, message) => {
    if(!profilePageUrl) return false;

    const openIframeForBrowsing = document.createElement('iframe');
    openIframeForBrowsing.src = profilePageUrl;
    openIframeForBrowsing.width = 0;
    openIframeForBrowsing.height = 0;
    openIframeForBrowsing.id = "openProfilePageURLGet";
    const divForIframe = document.createElement('div'); //conflict with Dux solver;
    divForIframe.appendChild(openIframeForBrowsing);
    document.querySelector('body').appendChild(divForIframe);

    openIframeForBrowsing.onload = async (e) => {
        const usernameFromURL = () => { return openIframeForBrowsing?.contentWindow?.document?.querySelector('#top-card-text-details-contact-info') };
        
        const navigateToProfilePage = (usernameFromHref) => {
            divForIframe.remove();
            // console.log(usernameFromHref.href)
            let username = usernameFromHref?.href?.split("https://www.linkedin.com/in/")?.[1]?.split("/")?.[0]?.split("?")?.[0];
        // console.log("check username from messaging page: " + username);
            if(username){
                message.message = "specific_user_will_fetch";
                message.data = { username };
                iframeElem.contentWindow.postMessage(message, "*");
            }
        }
        loadTaplioXElementsAfterUILoads(openIframeForBrowsing.contentWindow.document, usernameFromURL, navigateToProfilePage);
    }
}

 
/**
* Second @param has to be a function for 2 reasons:
* 1. Can easily change element to operate upon incase linkedin's ui changes.
* 2. the function will be called until the element it gets, loads in linkedin's dom.
* - Manoj
**/
export const loadTaplioXElementsAfterUILoads = (observerRoot, getParentElement = () => {},  callback = () => {}) => {
    if(!observerRoot) return false;
    
    const observer = new MutationObserver((mutationList, observer) => {
        const parentElement = getParentElement();
        if(parentElement) {
            callback(parentElement);
            // console.log(m.target)
            observer.disconnect();
        }
    });
    
    observer.observe(observerRoot, {subtree:true, childList: true, attributes: true});
}

export const checkLinkedInDarkMode = () => {
    window.taplioExtState.isLinkedinDarkMode = document.querySelector('html').classList.contains('theme--dark');
}