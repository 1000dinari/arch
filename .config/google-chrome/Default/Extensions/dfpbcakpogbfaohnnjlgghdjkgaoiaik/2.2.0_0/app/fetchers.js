import {
    getRandomInList,
    sendUpdateMessageToTabs, //not used. should be removed? - manoj
    sleep,
} from "./utils.js";
import * as analytics from "./analytics.js";

let nbRandomPostFetched = 0;
let dateLastRandomPostFetched = 0;

export const fetchPostsMultiple = async (count = 10, maxIterations = 3, conf, returnValue = false) => {

    let iterations = 0;
    let totalPosts = [];
    let posts = [];
    let paginationToken = "";
    let forceEnd = false;

    while (iterations < maxIterations && !forceEnd && (!iterations || posts.length == count)) {

        let newConf = {...conf};
        if (totalPosts?.length > 0 )
            newConf.startCount = Math.floor(totalPosts?.length / count) * count;
        if (paginationToken) 
            newConf.paginationToken = paginationToken;

        let {posts: newPosts, paginationToken: newPaginationToken} = await fetchPosts(10, newConf);
        
        posts = newPosts;
        totalPosts = totalPosts.concat(newPosts);
        paginationToken = newPaginationToken;

        if (!posts?.length || !newPaginationToken)
            forceEnd = true;

        iterations++;
    }

    if( returnValue ){
        return { iterations, totalPosts, posts, paginationToken, forceEnd }
    }
}

export const fetchPostsMetaData = async (url, conf) => {

    let postsMetadata = [];

    try {
        console.log("fetchPostsMetaData will fetch " + url);
        let output = await fetchLinkedin(url, {...conf, isPlainText: true});
        // console.log("fetchFullProfile output");
    
        let matches = output.match(/<code [^>]*>(.+?)<\/code>/gms);
        // console.log("matches", matches);
        // console.log("matches.length: " + matches.length);
    
        let json = matches.find(x => x.includes("com.linkedin.voyager.feed.Metadata")).replace(/<.*?>/gms, "");
        json = JSON.parse(decodeHTMLEntities(json));
        // console.log("json", json);
    
        postsMetadata = json.included;
    }
    catch (e) {
        console.log("error in fetchPostsMetaData", e);
    }

    return postsMetadata;
}

