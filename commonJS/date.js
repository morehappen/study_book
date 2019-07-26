/**
 * 对时间的操作
 * @param date 传入的日期格式 YYYY-MM-DD
 * @param days 传入的天数  当前日期加几天 可以为-1为前一天
 * @param type 返回的日期类型
 * @returns {String}
 */
function addDate(date, days,type) {
	var d = new Date(date);
	d.setDate(d.getDate() + days);
	return formatDateStr(d, type);
}

/**
 * 时间进行月份加减操作
 * @param date 传入的日期格式 YYYY-MM-DD
 * @param mons 加减月数
 * @param type 返回的日期类型
 * @returns {String}
 */
function addDateMon(date, mons,type) {
	var d = new Date(date);
	d.setMonth(d.getMonth() + mons)
	return formatDateStr(d, type);
}

/**
 * 格式化日期
 * @param date 日期 Date类型
 * @param type 转换格式
 * @returns {String}
 */
function formatDateStr(date, type){
	var d = date;
	var month = d.getMonth() + 1;
	var day = d.getDate();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	var val;
	if(type=="yyyy-MM-dd"){
		val = d.getFullYear() + "-" + month + "-" + day;
	}else if (type=="MM月dd日"){
		val = month + "月" + day+"日";
	}else if (type=="MM-dd"){
		val = month + "-" + day;
	}else if (type=="年月日"){
		val = d.getFullYear() + "年" + month + "月" + day +"日";
	}else if (type=="yyyy/MM/dd"){
		val = d.getFullYear() + "/" + month + "/" + day;
	}
	return val;
}

/**
 * 时间对比 返回dateTwo>dateOne为true    dateTwo<dateOne返回false
 * @param dateOne
 * @param dateTwo
 * @returns {Boolean}dateOne 
 */
function compareDate(dateOne,dateTwo){
	var date1=new Date(dateOne)
	var date2=new Date(dateTwo)
	return Date.parse(date1)<=Date.parse(date2); 
}

//计算两个日期之间相隔的天数  日期格式为yyyy-MM-dd
function dayDifferNum(startDate, endDate){
	var time1 = Date.parse(new Date(startDate));
	var time2 = Date.parse(new Date(endDate));
	var dayNum = Math.abs(parseInt((time2 - time1)/1000/3600/24));
	return parseInt(dayNum);
}

//返回周几   格式yyyy-MM-dd
function getWeek(str){
	if(str==undefined){
		return str;
	}
	var d = new Date(Date.parse(str.replace(/-/g, "/"))); 
	d=d.getDay();
	switch(d)
	{
	case 1:
		return "周一";
	  break;
	case 2:
		return "周二";
	  break;
	case 3:
		return "周三";
	  break;
	case 4:
		return "周四";
	  break;
	case 5:
		return "周五";
	  break;
	case 6:
		return "周六";
	  break;
	case 0:
		return "周日";
	  break;
	default:
	  return "无法识别的日期";
	}
}
