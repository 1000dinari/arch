'use strict';

//testing still... not sure if this works.
export const loadEvnBasedSettings = async (callback = () => {}) => {
    //console.log(cb)
    chrome.runtime.sendMessage({"message": "get_endpoint_url_for_taplio"}, (response)=>{
        callback(response);
        return true;
    });
}