export const fetchPosts = async (count = 10, conf) => {

    console.log("fetchPosts", conf);

    try {

        let { dashEntityUrn } = conf;
    
        if (dashEntityUrn) {

            let postsMetadata = await fetchPostsMetaData(`https://www.linkedin.com/in/${conf.username}/recent-activity/shares/`, conf);
            console.log('postsMetadata:', postsMetadata)
    
            // count=30;
            // let url = `https://www.linkedin.com/voyager/api/identity/profileUpdatesV2?count=10&includeLongTermHistory=true&moduleKey=member-shares%3Aphone&paginationToken=dXJuOmxpOmFjdGl2aXR5OjY4ODg4NjE4ODU3NTY3MTA5MTItMTY0MjQzMjY2MjQxNA%3D%3D&profileUrn=urn%3Ali%3Afsd_profile%3AACoAAAOWphUBEsopiF6PqmyGhnSlowJcxNx51bM&q=memberShareFeed&start=10`;
            // let url = `https://www.linkedin.com/voyager/api/identity/profileUpdatesV2?count=10&includeLongTermHistory=true&moduleKey=member-shares%3Aphone&numComments=0&numLikes=0&profileUrn=urn%3Ali%3Afsd_profile%3AACoAAApntgMBmzah6ZWd_Tkh6AIbGFJngk1y0A8&q=memberShareFeed
            // warning, count=10 by default - is it dangerious to have 100? 
            let url = `https://www.linkedin.com/voyager/api/identity/profileUpdatesV2?count=${count}&includeLongTermHistory=true&moduleKey=member-shares%3Aphone&numComments=0&numLikes=0&profileUrn=${encodeURIComponent(dashEntityUrn)}&q=memberShareFeed`;
            
            if (conf.startCount)
                url += "&start=" + conf.startCount;
            if (conf.paginationToken)
                url += "&paginationToken=" + conf.paginationToken;

            let output = await fetchLinkedin(url, conf);
            //console.log("nb posts fetched: " + output?.elements?.length);

            console.log("fetchPosts output", output);
            // console.log(output.elements[0]);
    
            if (output) {
                let posts = [];
                let paginationToken = output?.metadata?.paginationToken;
                //console.log(output,"pagination token error?")
                // output.elements.forEach((post, index) => {
                // await async.mapLimit(output.elements, 1, async (post) => {
                //console.log("debugging output elements", output.elements)
                for await (const post of output.elements) {
                    try {
                        // console.log(post);
                        let postFormated = { user: {} };
                        postFormated.id = post.updateMetadata.urn;
                        postFormated.id_str = post.updateMetadata.urn;
                        postFormated.idUgcPost = post.socialDetail?.urn;
                        postFormated.idShare = post.updateMetadata?.shareUrn;

                        if (post?.actor?.name?.attributes[0]?.miniProfile?.objectUrn) postFormated.user.id = post?.actor?.image?.attributes[0]?.miniProfile?.objectUrn;
                        if (post?.actor?.name?.attributes[0]?.miniProfile?.dashEntityUrn) postFormated.user.dashEntityUrn = post?.actor?.image?.attributes[0]?.miniProfile?.dashEntityUrn;

                        // store dashCompanyUrn in dashEntityUrn for company profiles, and post that shared from a company profile
                        if (post?.actor?.name?.attributes[0]?.miniCompany?.dashCompanyUrn && !postFormated?.user?.dashEntityUrn) {
                            postFormated.user.dashEntityUrn = post?.actor?.image?.attributes[0]?.miniCompany?.dashCompanyUrn;
                            postFormated.user.dashEntityUrnType = "company";
                        }

                        if (!postFormated?.user?.id)  // can be at another position in the json
                            postFormated.user.id = post?.actor?.urn;
        
                        if (postFormated?.user?.id) {
                            let splits = postFormated.user.id.split(":");
                            postFormated.user.idShort = splits[splits.length - 1];
                        }
                        if (postFormated?.id) {
                            let splits = postFormated.id.split(":");
                            postFormated.idShort = splits[splits.length - 1];
                        }
                       
                        // quick correction for profiles with miniProfileWithRingStatus
                        
                        if ( post?.actor?.image?.attributes?.[0] && post?.actor?.image?.attributes?.[0]?.miniProfile == undefined && post?.actor?.image?.attributes?.[0]?.miniProfileWithRingStatus != undefined ) {
                            post.actor.image.attributes[0].miniProfile = post.actor.image.attributes[0].miniProfileWithRingStatus.miniProfile;
                        }
                        // check if miniProfile (created above or otherwise) actually exists and is at attributes[0] then proceed with assigning firstName, lastName and username
                        
                        if (!postFormated.user.dashEntityUrn && post?.actor?.image?.attributes?.[0]?.miniProfile?.dashEntityUrn)
                            postFormated.user.dashEntityUrn = post?.actor?.image?.attributes[0]?.miniProfile?.dashEntityUrn;

                        if (post?.actor?.image?.attributes[0] && post?.actor?.image?.attributes[0]?.sourceType!='GROUP_LOGO' && post?.actor?.name?.attributes[0].miniProfile!=undefined){
                            if (post?.actor?.name?.attributes[0]?.miniProfile?.firstName) postFormated.user.firstName = post?.actor?.image?.attributes[0]?.miniProfile?.firstName;
                            if (post?.actor?.name?.attributes[0]?.miniProfile?.lastName) postFormated.user.lastName = post?.actor?.image?.attributes[0]?.miniProfile?.lastName;
                            if (post?.actor?.name?.attributes[0]?.miniProfile?.publicIdentifier) postFormated.user.username = post?.actor?.image?.attributes[0]?.miniProfile?.publicIdentifier;
                            if (post?.actor?.name?.attributes[0]?.miniProfile?.publicIdentifier) postFormated.user.twUserName = post?.actor?.image?.attributes[0]?.miniProfile?.publicIdentifier;
                            if (post?.actor?.name?.attributes[0]?.miniProfile?.standardizedPronoun) postFormated.user.pronoun = post?.actor?.image?.attributes[0]?.miniProfile?.standardizedPronoun;
                            if (post?.actor?.name?.attributes[0]?.miniProfile?.occupation) postFormated.user.occupation = post?.actor?.image?.attributes[0]?.miniProfile?.occupation;
                            if (post?.actor?.image?.attributes[0]?.miniProfile?.picture && post?.actor?.image?.attributes[0]?.miniProfile?.picture["com.linkedin.common.VectorImage"]?.rootUrl) postFormated.user.image = post.actor.image.attributes[0].miniProfile.picture["com.linkedin.common.VectorImage"].rootUrl + post.actor.image.attributes[0].miniProfile.picture["com.linkedin.common.VectorImage"].artifacts.find(x => x.width == 800).fileIdentifyingUrlPathSegment
                        }
                        
                        
                        
                        if (post?.actor?.description?.text) postFormated.user.about = post.actor.description.text;
        
                        postFormated.text = post?.commentary?.text?.text ?? "";
                        if (post?.updateMetadata?.actions?.find(x => x.actionType == "SHARE_VIA")?.url) postFormated.url = post.updateMetadata.actions.find(x => x.actionType == "SHARE_VIA").url;
                        if (post?.actor?.subDescription?.text) postFormated.postDate = post?.actor?.subDescription?.text.split(" ")[0];
        
                        postFormated.numReactionsLike = post?.socialDetail?.totalSocialActivityCounts?.reactionTypeCounts?.find(x => x.reactionType == "LIKE")?.count ?? 0;
                        postFormated.numReactionsPraise = post?.socialDetail?.totalSocialActivityCounts?.reactionTypeCounts?.find(x => x.reactionType == "PRAISE")?.count ?? 0;
                        postFormated.numReactionsMaybe = post?.socialDetail?.totalSocialActivityCounts?.reactionTypeCounts?.find(x => x.reactionType == "MAYBE")?.count ?? 0;
                        postFormated.numReactionsEmpathy = post?.socialDetail?.totalSocialActivityCounts?.reactionTypeCounts?.find(x => x.reactionType == "EMPATHY")?.count ?? 0;
                        postFormated.numReactionsInterest = post?.socialDetail?.totalSocialActivityCounts?.reactionTypeCounts?.find(x => x.reactionType == "INTEREST")?.count ?? 0;
                        postFormated.numReactionsAppreciation = post?.socialDetail?.totalSocialActivityCounts?.reactionTypeCounts?.find(x => x.reactionType == "APPRECIATION")?.count ?? 0;
                        // if (post?.socialDetail?.totalSocialActivityCounts?.reactionTypeCounts) console.log(post?.socialDetail?.totalSocialActivityCounts?.reactionTypeCounts);
                        postFormated.numLikes = post?.socialDetail?.likes?.paging?.total ?? post?.socialDetail?.totalSocialActivityCounts.numLikes ?? 0;
                        //fix for impressions/views in case of video, etc content in posts. numImpressions is numViews for all posts that are not video based. numImpressions = numViews for all posts, except posts like video posts where views are video views.

                        if (post?.socialDetail?.totalSocialActivityCounts.numImpressions !== undefined)
                            postFormated.numViews = post?.socialDetail?.totalSocialActivityCounts.numImpressions ?? 0;

                        postFormated.totalShares = post?.socialDetail?.totalShares ?? 0;
                        postFormated.numComments = post?.socialDetail?.totalSocialActivityCounts?.numComments ?? 0;
                        postFormated.totalEngagement = postFormated.numLikes + postFormated.totalShares + postFormated.numComments;

                        // console.log("looking for metadata for post: " + postFormated.idShort)
                        if (postFormated.idShort) {
                            let matchMetadata = postsMetadata.find(x => 
                                (x.threadId === "activity:" + postFormated.idShort || x.threadId === postFormated.idUgcPost?.replace("urn:li:", ""))
                                && x["$type"] == "com.linkedin.voyager.feed.SocialDetail");
                            
                            // console.log("found matchMetadata for post " + postFormated.id + " - " + postFormated.idUgcPost?.replace("urn:li:", "") + " : ", matchMetadata);

                            if (matchMetadata) {
                                postFormated.totalShares = matchMetadata.totalShares;
                            }
                            else {
                                // console.log("metadata not found");
                            }
                        }
        
                        postFormated.zFull = post;
        
                        // console.log(postFormated);
                        posts.push(postFormated);
                    }
                    catch (e) {
                        console.error("Error in fetching post", e);
                    }
                }

                // id: 6981515485792153600 // 5d ago
                // id: 6982674174192357376 // 2d ago

                // from most recent to oldest
                posts = posts.sort((a, b) => parseInt(b.idShort) - parseInt(a.idShort));
                // console.log("posts order", posts.map(x => x.idShort));

                // let postsToFetchData = [];
                // posts.forEach(postFormated => {
                //     let match = conf.savedData.posts.find(x => x.id == postFormated.id);
                //     if (!conf.disableFetchInteraction
                //         && postsToFetchData.length < 2
                //         && !postFormated.postDate.includes("now")
                //         && ((!postFormated.postDate.includes("h") && !match) || (!postFormated.postDate.includes("h") && !postFormated.postDate.includes("d") && (!match || match?.nbFetch < 2)))
                //     ) {
                //         postsToFetchData.push(postFormated);

                //         if (!match) {
                //             match = {id: postFormated.id, lastUpdate: new Date(), nbFetch: 1};
                //             conf.savedData.posts.push(match);
                //         }
                //         else 
                //             match.nbFetch++;

                //         if (!postFormated.postDate.includes("h") && !postFormated.postDate.includes("d"))
                //             match.nbFetch = 2;
                //     }
                // })

                // console.log("posts to fetch comments and likes", postsToFetchData.map(x => x.idShort));

                // fetch likers & commenters 
                // for await (const postFormated of postsToFetchData) {
                //     try {
                //         let likers = await fetchPostLikersMultiple(postFormated, conf);
                //         let commenters = await fetchPostCommentsMultiple(postFormated, conf);
                //     }
                //     catch (e) {
                //         console.error("Error in fetching likers or commenters", e);
                //     }
                // }

                console.log("saving " + posts?.length + " posts from " + conf.username);
                sendData("post", { posts, forceSave: !!conf.forceSave }, conf);
                // console.log("saving savedData: " + JSON.stringify(conf.savedData));
                chrome.storage.local.set({ "savedData": JSON.stringify(conf.savedData) });

                // await sendData("post", { posts: posts }, conf);

                return {posts, paginationToken};
            }
        }
        else {
            console.error("no dashEntityUrn set");
        }
    }
    catch (e) {
        console.log("Error in fetchPosts", e);
    }

    return {posts: [], paginationToken: null};
}

