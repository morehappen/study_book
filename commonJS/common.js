// 初始化日期控件
function initDataTime(mintime, maxtime){
	var options;
	if(mintime != "" && maxtime != ""){
		options = {
			type: 'date',
			beginDate: new Date(mintime),//设置开始日期
			endDate: new Date(maxtime)//设置结束日期
		};
	}
	if(mintime == "" && maxtime != ""){
		options = {
			type: 'date',
			endDate: new Date(maxtime)//设置结束日期
		};
	}
	if(mintime != "" && maxtime == ""){
		options = {
			type: 'date',
			beginDate: new Date(mintime)//设置结束日期
		};
	}
	if(mintime == "" && maxtime == ""){
		options = {type: 'date'};
	}
	
	var picker = new mui.DtPicker(options);
	return picker;
}

// 选择日期结果
function dataTimeResult(rs){
	var time = rs.y.value+"-"+rs.m.value+"-"+rs.d.value;
	return time;
}
function loading_run(){
	$(".loading-js").toggle();
	$(".loading-jsi").toggle();
}


function _ajaxBefore(){
	$('.list_show').html('<div class="warmPrompt">数据加载中...</div>');
}

//返回查询主页面
function ReturnBack(){
	this.openModel=function(dataName,flag){ //开启时传递触发器的id 后期会用到
		$(".index-model").hide();
		$(".common-model").data("model-controller",dataName).show();
		flag=="1" ? $(".common-model").html("") :"";
		if($(".mui-icon-left-nav").is(".mui-action-back")){
			$(".mui-action-back").data("normal","ok").addClass("return-back").removeClass("mui-action-back");
			return;
		}
		$(".action-alert").addClass("return-back").removeClass("action-alert");
	};
	this.closeModel=function(){  //通过返回键关闭开启的额外页面
		$("body").on("tap",".return-back",function(){
			(new ReturnBack()).closeMain($(this));
		});
	};
	this.closeMain=function(this_,falg){ //返回主函数，需要传递返回键:如果就是返回键传递$(this),不是返回键传递$(".return-back")
		$(".common-model").hide();
		$(".index-model").show();
		_pagenum = 1;// 关闭时成本中心重置_pagenum
		pageNum = 1;//关闭时乘客列表page重置
		keywords = '';//乘客列表
		if(this_.data("normal")=="ok"){
			this_.data("normal","").addClass("mui-action-back").removeClass("return-back");
			return;
		}
		this_.removeClass("return-back").addClass("action-alert");
		if($("h1[data-titles]").data("titles")!="" || $("h1[data-titles]").data("titles")!=undefined){
			$("h1[data-titles]").html($("h1[data-titles]").data("titles"));
		}
		
	};
}
// 清理上来加载更多提示
function clearAddMoreDataStr(){
	$(document).find('.addmoreinf').remove();
}
// 上拉加载更多不存在数据时返回字符串
function noMoreStr(){
	return '<div class="nomoreinf">没有更多数据了</div>';
}
/*
 * 乘客信息模块
 * @param {$target} 渲染的目标容器
 */
function renderPassengersHtml($target){
	var html = '';
	html += '<div class="search_outer background-f2"><form id="passenger_form" method="post"><div class="mui-input-row mui-search">' +
		'<input type="search" class="mui-input-clear input-search" placeholder="员工姓名" id="passengerSearch"></div><div class="citySearch position"><ul class="position_ab passenger-search-list"></ul></div></div>' +
		'<div class="p_outer_content position"><div class="select_content padding-auto clear"></div>' +
		'<div class="clear person-content"></div><div class="cover_div position_ab"></div></div>' +
		'<button type="button" class="btn btn-pink sure_mation">确&nbsp;定</button>';
	var $passenger = $('.passenger');
	// var ids = $passenger.attr('data-ids'), passengers = $passenger.attr('data-passengers');
	// $target.attr({'data-ids': ids, 'data-passengers': passengers}).html(html);
	
	// TODO:wxj-20180309-声明在 addPassengers.js 文件中
	SELECTPASSENGERS = JSON.parse($passenger.attr('data-passengers'));
	
	$target.html(html);
}

