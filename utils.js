export const getDate = function(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	hour = hour > 9 ? hour : '0' + hour;
	minutes = minutes > 9 ? minutes : '0' + minutes;
	seconds = seconds > 9 ? seconds : '0' + seconds;
	return `${year}-${month}-${day} ${hour}:${minutes}:00`;
}

export const compareDate = function(date1, date2) {
	return date1.substr(0, 16) > date2.substr(0, 16);
}

export const isEmpty = function(str) {
	return str === null || str === undefined || str === '';
}

export const WARNING_TITLE = "警告";
export const WARNING_DATE_LT_CURRENT = "不能选择早于现在的时间";
export const WARNING_END_LT_START = "结束时间不能早于开始时间";
export const WARNING_DEADLINE = "截止时间不能大于开始时间";
export const WARNING_TITLE_EMPTY = "分享会标题不能为空";
export const WARNING_OWNER_EMPTY = "演讲者姓名不能为空";
export const WARNING_PLACE_EMPTY = "演讲地点不能为空";
export const WARNING_PARTICIPANTS_EMPTY = "可报名人数不能为空";
export const WARNING_LEAST_PARTICIPANTS_EMPTY = "最小报名人数不能为空";
export const WARNING_DEADLINE_DATE_EMPTY = "报名截止时间不能为空";
export const WARNING_START_DATE_EMPTY = "分享会开始时间不能为空";
export const WARNING_END_DATE_EMPTY = "分享会结束时间不能为空";
export const MORE_THAN_ONE_TOPIC_AT_SAME_TIME = "同一时间不能创建多个话题";

export const REGISTRATION_SUCCESS = "registration successfully";