export const fetchRandomProfiles = async (profiles, conf, count=1, returnValue = false) => {

    let list = getRandomInList(profiles, count);
    // console.log({list});
    // console.log({profiles});
    let multipleAccounts = [];
    for await (const commenter of list) {
        try {
            let url = "https://www.linkedin.com/in/" + commenter.username;
            (returnValue)? multipleAccounts.push(await fetchFullProfile(url, conf)) : await fetchFullProfile(url, conf);
        }
        catch (e) {
            console.log("Error in fetching commenter", e);
        }
    }

    if( returnValue ){
        return { multipleAccounts }
    }
}

export const fetchMe = async (conf, countPost=100) => {

    console.log("fetchMe");
    let { dashEntityUrn, cookie_JSESSIONID, cookie_li_at, userAgent } = conf;

    if (cookie_JSESSIONID && cookie_li_at) {

        if (!conf.dashEntityUrn
            || !conf.idUser
            || !conf.username
        ) {
            let url = 'https://www.linkedin.com/voyager/api/me';
            let output = await fetchLinkedin(url, conf);
            console.log("fetch me successfuly");
            // console.log(output);
    
            let dataToSave = {};
    
            let dashEntityUrn = output?.miniProfile?.dashEntityUrn;
            let idUser = output?.miniProfile?.objectUrn;
            let username = output?.miniProfile?.publicIdentifier;
            let idUserShort = "";
    
            if (typeof chrome !== "undefined")
                chrome.storage.local.set({ "idUser": idUser, "dashEntityUrn": dashEntityUrn, "username": username });
    
            if (idUser) {
                let splits = idUser.split(":");
                idUserShort = splits[splits.length - 1];
            }
    
            dataToSave.hasExtension = true;

            if (idUser) dataToSave.id = idUser;
            if (idUserShort) dataToSave.idUserShort = idUserShort;
            if (dashEntityUrn) dataToSave.dashEntityUrn = dashEntityUrn;
            if (output?.miniProfile?.firstName) dataToSave.firstName = output?.miniProfile?.firstName || "";
            if (output?.miniProfile?.lastName) dataToSave.lastName = output?.miniProfile?.lastName;
            if (output?.miniProfile?.publicIdentifier) dataToSave.username = output?.miniProfile?.publicIdentifier;
            if (output?.miniProfile?.publicIdentifier) dataToSave.twUserName = output?.miniProfile?.publicIdentifier;
            if (output?.miniProfile?.standardizedPronoun) dataToSave.pronoun = output?.miniProfile?.standardizedPronoun;
            if (output?.miniProfile?.occupation) dataToSave.occupation = output?.miniProfile?.occupation;
            if (output?.miniProfile?.picture && output?.miniProfile?.picture["com.linkedin.common.VectorImage"]?.rootUrl) dataToSave.image = output?.miniProfile.picture["com.linkedin.common.VectorImage"].rootUrl + output?.miniProfile.picture["com.linkedin.common.VectorImage"].artifacts.find(x => x.width == 800).fileIdentifyingUrlPathSegment;
    
            conf.dashEntityUrn = dashEntityUrn;
            conf.idUser = idUser;
            conf.username = username;
            conf.idUserShort = idUserShort;

            //    console.log(dataToSave);
            sendData("profile", dataToSave, conf);
        }

        if (conf.idUser && conf.username) {
            sendData("cookie", {
                idUserShort: conf.idUserShort,
                dashEntityUrn: conf.dashEntityUrn,
                idUser: conf.idUser,
                username: conf.username,
                cookie_JSESSIONID: cookie_JSESSIONID,
                cookie_li_at: cookie_li_at,
                userAgent: userAgent,
            }, conf);
        }
        else {
            console.log("error with data, no idUser or username");
        }

        if (conf.companies === undefined) {
            let companies = await fetchCompanies(conf);
            if (companies?.length) {
                sendData("companies", {dashEntityUrn: conf.dashEntityUrn, idUser: conf.idUser, companies}, conf);
                if (typeof chrome !== "undefined")
                    chrome.storage.local.set({ "companies": JSON.stringify(companies) });
            }
            else {
                chrome.storage.local.set({ "companies": JSON.stringify([]) });
            }
        }

        fetchProfile(conf);
        fetchPosts(countPost, {...conf, forceSave: true});

        return conf;
    }
}

