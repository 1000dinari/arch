'use strict'

export const onPageReloadObserver = async (iframeElem = null) => {
    if(!iframeElem) return;

    const observer = new PerformanceObserver((list) => {
      
        list.getEntries().forEach((entry) => {
          if (entry.type === "reload" && entry.domComplete) {
            setTimeout(
              () => {
                const message = {
                    message: "parent_page_reload"
                }
                //console.log('treating it as a reload...')
                iframeElem.contentWindow.postMessage(message, "*");
            },3000);
          }
        });
      });
      
    observer.observe({ type: "navigation", buffered: true });
}

// const navigateToProfilePage = (entryname, iframeElem) => {
//   if(!entryname) return;

//   const username = entryname.split("https://www.linkedin.com/in/")?.[1]?.split("/")?.[0].split("?")?.[0];
//   console.log(username);
//   //have to use setTimeout. Nothing else works for posting a message before the webapp fully loads. One solution is transfer over the check for url over to the webapp.- manoj
//   setTimeout(
//     () => {
//       let message = {
//         message: "specific_user_will_fetch",
//         data: {
//           username
//         }
//       };
//       //console.log("is a profile page on load/refresh with username:", username);
//       window.taplioExtState.username =  username;
//       iframeElem.contentWindow.postMessage(message, "*");
//     }, 3000
//   );
// }