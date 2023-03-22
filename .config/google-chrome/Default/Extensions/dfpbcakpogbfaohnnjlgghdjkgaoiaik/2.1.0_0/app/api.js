import {

    fetchPosts,
    fetchPostsMultiple,
    fetchRandomProfiles,
    fetchFullProfile,
    fetchProfile,
    fetchPostComments,
    fetchPostLikers,
    fetchCompanies,

} from "./fetchers.js";

let callApiFunctions = async ( callName, payload ) => {

    let apiFunctionLiterals = {

        'fetchPosts': async function(){return await fetchPosts( payload?.count || 10, payload?.conf )},

        'fetchPostsMultiple': async function(){return await fetchPostsMultiple( payload?.count || 100, payload?.maxIterations, payload?.conf, true )},
        
        'fetchCompanies': async function(){return await fetchCompanies( payload?.conf )},

        'fetchFullProfile': async function(){return await fetchFullProfile( payload?.url, payload?.conf )},

        'fetchRandomProfiles': async function(){return await fetchRandomProfiles( payload?.profiles, payload?.conf, payload?.count || 1, true )}, //this one needs testing...

        'fetchProfile': async function(){return await fetchProfile( payload?.conf, true )},

        'fetchPostComments': async function(){return await fetchPostComments( payload?.post, payload?.conf )}, //needs testing...

        'fetchPostLikers': async function(){return await fetchPostLikers( payload?.post, payload?.conf )}, //needs testing...,

        'default': ()=>{},
    }

    return apiFunctionLiterals[ callName ]()
}


export function callAPI( conf ){

    chrome.runtime.onMessage.addListener( async ( req , sender, sendResponse ) => {
    
    if( req.message == "taplio_app_api_call" ){

        const mode = req.payload?.mode || "func"
        const apiURL = req.payload?.callUrl || undefined
        const funcCallName = req.payload?.callName || "default"
        const returnMessage = req.payload?.returnMessage || "linkedin_api_reply"
        const funcArgs = req.payload?.args || {}

        if( mode == "func" ){

            conf.username = conf.username || funcArgs.username || false;
            
            if(funcArgs?.dashEntityUrn) conf.dashEntityUrn = (funcArgs?.dashEntityUrnType=="company")? "urn:li:fsd_company:" : "urn:li:fsd_profile:" + funcArgs.dashEntityUrn;

            const payload = {

                "count": funcArgs.count,
                "conf": conf || {},
                "maxIterations": funcArgs.maxIterations || 3,
                "profiles": funcArgs.profiles || [],
                "url": funcArgs.url,
                "post": funcArgs.post || {}
            }

            sendResponse( await callApiFunctions( funcCallName, payload ) )

        }

        if( mode == "url" ){

            chrome.storage.local.get( ['csrfToken'], async function( result ) {

              if( result.csrfToken ){

                const res = await callApiURL( apiURL, result.csrfToken )
                const replyData = await res.json() || {}
                sendResponse( replyData )

              }

            });

        }
    }

    return true;

 })

}

const callApiURL = async ( apiURL, csrf ) => {

    //init url if not provided
    if(!apiURL) apiURL = null;

    const returnData = await fetch(
        apiURL,
        {
            headers:{
                "content-type":"application/vnd.linkedin.normalized+json+2.1; charset=UTF-8",
                "csrf-token":csrf
            },
            redirect: 'follow',

        });

        return await returnData
}