export const fetchCompanies = async (conf) => {

    let companies = [];

    try {
        let url = 'https://www.linkedin.com/voyager/api/voyagerOrganizationDashCompanies?decorationId=com.linkedin.voyager.dash.deco.organization.AdminWidget-13&count=100&q=viewerPermissions&viewerPermissions=(canCreateOrganicShare:true)';
        let output = await fetchLinkedin(url, {...conf, useRestli: true});
        // console.log('fetchCompanies - output:', output)
    
        let companiesRaw = output?.elements?.filter(x => x.universalName && x.entityUrn);
        companiesRaw.forEach(c => {
            try {
                let company = {};
    
                company.name = c.universalName;
                company.entityUrn = c.entityUrn;
                company.id = c.entityUrn;
                company.idShort = c.entityUrn;
                let splits = c.entityUrn.split(":");
                company.idShort = splits[splits.length - 1];
                company.image = c.logo?.vectorImage?.rootUrl;
                company.image += c.logo?.vectorImage?.artifacts?.find(x => x.width == 400)?.fileIdentifyingUrlPathSegment;
    
                companies.push(company);
            }
            catch (e) {
                console.log("failed to fetch companies", e);
            }
        });
    }
    catch(e) {
        console.log("failed to fetch companies", e);
    }

    return companies;
}

