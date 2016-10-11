require(['js/config.js'],function (){
	require(['jquery','utils'],function ($,utils){
		var funcs={};
		funcs.fadeInOut=function (){
			var iNow=0;
			var timer=null;
			var aLi=$('.imgbox ul li');
			var len=$('.imgbox ul li').length;
			clearInterval(timer);
			timer=setInterval(function (){
				iNow++;
				tab();
			},2000);
			function tab(){
				$('.imgbox ul li').each(function (){
					if($(this).css('opacity')==1){
						utils.move($(this),0);
					}
				});
				utils.move(aLi.eq(iNow%len),1);
			}
		}
		funcs.marqueeFn=function (){
			$('.marqueeBox ul li').clone().appendTo($('.marqueeBox ul'));
			var aLi1=$('.marqueeBox ul li').eq(0);
			$('.marqueeBox ul').css({'width':$('.marqueeBox ul li').length*aLi1.outerWidth(true)});
			var W=$('.marqueeBox ul').innerWidth()/2;
			var timer=null;
			var left=0;
			clearInterval(timer);
			timer=setInterval(function (){
				left+=4;
				$('.marqueeBox ul').css({'left':(left%W-W)%W});
			},30);
			$('.marqueeBox').hover(function (){
				clearInterval(timer);
			},function (){
				timer=setInterval(function (){
					left+=4;
					$('.marqueeBox ul').css({'left':(left%W-W)%W});
				},30);
			});
		}
		// 初始化
		funcs.init=function (){
			// 淡入淡出
			this.fadeInOut();
			// 无缝滚动
			this.marqueeFn();
		}
		funcs.init();
	});
});
