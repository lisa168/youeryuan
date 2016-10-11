require(['js/config.js'],function (){
	require(['jquery','utils'],function ($,utils){
		var funcs={};
		funcs.tabFn=function (){
			var iNow=0;
			var left=0;
			var timer=null;
			var timer2=null;
			isOk=true;
			var len=$('.smallImg ol li').length;
			var w=$('.smallImg ol li').eq(0).outerWidth(true)
			$('.smallImg ol').css({'width':len*w});
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
			$('.smallImg ol li').hover(function (){
				clearInterval(timer2);
				if(isOk){
					iNow=Math.floor(iNow/len)*len+$(this).index();
					isOk=false;
					tab();
				}
			},function (){
				autoPlay();
			});
			// 下一张
			$('.tabBox .nextBtn').on('click',function (){
				if(isOk){
					iNow++;
					isOk=false;
					nextPage();
				}
			});
			// 上一张
			$('.tabBox .prevBtn').on('click',function (){
				if(isOk){
					iNow--;
					isOk=false;
					prevPage();
				}
			});
			$('.tabBox .prevBtn,.tabBox .nextBtn').hover(function (){
				clearInterval(timer2);
			},function (){
				autoPlay();
			});
			function prevPage(){
				if(((iNow-5)%len-1)==0||iNow<0){
					iNow=len-1;
					startMove($('.smallImg ol'),-((iNow-4)%len)*w);
				}else if((iNow%len)>=0&&len>5&&(iNow%len)<len-5){
					startMove($('.smallImg ol'),-(iNow%len)*w);
				}
				tab();
			}
			function nextPage(){
				if((iNow%len)>(len-1)){
					iNow=0;
				}
				if((iNow%len)<=len-5){
					startMove($('.smallImg ol'),-(iNow%len)*w);
				}
				tab();
			}
			// 大图淡入淡出
			function tab(){
				$('.smallImg ol li').eq(iNow%len).addClass('active').siblings().removeClass('active');
				$('.tabBox ul li').each(function (){
					if($(this).css('opacity')){
						$(this).css({'opacity':0,'filter':'alpha(opacity:0)'});
					}
				});
				utils.move($('.tabBox ul li').eq(iNow%len),1);	
			}
			// 小图运动
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
			this.tabFn();
		}
		funcs.init();
	});
});
