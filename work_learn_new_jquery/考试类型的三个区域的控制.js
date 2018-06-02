/**
 * Created by 20170522004 on 2017/8/28.
 */
/** 已经改为考试类型，弹出选择框 */
$(".btn-addTest").off('click').click(function () {
    $(".addTest2 ul").html("");//2区已选置空
    $(".addTest3 > dl > dd > ul").html("");//3区底部没选置空
    $(".addTest3 > ul > .itemList").html("");//3区展示dom置空
//【】【】css("max-height","none");该属性控制最高高度
    $(".addTest1 ul").css("max-height","none");
    $(".showOrClose").html("展开");
//【】【】回头查阅data属性
    if($("#selectbox1 .selectbox_selected").data("id") == undefined){
        $window.find("#jumpBox2").show().find("span").html("请选择学段");
    }else{
        $(".btn-addTest").hide();//新增按钮隐藏
        $(".addTest1").show();//选择区呈现
        //选择完毕点击确定按钮，进入更改框
    }
});
//一区的确定按钮
$(".btnWrapSure").off("click").click(function () {
    //1区被选择的input
    var liItemCheckYes = $(".addTest1 ul").find("input:checked").parent();
//【】【】find（）,从属于jq的dom方法，传参是可以传入css1-3的选择器语法的，
//一般语法：$("div:not(.one)")这里的input属于传入了伪类选择器，：checked，前面的是类名.one
    var liItemCheckNo = $(".addTest1 ul").find("input:not(:checked)").parent();
    //如果用户没有选择一个，让他停留在选择框
    if(liItemCheckYes.length == 0){
        return;
    }
    $(".addTest1").hide();//将选择框隐藏
    $(".addTest2").show();//将更改框呈现
    //2区选择的
//【】【】this.appendTo（Target），就是将this添加进入Target
    liItemCheckYes.clone().appendTo($(".addTest2 ul"));
//【】【】注意属性disabled能够控制input的可勾选性
    $(".addTest2 input").attr("disabled","disabled");
});
//一区的取消按钮
$(".btnWrapNo").off("click").click(function () {
    $(".btn-addTest").show();
    $(".addTest1").hide();
});
//二区的更正按钮
$(".pChange ").off('click').click(function () {
//【】【】find传参
    var liItemCheckYes = $(".addTest1 ul").find("input:checked").parent();
    //1区没有选择的input
    var liItemCheckNo = $(".addTest1 ul").find("input:not(:checked)").parent();
    $(".addTest2 ul").html("");

    liItemCheckNo.clone().appendTo($(".addTest3 dl ul"));
    // 3区已选择的
    liItemCheckYes.clone().appendTo($(".addTest3 > ul > .itemContent"));
    //3区已选择的真实input对应label
    var liItemCheckLabel =  $(".addTest3 > ul > .itemContent > li label");
    var strCheck = "";
    for(var i = 0;i <liItemCheckLabel.length;i ++){
        strCheck += '<li>' +
            '<span>' + $(liItemCheckLabel[i]).text() + '</span>'+
            '<span class="icon"></span>' +
            '</li>';
    };
    //3区显示dom列表
    $(".addTest3 > ul > .itemList").append(strCheck);
    $(".addTest3 > ul > .itemList > li").show();
    $(".addTest2").hide();
    $(".addTest3").show();
    //3区显示列表
    var itemListDom = $(".addTest3 > ul > .itemList > li");
    //3区真实列表
    var itemContentDom = $(".addTest3 > ul > .itemContent > li");
    //X按钮点击
    for(var i = 0;i < itemListDom.length; i++){
        itemListDom[i].item = i;
        itemListDom[i].onclick = function () {
            $(this).hide();
//【】【】注意这里使用了一个属性选择器，因为我们将item变成了每个dom的一个属性
            var a = $(itemContentDom[this.item]).find("input").attr("checked",false).removeAttr("disabled");
            a.parent().clone().appendTo($(".addTest3 > dl > dd > ul"));
        }
    }
    //3区取消按钮
    $(".btnWrap2 p:odd").off('click').click(function () {
        //新代码
        $(".addTest3 > dl > dd > ul").html("");
        $(".addTest3 > ul > .itemList").html("");
        $(".addTest3 > ul > .itemContent").html("");
        liItemCheckYes.clone().appendTo($(".addTest2 ul"));
        $(".addTest2 input").attr("disabled","disabled");
        $(".addTest2").show();
        $(".addTest3").hide();
    });
    //3区确定按钮
    $(".btnWrap2 p:even").off('click').click(function () {
        //控制已选的回显
        var liItemCheckYes3 = $(".addTest3").find("input:checked").parent();
        $(".addTest1 ul").html("");
        liItemCheckYes3.clone().appendTo($(".addTest1 ul"));
        $(".addTest3").find("input:checked").parent().appendTo($(".addTest2 ul"));
        $(".addTest2 input").attr("disabled","disabled");
        var liItemCheckNo3 = $(".addTest3 > dl > dd > ul").find("input:not(:checked)").parent();
        liItemCheckNo3.clone().appendTo($(".addTest1 ul"));
        //再次控制显示
        $(".addTest3 > dl > dd > ul").html("");
        $(".addTest3 > ul > .itemList").html("");
        $(".addTest3 > ul > .itemContent").html("");
        $(".addTest2").show();
        $(".addTest3").hide();
    });
});