export const fetchFullProfile = async (url, creds) => {

    console.log("getAccount will fetch " + url);
    let output = await fetchLinkedin(url, {...creds, isPlainText: true});
    // console.log("fetchFullProfile output");

    let matches = output.match(/<code [^>]*>(.+?)<\/code>/gms);
    // console.log(matches);
    // console.log(matches.length);
    let json = matches.find(x => x.includes("profilePicture")).replace(/<.*?>/gms, "");
    json = JSON.parse(decodeHTMLEntities(json));
    // console.log({json});

    let profile = json.included.find(x => x?.objectUrn?.includes("urn:li:member"));

    // console.log(JSON.stringify(json));
    // console.log(JSON.stringify(profile));
    let account = {};

    account.id = profile?.objectUrn;
    if (account.id) {
        let splits = account.id.split(":");
        account.idUserShort = splits[splits.length - 1];
    }

    account.from = "directFetch";
    account.dashEntityUrn = profile?.entityUrn;
    account.lastName = profile?.lastName;
    account.firstName = profile?.firstName || ""; // throws TypeError if firstname is not provided. Found because https://www.linkedin.com/in/gxjansen/ was throwing this error.
    account.pronoun = profile?.pronounUnion?.standardizedPronoun;
    account.influencer = profile?.influencer;
    account.occupation = profile?.headline;
    account.username = profile?.publicIdentifier;
    account.profileUrl = "https://www.linkedin.com/in/" + profile?.publicIdentifier;
    
    account.zfullPage = profile;

    if (profile?.profilePicture?.displayImageReference?.vectorImage?.rootUrl) 
        account.image = profile?.profilePicture?.displayImageReference?.vectorImage?.rootUrl + profile?.profilePicture?.displayImageReference?.vectorImage?.artifacts[3]?.fileIdentifyingUrlPathSegment;

    // console.log({account});
    let url2 = `https://www.linkedin.com/voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=${account.username}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.TopCardSupplementary-86`;
    let output2 = await fetchLinkedin(url2, creds);
    // console.log(output2);

    // let followingState = output2.included.find(x => x?.entityUrn == "urn:li:fsd_followingState:" + account.dashEntityUrn);
    // console.log(followingState);

    if (output2?.elements?.length > 0) {

        account.followerCount = output2?.elements[0]?.followingState?.followerCount;
        account.connectionCount = output2?.elements[0]?.connections?.paging?.total;
        account.about = output2?.elements[0]?.associatedHashtagsCopy?.text;
        account.zfullMemberIdentity = output2?.elements[0];
    }

    // console.log({account});
    await sendData("profile", account, creds);

    return account;
}

