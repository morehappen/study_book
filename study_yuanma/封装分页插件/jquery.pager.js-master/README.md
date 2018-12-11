# jquery.pager.js
轻量级的jquery分页插件

1、简单轻量的分页插件，源码不超过5kb

2、支持自定义按钮文字、页码链接

3、支持页面改变后的回调函数

### 基本使用
#### html
```
<div class="pager">
</div>
```

#### css
```
.pager { display: inline-block; font: 12 px/21px "宋体"; margin-top: 20px; }
    .pager a, .pager .flip, .pager .curPage { border: 1px solid #e3e3e3; display: inline-block; height: 22px; line-height: 22px; text-align: center; }
    .pager a { background: none repeat scroll 0 0 #fff; color: #010101; text-decoration: none; width: 26px; }
        .pager a:hover { background: none repeat scroll 0 0 #f1f1f1; }
    .pager .noPage { color: #a4a4a4; }
    .pager .curPage { background: none repeat scroll 0 0 #49abde; color: #ffffff; width: 26px; }
    .pager .flip { width: 56px; }
```

#### script
```
<script src="http://luopq.com/demo/lib/jquery-1.10.2.min.js"></script>
<script src="../src/jquery.pager.js"></script>
<script>
    var pager = $(".pager").pager();
</script>
```

### Demo
1、<a href="http://luopq.com/demo/pager/examples/index.html" target="_blank">Demo</a>

### Options
|参数|类型|默认值|描述|
|----|---|-----|----|
|pageIndex|number|0|当前页码，0表示第一页|
|pageSize|number|6|每页显示数量|
|itemCount|number|50|显示项的总数量|
|maxButtonCount|number|7|除去第一页和最后一页的最大按钮数量|
|prevText|string|"上一页"|上一页按钮显示的文字|
|nextText|string|"下一页"|下一页按钮显示的文字|
|buildPageUrl|function|null|构造页码按钮链接href的方法,包含一个pageIndex参数，不传则返回"javascript:;"|
|onPageChanged|function|null|页码修改后的回调函数，包含一个pageIndex参数|