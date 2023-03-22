'use strict';
//script for keeping connection alive with background service workers

export const connectKeepAlive = async () => {
    try{
        let port = window.taplioExtState.keepAlivePort;
        port = window.taplioExtState.keepAlivePort = chrome.runtime.connect({name: "KeepAlive"});
        port.onDisconnect.addListener(connectKeepAlive);
        port.onMessage.addListener((msg) => {
            console.log(msg, 'from bg');
        });
    }catch(e){
        console.log('port closed', e);
    }
}