'use strict';

import {
    appendTaplioXElements,
    generateTaplioXDiv,
    generateTaplioXIframe,
    generateNavButtons,
    generateCloseButtonIcon,
    getTaplioXContainerWidth,
    getMessageAndAppContainer,
    getLinkedInMessagingBox,
    getLeftSidebarWidthTapX,
    getLinkedInNavBar,
    getNavBarButtonLi,
    autoSizeMainRootTaplioX,
    autoSizeIframeTaplioX,
    getMainTaplioXRoot,
    getTaplioIframe,
    getCookie,
    toggleTaplioXDisplays,
    getShowTaplioX,
    getUsernameFromMessagingPage,
    loadTaplioXElementsAfterUILoads,
    getLeftSideBarAsAppContainer,
    checkLinkedInDarkMode
} from "./utils.js";

import {
    closeExtPanel,
    initClosePanelListener,
    fetchUserSessionCreds,
    initFetchUsersTaplioSessionListener,
    initWebAppMessageListeners,
    loadEvnBasedSettings,
    initCookieUpdaterListener,
    initSpecificUserFetchListener,
    initSpecificUserPostFetchListener,
    initUrlChangeNotProfileListener,
    initUrlCheckWhiteListListener,
    initWindowResizeListener,
    onPageReloadObserver,
    connectKeepAlive,
} from "./messages/index.js";

window.taplioExtState = {
    showExt: false,
    idUser: null,
    cookieLiAt: null,
    username: null,
    params: null,
    endpoint: null,
    isExtDev: false, //default fallback
    keepAlivePort: null,
    //uncomment the right one.
    // endpoint: "http://localhost:3001",
    // endpoint: "https://stats.taplio.com",
    endpoint: "https://ext.taplio.com",
    // endpoint: "https://stats-dev.taplio.com",
    // endpoint: "https://analytics-mske8cyes-ponyexpress.vercel.app/",
    // endpoint: "https://analytics-dum2wkc9m-ponyexpress.vercel.app/",
    extAppContainer: null,
    isLinkedinDarkMode: false,
  }; //state
  

export const initTaplioXApp = async (count = 0) => {
    loadTaplioXElementsAfterUILoads(document.querySelector('body'), getMessageAndAppContainer, ()=>{
        checkLinkedInDarkMode();
        loadTaplioXApp();
    });
}

const loadTaplioXApp = () => {
    const mainRoot = generateTaplioXDiv();
    const extIframeElem = generateTaplioXIframe(onTaplioXFrameLoad);
    initLiUITaplioX(mainRoot, extIframeElem);
    getCookie(extIframeElem);

    //init messaging
    loadEvnBasedSettings((data)=>{
        //check before checking if dev/prod to change settings if required. - manoj
        console.log("ext env:", data?.env);
    });
    initUrlCheckWhiteListListener((url)=>{showHideTaplioX(url)});
    initClosePanelListener(toggleTaplioXDisplays(getMainTaplioXRoot()));
    initWebAppMessageListeners(extIframeElem);
    initCookieUpdaterListener(()=>{getCookie(extIframeElem);});
    initSpecificUserFetchListener(extIframeElem, getUsernameFromMessagingPage);
    initSpecificUserPostFetchListener(extIframeElem);
    initUrlChangeNotProfileListener(extIframeElem);
    initWindowResizeListener(resizeOnFlyTaplioX);
    connectKeepAlive();
}

const initLiUITaplioX = (mainAppRoot = null, iframeElem = null) => {
    if(!mainAppRoot || !iframeElem) return;

    loadTapXIframeToMainRoot(iframeElem, mainAppRoot);
    loadTaplioXAppIntoContainer(false, mainAppRoot);
    //resizeMessagingBoxTaplioX();
    addNavigationTapXButtons();
}

// const unloadTaplioXApp = () => {

// }

const resizeOnFlyTaplioX = () => {
    if(window.taplioExtState.showExt) {
        const mainRoot = getMainTaplioXRoot();
        const taplioWebAppFrame = getTaplioIframe();
        autoSizeMainRootTaplioX(mainRoot);
        //resizeMessagingBoxTaplioX();
        autoSizeIframeTaplioX(taplioWebAppFrame);
        // console.log(getLeftSidebarWidthTapX(), 'w')
    }
  }
  
