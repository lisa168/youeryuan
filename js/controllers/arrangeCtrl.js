require(['js/config.js'],function (){
	require(['jquery','utils'],function ($,utils){
		var funcs={};
		funcs.lunboFn=function (){
			var iNow=0;
			var left=0;
			var timer=null;
			var timer2=null;
			isOk=true;
			var len=$('.roundBox a').length;
			var w=$('.overPart a').eq(0).outerWidth(true);
			if(len<12){
				$('.overPart').css({'margin':'0 auto'});
			}
			$('.overPart').css({'width':w*len});
			// 自动播放
			autoPlay();
			function autoPlay(){
				clearInterval(timer2);
				timer2=setInterval(function (){
					iNow++;
					nextPage();
				},2000);
			}
			// 鼠标经过小图
			$('.overPart a').hover(function (){
				clearInterval(timer2);
				if(isOk){
					isOk=false;
					iNow=Math.floor(iNow/len)*len+$(this).index();
					tab();
				}
			},function (){
				autoPlay();
			});
			// 鼠标经过上一页，下一页按钮
			$('.arrangeDetail .prevBtn,.arrangeDetail .nextBtn').hover(function (){
				clearInterval(timer2);
			},function (){
				autoPlay();
			});
			// 上一张
			$('.arrangeDetail .prevBtn').on('click',function (){
				if(isOk){
					isOk=false;
					iNow--;
					prevPage();
				}
			});
			// 下一张
			$('.arrangeDetail .nextBtn').on('click',function (){
				if(isOk){
					isOk=false;
					iNow++;
					nextPage();
					console.log(iNow)
				}
			});
			function prevPage(){
				if(((iNow-12)%len-1)==0||iNow<0){
					iNow=len-1;
					startMove($('.overPart'),-((iNow-11)%len)*w);
				}else if((iNow%len)>=0&&len>12&&(iNow%len)<len-12){
					startMove($('.overPart'),-(iNow%len)*w);
				}
				tab();
			}
			function nextPage(){
				if((iNow%len)>(len-1)){
					iNow=0;
				}
				if((iNow%len)<=(len-12)){
					startMove($('.overPart'),-(iNow%len)*w);
				}
				tab();
			}
			// 大图淡入淡出
			function tab(){
				$('.overPart a').eq(iNow%len).addClass('on').siblings().removeClass('on');
				$('.arrangeDetail ul li').each(function (){
					if($(this).css('opacity')!=0){
						$(this).css({'opacity':0,'filter':'alpha(opacity:0)'});
					}
				});
				utils.move($('.arrangeDetail ul li').eq(iNow%len),1);
			}
			function startMove(obj,iTarget){
				var start=left;
				var dis=iTarget-start;
				var count=Math.floor(700/30);
				var n=0;
				clearInterval(timer);
				timer=setInterval(function (){
					n++;
					var a=1-n/count;
					left=start+dis*(1-Math.pow(a,3));
					obj.css({'left':left+'px'});
					if(n==count){
						clearInterval(timer);
					}
				},30);
			}
		}
		// 初始化
		funcs.init=function (){
			this.lunboFn();
		}
		funcs.init();
	});
});