export const fetchProfile = async ( conf , returnValue = false ) => {

    console.log("fetchProfile", conf);

    try {
        let { username } = conf;
    
        if (username) {
    
            let url = `https://www.linkedin.com/voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=${username}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.TopCardSupplementary-85`;
            // let url = `https://www.linkedin.com/voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=stanislasnioxchateau&decorationId=com.linkedin.voyager.dash.deco.identity.profile.TopCardSupplementary-85`;
            let output = await fetchLinkedin(url, conf);
            console.log("fetchProfile");
            // console.log(JSON.stringify(output));
            // console.log(output);
    
            let dataToSave = {};
            if (output?.elements?.length) {
                if (output?.elements[0]?.followingState?.followerCount) dataToSave.followerCount = output?.elements[0]?.followingState?.followerCount;
                if (output?.elements[0]?.connections?.paging?.total) dataToSave.connectionCount = output?.elements[0]?.connections?.paging?.total;
                if (output?.elements[0]?.associatedHashtagsCopy?.text) dataToSave.about = output?.elements[0]?.associatedHashtagsCopy?.text;
            }
            
            if (!conf.nbFetchProfileViews || conf.nbFetchProfileViews % 2 === 0) {
                const viewCounts = await fetchProfileViews();
                dataToSave.viewCounts = viewCounts;
            }
            chrome.storage.local.set({ "nbFetchProfileViews": (conf.nbFetchProfileViews ? conf.nbFetchProfileViews + 1 : 1) });

            // console.log(dataToSave);

            await sendData("profile", dataToSave, conf);
            if(returnValue) return { dataToSave };
        }
    }
    catch (e) {
        console.log("Error in fetching fetchProfile", e);
    }
}

