/*
修改自@ddgksf2013的微博国际版去广告脚本
使趋势页更符合个人使用习惯
将delete操作改为set
*/
const mainConfig = {};
const modifyTimeUrls = ['statuses/friends_timeline', 'statuses/unread_hot_timeline', 'groups/timeline'];
const modifyOtherUrls = {
	'ct=feed&a=trends': 'removeTopics',
	'user_center': 'modifiedUserCenter'
}
function getModifyMethod(url) {
	for (const s of modifyTimeUrls) {
		if(url.indexOf(s) > -1) {
			return 'removeTimeLine';
		}
	}
	for(const [path, method] of Object.entries(modifyOtherUrls)) {
		if(url.indexOf(path) > -1) {
			return method;
		}
	}
	return null;
}
function removeTopics(data) {
	if(!data.data) {
		return data;
	}
	// if(data.data.search_topic)  {delete data.data.search_topic;}
	// if(data.data.topics) 	   {delete data.data.topics;}
	// if(data.data.discover)      {delete data.data.discover;}
	if(data.data.order) {data.data.order = ["search_topic"]}
	return data;
}
function modifiedUserCenter(data) {
	if(data.data.length === 0) {
		return data;
	}
	data.data.cards = Object.values(data.data.cards).filter(item => !(item.items[0].type === 'personal_vip'));
	return data;
}
function isAd(data) {
	if(!data) {
		return false;
	}
	if(data.mblogtypename == '广告' || data.mblogtypename == '热推') {return true};
	if(data.mblogtypename == '廣告' || data.mblogtypename == '熱推') {return true};
	if(data.readtimetype  == 'adMblog') {return true};
	if(data.promotion && data.promotion.type == 'ad') {return true};
	return false;
}
function isBlock(data) {
	let blockIds = mainConfig.blockIds || [];
	if(blockIds.length === 0) {
		return false;
	}
	let uid = data.user.id;
	for (const blockId of blockIds) {
		if(blockId == uid) {
			return true;
		}
	}
	return false;
}
function removeTimeLine(data) {
	for (const s of ["ad", "advertises", "trends"]) {
		if(data[s]) {
			data[s] = undefined;
		}
	}
	if(!data.statuses) {
		return;
	}
	let newStatuses = [];
	for (const s of data.statuses) {
		if(!isAd(s)) {
			//lvZhouHandler(s);
			if(!isBlock(s)) {
				newStatuses.push(s);
			}
		}
	}
	data.statuses = newStatuses;
}
var body = $response.body;
var url = $request.url;
let method = getModifyMethod(url);
if(method) {
	var func = eval(method);
	let data = JSON.parse(body);
	new func(data);
	body = JSON.stringify(data);
}
$done({body});