const resizeMessagingBoxTaplioX = () => {
    try {
        const messagingBox = getLinkedInMessagingBox();
        const messagingBoxWidth = getTaplioXContainerWidth() - getLeftSidebarWidthTapX() - 10;
        messagingBox.style.width = messagingBoxWidth + "px";
        messagingBox.setAttribute('style','flex: 0 0 ' + messagingBox.style.width);

    } catch (e) {
        // console.log('Error resizing and accomdating messaging box. Trying again...' + e);
        if(!getLinkedInMessagingBox() && getMessageAndAppContainer()) 
            setTimeout(
               async () => {
                    resizeMessagingBoxTaplioX();
                }, 3000
            );  
    }
}
  
const loadTaplioXAppIntoContainer = (fallback = false, extContainer = null) => {
    if (!extContainer) return;
    console.log('call loading app into container')
    
    try {
      const messageAndAppContainer = window.taplioExtState.extAppContainer = getMessageAndAppContainer();
      appendTaplioXElements(messageAndAppContainer, extContainer);
      
      loadTaplioXElementsAfterUILoads(messageAndAppContainer, getLeftSideBarAsAppContainer, ()=>{
        
        if (window.taplioExtState.showExt) {
            if(window.localStorage.getItem('extShouldDisplay')!=="false") extContainer.style.display = "block";
            resizeOnFlyTaplioX();
          }
      });
      
    } catch (e) {
        console.log("Error Mouting App to Message Container...trying again...");
    }
}

const addNavigationTapXButtons = () => {
    try {
        loadTaplioXElementsAfterUILoads(document.body, getLinkedInNavBar, (linkedInNavBar) => {
            const appRoot = getMainTaplioXRoot();
            // const linkedInNavBar = getLinkedInNavBar();
            
            const {extNavButtonLi, taplioXCloseButtonAnchor} = generateNavButtons(
                () => {
                    fetchUserSessionCreds(
                        true,
                        getTaplioIframe(),
                        toggleTaplioXDisplays(getMainTaplioXRoot())
                    )
                } 
            );
            const closeButtonDiv = generateCloseButtonIcon(closeExtPanel);
    
            appendTaplioXElements(appRoot, closeButtonDiv);
            appendTaplioXElements(extNavButtonLi, taplioXCloseButtonAnchor);
            appendTaplioXElements(linkedInNavBar, extNavButtonLi);
        });
        
        
    } catch (e) {
        console.log('Error with adding buttons (Nav bar and close arrow) or logged out', e);
    }
}

const onTaplioXFrameLoad = (event) => {
    
    try{
        
        const iframeElem = event?.target;
        fetchUserSessionCreds(
            false,
            iframeElem
        );
        onPageReloadObserver(iframeElem);
        initFetchUsersTaplioSessionListener(iframeElem);
    } catch(e) {
        console.log('Error attaching on load cb to frame: ' + e);
    }
}

const loadTapXIframeToMainRoot = (frameElem = null, appRoot = null) => {
    
    try {
        if(!frameElem || !appRoot) throw "Error in attaching taplio x frame";
        // const appRoot = getMainTaplioXRoot();
        appendTaplioXElements(appRoot, frameElem);
    } catch(e)
    {
        console.log('Error in attaching the web app frame: ' + e);
    }

}

export const showHideTaplioX = (url = null) => {
    if(!url) return;

    const showExt = window.taplioExtState.showExt = getShowTaplioX(url);
    
    let mainRoot =  getMainTaplioXRoot();
    let taplioWebAppFrame = getTaplioIframe();
    const liNavButton =  getNavBarButtonLi();
    const mainRootContainer = getMessageAndAppContainer();
    
    try {
        if(showExt && mainRootContainer != null && mainRootContainer != window.taplioExtState.extAppContainer && liNavButton) {
            //console.log('remove mainRoot, add mainRoot to mainRootContainer, resize mainroot and messaging box');
            initLiUITaplioX(mainRoot, taplioWebAppFrame);
        }
        
        if(showExt && mainRootContainer != null && mainRootContainer == window.taplioExtState.extAppContainer && liNavButton) {
            mainRoot = autoSizeMainRootTaplioX(mainRoot);
            taplioWebAppFrame = autoSizeIframeTaplioX(taplioWebAppFrame);
            if (window.localStorage.getItem('extShouldDisplay')!=="false") mainRoot.style.display = "block";
            liNavButton.style.display = "flex";
           
        }

        if(showExt && mainRootContainer == null && window.taplioExtState.extAppContainer == document.body && liNavButton) {
            if (window.localStorage.getItem('extShouldDisplay')!=="false") mainRoot.style.display = "block";
            liNavButton.style.display = "flex";
        }

        if(!showExt) {
            mainRoot.style.display = "none";
            liNavButton.style.display = "none";
        }

    } catch(e) {
        console.log('error in whitelisting or navbar issue: ' + e);
    }
}