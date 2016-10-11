/**
 * 通用函数库.
 */
define(['jquery'],function($){
    var rets = {};
    // 淡入淡出
    rets.move=function (obj,iTarget){
        var start=parseFloat(obj.css('opacity'));
        var count=Math.floor(500/30);
        var dis=iTarget-start;
        var n=0;
        clearInterval(obj.timer);
        obj.timer=setInterval(function (){
            n++;
            var a=1-n/count;
            var cur=start+dis*(1-Math.pow(a,3));
            obj.css({'opacity':cur,'filter':'alpha(opacity:'+cur*100+')'});
            if(n==count){
                clearInterval(obj.timer);
                isOk=true;  
            }
        },30)
    }
    rets.init=function (){
        
    }
    // 调用
    rets.init();

    return rets;
});