/*************************************************成本中心*************************************************************/
function HotelLoadChailvData(url,keywords,isCanInput){
	this.url = url;
	this.index = 1;
	this.isCanInput = isCanInput?isCanInput:"";
	this.keywords = keywords?keywords:"";
	this.ajaxurl = function(pageObj){
		var this_ = this;
		if($(".passengerSearch-air-input").val()!=""){
			$(".mui-scroll .mui-table-view").html("");
		}
		$.ajax({
			type : "POST",
			url : this_.url,
			data : pageObj?pageObj:{"pagenum" : "1", "pagesize":"15", "keyword":this_.keywords},
			dataType : "json",
			success : function(data) {
				if(data.status==200){
					this_.index=data.data.index;
					$('.scroll-null').remove();
					if(data.data.items.length>0){
						if($('.scroll-null').length>0){
							$('.scroll-null').remove();
						}
						this_.loadChailvData(data,data.data.items);
					}else{
						if($('.scroll-null').length<=0){
							$('.loding_s').remove();
							$('.scroll').append('<div class="scroll-null" style="text-align: center;">没有更多数据了！</div>');
						}
					}
				}else{
					$('.loding_s').remove();
					layer.msg(data.msg)
				}
			},
			error :function(err){
				console.err(err);
			}
		});
	};
	this.loadChailvData  = function(data,array){
		var list = '';
		array.forEach(function(item,index,Array){
			list +=
				'<li class="mui-table-view-cell">'+
				'<a class="mui-navigate-right every_select_event" data-text="'+item.name+'" data-ids="'+item.id+'">' +
				(item.code==undefined ? '' : '<em class="show_index">' + item.code + '</em>') +
				'<span class="show_text">' + item.name + '</span>' +
				'</a>' +
				'</li>';
		});
		if(this.index==1){
			$('.loding_s').remove();
			$(".mui-scroll .mui-table-view").html(list);
		}else{
			$('.loding_s').remove();
			$(".mui-scroll .mui-table-view").append(list);
		}
		 this.tapChailData();
		 this.scroll();
		 this.scrollSwipedown();
	};
	this.tapChailData = function(){
		$("body").on("tap",'.every_select_event',function(){
			var id =$(".component-cost-center .mui-scroll .input") .attr("data-id");
			var _this = "";
			var val = $(".component-cost-center .cost-title").attr("data-center");
			var resoult = {};
				if(val=="cost"){
					$(".hotel-cost-center").each(function () {
						if ($(this).parents(".passanger-model").attr("data-id") == id) {
							_this = $(this);
						}
					});
					if(_this!="") {
						// _this.children(".hotel-cost-center-value").html($(this).attr("data-text"));
						_this.parents(".passanger-model").find(".costId").val($(this).attr('data-ids'));
						_this.parents(".passanger-model").find(".costName").val($(this).attr('data-text'));
						closeComponent();
					}
				}else if(val=="project"){
					$(".hotel-project-center").each(function () {
						if ($(this).parents(".passanger-model").attr("data-id") == id) {
							_this = $(this);
						}
					});
					if(_this!="") {
						// _this.children(".hotel-project-center-value").html($(this).attr("data-text"));
						_this.parents(".passanger-model").find(".itemNumberId").val($(this).attr('data-ids'));
						_this.parents(".passanger-model").find(".itemNumber").val($(this).attr('data-text'));
						closeComponent();
					}
				}
		});
		
	};
	this.scroll = function(){
		// /加载更多
		var _this = this;
		$("body").on("swipeUp",".mui-table-view-chevron",function (e) {
			//防止浏览器默认行为(W3C)
			if(e && e.preventDefault){
				e.preventDefault();
			}
			//IE中组织浏览器行为
			else{
				window.event.returnValue=fale;
				return false;
			}
			var height = $(this).find(".mui-table-view-cell").height()*$(this).find(".mui-table-view-cell").length;
			var heightH = -$(this).offset().top+$('.scroll-content').height();
			var heigthJ =-$(this).offset().top+$(window).height();
			if(heigthJ>height){
				if($('.scroll-null').length<=0){
					//让元素滚动到底部
					$(".loding_s").length>0?$(".loding_s").remove():'';
					$(this).append('<div class="loding_s" style="width: 100%;height:3rem;"></div>');
					if($(".loding_s").length==1){
						setTimeout(function(){
							_this.index=_this.index+1;
							_this.ajaxurl({"pagenum" :_this.index , "pagesize":"15", "keyword":""})
						},2000);
					}
				}
			}
		});
	};
	//下拉刷新功能
	this.scrollSwipedown = function(){
		// /下拉刷新功能
		var _this = this;
		$("body").on("swipeDown",".mui-table-view-chevron",function (e) {
			//防止浏览器默认行为(W3C)
			if(e && e.preventDefault){
				e.preventDefault();
			}
			//IE中组织浏览器行为
			else{
				window.event.returnValue=false;
				return false;
			}
			_this.index=1;
			// var height = $(this).find(".mui-table-view-cell").height()*$(this).find(".mui-table-view-cell").length;
			if($(this).scrollTop()<=5){
				$(".loding_s").length>0?$('.loding_s').remove():"";
				$(this).scrollTop(0);
					$(this).before('<div class="loding_s" style="width: 100%;height:3rem;"></div>');
					setTimeout(function(){
						_this.ajaxurl({"pagenum" :_this.index , "pagesize":"15", "keyword":""})
					},2000);
			}
		});
	};
}