export const fetchProfileViews = async () => {
        
    try {
        const result = await chrome.storage.local.get(['csrfToken']);
    
        if (result.csrfToken && typeof result.csrfToken === 'string') {
            
            const returnData = await fetch('https://www.linkedin.com/voyager/api/identity/wvmpCards', {
                headers: {
                    "content-type":"application/vnd.linkedin.normalized+json+2.1; charset=UTF-8",
                    "csrf-token": result.csrfToken
                },
                redirect: 'follow',
            });
    
            const data = await returnData.json();
            const profileViews = {
                views: data?.elements?.[0]?.value?.["com.linkedin.voyager.identity.me.wvmpOverview.WvmpViewersCard"]?.insightCards?.[0]?.value?.["com.linkedin.voyager.identity.me.wvmpOverview.WvmpSummaryInsightCard"]?.numViews || 0,
                viewsFetchedAt: new Date()
            };
            
            return  await profileViews;
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.log("Error in fetchProfileViews", e);
    }
}

export const fetchPostCommentsMultiple = async (post, conf, max=100) => {

    let iterations = 0;
    let iterationsMax = Math.ceil(max / 10);

    console.log('fetchPostCommentsMultiple with iterationsMax:' + iterationsMax);
    
    let data = await fetchPostComments(post, conf);

    console.log("lastFetch length: " + data.commenters?.length + " - iterations: " + iterations);

    let commenters = data.commenters ?? [];

    while (iterations < iterationsMax && data.commenters?.length === 10) {

        iterations++;
        console.log("lastFetch length: " + data.commenters.length + " - iterations: " + iterations);

        // wait a random time betweet 1 and 3 seconds
        await sleep(1000 + (Math.floor(Math.random() * 2000)));
        
        data = await fetchPostComments(post, conf, iterations * 10, data.paginationToken);

        if (data?.commenters?.length)
            commenters = commenters.concat(data.commenters);
    }

    return commenters;
}

export const fetchPostComments = async (post, conf, start=0, paginationToken="") => {

    // https://www.linkedin.com/voyager/api/feed/comments?count=2&q=comments&sortOrder=RELEVANCE&start=0&updateId=activity%3A6982674174192357376
    let url = "https://www.linkedin.com/voyager/api/feed/comments?"
    url += "&q=comments"
    url += "&sortOrder=RELEVANCE";
    url += "&start=" + start;
    url += "&count=10";
    url += "&updateId=" + encodeURIComponent("activity:" + post.idShort);

    if (paginationToken) 
        url += "&paginationToken=" + encodeURIComponent(paginationToken);

    let output = await fetchLinkedin(url, conf);

    // console.log("fetchPostLikers");
    // console.log({output});
    // console.log(output.elements[0]);
    // console.log(output.elements[0].commenter);
    // console.log(output.elements[0].commenter['com.linkedin.voyager.feed.MemberActor']?.miniProfile?.picture);
    let commenters = [];

    if (output?.elements) {

        // let comments = output?.elements.filter(x => !!x.lastName);
        // console.log("nb comments fetched: " + comments.length);

        output?.elements.forEach(comment => {

            let profile = comment?.commenter['com.linkedin.voyager.feed.MemberActor'];
    
            let newCo = {};
            newCo.from = "comment";
            newCo.urn = comment?.socialDetail?.urn;
            newCo.threadId = comment?.socialDetail?.threadId;
            newCo.profileEntityUrn = profile?.urn;
            newCo.id = profile?.urn;
            newCo.numLikes = comment?.socialDetail?.totalSocialActivityCounts?.numLikes;
            newCo.comment = comment?.commentV2?.text;
            newCo.created_at = comment?.createdTime;
            newCo.url = comment?.permalink;

            newCo.firstName = profile?.miniProfile?.firstName || "";
            newCo.lastName = profile?.miniProfile?.lastName;
            newCo.profileFullName = newCo.firstName + " " + newCo.lastName;

            newCo.dashEntityUrn = profile?.miniProfile?.dashEntityUrn;
            newCo.profileDashEntityUrn = profile?.miniProfile?.dashEntityUrn;
            newCo.occupation = profile?.miniProfile?.occupation;

            newCo.following = profile?.followingInfo?.following;
            newCo.distance = profile?.distance?.value;

            newCo.username = profile?.miniProfile?.publicIdentifier;
            newCo.profileUrl = "https://www.linkedin.com/in/" + profile?.miniProfile?.publicIdentifier;

            if (profile?.miniProfile?.picture?.artifacts?.length) {
                let src = profile?.miniProfile?.picture?.rootUrl;
                src += profile?.miniProfile?.picture?.artifacts[3]?.fileIdentifyingUrlPathSegment;
                newCo.profileImage = src;
            }

            // console.log({reaction});
            commenters.push(newCo);
        });

        // fetch post from a commentor randomly
        if (conf.idUser != "urn:li:member:174568963"  // avoid doing it too much with my account during testing
            && commenters.length > 0 
            && (nbRandomPostFetched < 1
            || ((dateLastRandomPostFetched - new Date()) > (1000 * 60 * 60 * 12)))
        ) {
            nbRandomPostFetched++;
            dateLastRandomPostFetched = new Date();
            console.log("get post from a commentor randomly");
            // console.log(commenters);
            let pickComment = getRandomInList(commenters, 1)[0];
            // console.log(pickComment);
            fetchPosts(10, {...conf, dashEntityUrn: pickComment.dashEntityUrn, disableFetchInteraction: true});
        }

        if (post.comments?.length > 0)
            post.comments = post.comments.concat(commenters);
        else
            post.comments = commenters;

    }
    else {
        console.log("no comment retrieved.");
    }

    return {commenters, paginationToken: output?.metadata?.paginationToken};
}

export const fetchPostLikersMultiple = async (post, conf, max=100) => {

    let iterations = 0;
    let iterationsMax = Math.ceil(max / 10);

    console.log('fetchPostLikersMultiple with iterationsMax:' + iterationsMax);
    
    let lastFetch = await fetchPostLikers(post, conf);
    console.log("lastFetch length: " + lastFetch?.length + " - iterations: " + iterations);

    let reactions = lastFetch ?? [];

    while (iterations < iterationsMax && lastFetch?.length === 10) {

        iterations++;
        console.log("lastFetch length: " + lastFetch.length + " - iterations: " + iterations);

        // wait a random time betweet 1 and 3 seconds
        await sleep(1000 + (Math.floor(Math.random() * 2000)));
        
        lastFetch = await fetchPostLikers(post, conf, iterations * 10);

        if (lastFetch?.length)
            reactions = reactions.concat(lastFetch);
    }

    return reactions;
}

export const fetchPostLikers = async (post, conf, start=0) => {

    console.log("fetchPostLikers for post " + post.id + " - start: " + start);

    let url = "https://www.linkedin.com/voyager/api/voyagerSocialDashReactions?"
    url += "decorationId=com.linkedin.voyager.dash.deco.social.ReactionsByType-16";
    url += "&count=10";
    url += "&q=reactionType"
    url += "&reactionType=LIKE";
    url += "&start=" + (start ?? 0);
    url += "&threadUrn=" + encodeURIComponent(post.id);
    let output = await fetchLinkedin(url, conf);

    // console.log("fetchPostLikers");
    // console.log(output);
    let reactions = [];

    if (output?.elements) {

        output.elements.forEach(element => {
    
            let reaction = {};
            reaction.profileEntityUrn = element?.actor?.profileUrn?.entityUrn;
            reaction.profileDashEntityUrn = element?.actor?.profileUrn?.entityUrn;
            reaction.entityUrn = element?.entityUrn;
            reaction.id = element?.entityUrn;
            reaction.reactionType = element?.reactionType;
            reaction.profileUrl = element?.reactorLockup?.navigationUrl;
            reaction.profileFullName = element?.reactorLockup?.title?.text;
            if (element?.reactorLockup?.image?.attributes?.length) {
                let src = element?.reactorLockup?.image?.attributes[0]?.detailData?.profilePicture?.profilePicture?.displayImageReference?.vectorImage?.rootUrl;
                src += element?.reactorLockup?.image?.attributes[0]?.detailData?.profilePicture?.profilePicture?.displayImageReference?.vectorImage?.artifacts[3]?.fileIdentifyingUrlPathSegment;
                reaction.profileImage = src;
            }
    
            // console.log({reaction});
            reactions.push(reaction);
        })
    }

    if (post?.reactions?.length > 0)
        post.reactions = post.reactions.concat(reactions);
    else
        post.reactions = reactions;

    return reactions;
}


const fetchLinkedin = async (url, conf) => {

    
    let { cookie_JSESSIONID, cookie_li_at, userAgent } = conf;
    let cookies = `li_at=${cookie_li_at};JSESSIONID=${cookie_JSESSIONID}`;
    
    analytics.log("fetchLinkedinInternal", conf.idUser, {baseUrl: url?.split("?")?.[0], url, userAgent, username: conf.username, dashEntityUrn: conf.dashEntityUrn});

    let headers = {
        "Cookie": cookies, // useless, will be overwritten by browser
        "user-agent": userAgent,
        "csrf-token": cookie_JSESSIONID.replace(/"/g, ""),
    }

    if (conf.useRestli) {
        headers["x-restli-protocol-version"] = "2.0.0";
        // headers["x-li-deco-include-micro-schema"] = true;
        // headers["x-li-lang"] = "en_US";
        // headers["x-li-page-instance"] = "urn:li:page:d_flagship3_detail_base;Apm4DBJrTyCTv7rmkK8O0w==";
        // headers["x-li-track"] = '{"clientVersion":"1.10.6742","mpVersion":"1.10.6742","osName":"web","timezoneOffset":2,"timezone":"Europe/Paris","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":2,"displayWidth":3584,"displayHeight":2240}';
    }

    console.log("fetching " + url + " with cookies " + cookies);
    let response = await fetch(url, {headers});

    // console.log("results", await response.text());

    if (conf.isPlainText) {
        let text = await response.text();
        return text;
    }
    else {
        return await response.json();
    }
}

export const sendData = async (type, data, conf) => {

    let user = {};

    if (conf.idUser) user.idUser = conf.idUser;
    if (conf.username) user.username = conf.username;
    if (conf.dashEntityUrn) user.dashEntityUrn = conf.dashEntityUrn;

    // console.log("sendData type " + type, data);
    console.log("sendData type " + type);
    await fetch("https://us-central1-ez4cast.cloudfunctions.net/linkedinFetcher-push", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data,
            type,
            user,
        }),
    });
}
function decodeHTMLEntities (encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}