const modifyStatusesUrls=["statuses/friends/timeline","statuses/friends_timeline","statuses/unread_friends_timeline","statuses/unread_hot_timeline"],modifyOtherUrls={"ct=feed&a=trends":"removeTopics",user_center:"modifiedUserCenter","interface/sdk/sdkad.php":"removePhpScreenAds","a=get_coopen_ads":"removeIntlOpenAds","php?a=search_topic":"removeSearchTop"};var body=$response.body,url=$request.url;let method=getModifyMethod(url);if(method){var func=eval(method);if("removePhpScreenAds"===method){let e=JSON.parse(body.substring(0,body.length-2));new func(e),body=JSON.stringify(e)+"OK"}else{let e=JSON.parse(body);new func(e),body=JSON.stringify(e)}$done({body:body})}else $done({});function getModifyMethod(e){for(const t of modifyStatusesUrls)if(e.indexOf(t)>-1)return"removeTimeLine";for(const[t,a]of Object.entries(modifyOtherUrls))if(e.indexOf(t)>-1)return a;return null}function removeSearchTop(e){return e.data&&0!==e.data.length?("searchtop"===e.data[0].type&&e.data.shift(),e):e}function removeTopics(e){return e.data&&0!==e.data.length?(e.data.order&&(e.data.order=["search_topic"]),e):e}function modifiedUserCenter(e){return e.data&&0!==e.data.length?(e.data.cards=Object.values(e.data.cards).filter((e=>"personal_vip"!==e.items[0].type)),e):e}function removePhpScreenAds(e){return e.ads&&0!==e.ads.length?(e.show_push_splash_ad=!1,e.background_delay_display_time=604800,e.ads=[],e):e}function removeIntlOpenAds(e){return e.data&&0!==e.data.length?(e.data.ad_list=[],e.data.gdt_video_ad_ios=[],e.data.display_ad=0,e.data.ad_ios_id=null,e.data.app_ad_ios_id=null,e.data.reserve_ad_ios_id="",e.data.reserve_app_ad_ios_id="",e.data.ad_duration=604800,e.data.ad_cd_interval=604800,e.data.pic_ad=[],e):e}function removeTimeLine(e){for(const t of["ad","advertises","trends"])e[t]&&(e[t]=void 0);if(!e.statuses)return;let t=[];for(const a of e.statuses)isAd(a)||t.push(a);e.statuses=t}function isAd(e){return!!e&&("广告"===e.mblogtypename||"热推"===e.mblogtypename||("廣告"===e.mblogtypename||"熱推"===e.mblogtypename||!(!e.promotion||"ad"!==e.promotion.type)))}