//成本中心和项目中心可以输入
$('body').on('tap',".isCanInput_btn",function () {
	var $this = $('#passengerSearch');
	var id =$(".component-cost-center .mui-scroll .input") .attr("data-id");
	var _this = "";
	var val = $(".component-cost-center .cost-title").attr("data-center");
	var resoult = {};
	if(val=="cost"){
		$(".hotel-cost-center").each(function () {
			if ($(this).parents(".passanger-model").attr("data-id") == id) {
				_this = $(this);
			}
		});
		if(_this!="") {
			_this.children(".hotel-cost-center-value").html($this.val());
			_this.parents(".passanger-model").find(".costId").val("");
			_this.parents(".passanger-model").find(".costName").val($this.val());
			closeComponent();
		}
	}else if(val=="project"){
		$(".hotel-project-center").each(function () {
			if ($(this).parents(".passanger-model").attr("data-id") == id) {
				_this = $(this);
			}
		});
		if(_this!="") {
			_this.children(".hotel-project-center-value").html($this.val());
			_this.parents(".passanger-model").find(".itemNumberId").val("");
			_this.parents(".passanger-model").find(".itemNumber").val($this.val());
			closeComponent();
		}
	}
});
//
$("body").on("input propertychange",".passengerSearch-air-input",function () {
	var key = $(".component-cost-center .cost-title").attr("data-center");
	var keywords =$(this).val();
	var id = $(this).attr("data-id");
	// var this_ = '';
	// $(".hotel-cost-center").each(function(){
	// 	if($(this).parents(".mui-table-view-cell-hotel").attr("data-id")==id){
	// 		this_ = $(this);
	// 	}
	// });
	if(keywords!=""){
		if(key=="cost"){
			var cost = (new HotelLoadChailvData("/shopping/cost/center",keywords));
			cost.ajaxurl();
			return ;
		}else if(key=="project"){
			var cost = (new HotelLoadChailvData("/shopping/project",keywords));
			cost.ajaxurl();
			return ;
		}
	}
	return ;
});
/*********************关闭成本中中心和项目中心*******************/
$("body").on("tap","#close-component-cost-center",closeComponent);
function closeComponent(){
	$('.travel_header').show();
    setTimeout(function () {
		$(".content_hasnextpage").html("");
		$('.scroll-content').removeClass('scroll-content_dh');
		$('.search_outer').show();
		$("#hotel_confirm_form").show();
		$(".component-cost-center").hide();
		$(".mui-scroll .mui-table-view").html("");
		$(".passengerSearch-air-input").val("");
		$(".component-cost-center .cost-title").attr("data-center","");
    }, 100);
}
