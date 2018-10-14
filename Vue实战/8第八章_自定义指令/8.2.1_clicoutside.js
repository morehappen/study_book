Vue.directive('clickoutside',{
    //bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    bind:function(el,binding,vnode){
        //el：指令所绑定的元素，可以用来直接操作 DOM 。
        // binding：一个对象，包含以下属性：
//expression：字符串形式的指令表达式。例如v-my-directive="1+1"中，表达式为 "1+1"。
        //value：指令的绑定值，例如：v-my-directive="1+1"中，绑定值为2。
        console.log(binding.value);//ƒ handleClose(){this.show = false;}
        console.log(binding.expression);//handleClose
        function documentHandler(e){
            if(el.contains(e.target)){
                return false
            }
// 第二个判断的是当前的指令v-clickoutside有没有写表达式，在该自定义指令中，
// 表达式应该是一个函数在过滤了内部元素后，点击外面任何区域应该执行用户表达式中的函数，
// 所以binding.value()就是用来执行当前上下文methods中指定的函数的
            if(binding.expression){
                binding.value(e);
            }
        }
        el._vueClickOutside_ = documentHandler;
        document.addEventListener('click',documentHandler);
    },
    // unbind：只调用一次，指令与元素解绑时调用。
    unbind:function(el,binding){
        document.removeEventListener('click',el._vueClickOutside_);
        delete el._vueClickOutside_;
    }
})