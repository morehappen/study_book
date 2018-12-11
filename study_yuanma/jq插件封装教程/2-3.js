$(function($, window, document, undefined) {
    //此处为什么要使用匿名自调用呢，使用因为需要这个函数的作用域来包裹下面的变量，比如Beautifier，如果多人开发，这样的
    // 变量名多了后，会造成冲突
    //为什么不将这些变量名放入$.fn.myPlugin，因为这样会让代码臃肿。而在$.fn.myPlugin里面我们其实应该更专注于插件的调用，以及如何与jQuery互动。


    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
            //此处是插件的参数
            this.defaults = {
                'color': 'red',
                'fontSize': '12px',
                'textDecoration': 'none'
            },
            //此处是将插件的默认参数和传入参数进行合并
            this.options = $.extend({}, this.defaults, opt)
    };
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    };
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        //二参是用户自定义参数。一参是
        //一参：这里一定要注意，这个this是jq的this，所以作为形参传入后，我们可以再插件内部去使用它们了
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }
})($, window, document)