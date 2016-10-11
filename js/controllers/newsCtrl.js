require(['js/config.js'],function (){
	require(['jquery','utils','modules/common/pages'],function ($,utils,PageNav){
		var funcs={};
		funcs.pageFn=function (){
			var curPage=parseInt($('.currentPage').val()||1);
			var totalPage=parseInt($('.totalPage').val()||1);
			var pager=new PageNav({
				currentPage:curPage,
				totalPage:totalPage,
				wrapId:'#pageNav',
				callback:function (curPage){
					alert(curPage)
				}
			});
		}
		funcs.tabFn=function (){
			var timer=null;
			var timer2=null;
			var iNow=0;
			$('.lunbo ol').css({'width':$('.lunbo ol li').length*$('.lunbo ol li').eq(0).outerWidth(true)+'px'});
			var len=$('.lunbo ol li').length;
			$('.overf ul li').clone().appendTo($('.overf ul'));
			$('.overf ul').css({'width':$('.overf ul li').eq(0).outerWidth(true)*$('.overf ul li').length+'px'});
			var W=$('.overf ul').width()/2;
			// 获取数据
			var data=['111111111今年秋天的某一天，如果没有变化的话，这不是说我对iPhone SE有什么意见，或不喜欢小尺寸iPad Pro。每件产品在商...',
			'22222222222今年秋天的某一天，如果没有变化的话，这不是说我对iPhone SE有什么意见，或不喜欢小尺寸iPad Pro。每件产品在商...',
			'33333333今年秋天的某一天，如果没有变化的话，苹果 将举行大型发布会推出下一代iPhone旗舰手误会，这不是说我对iPhone SE有什么意见，d Pro。每件产品在商...',
			'4444444今年秋天的某一天，如果没有变化的话，根据本月的发布情况，iPhone7最好是非常棒的产品。别误会，这不是说我对iPhone SE有什么意见，或不喜欢小尺寸iPad Pro。每件产品在商...',
			'55555555今年秋天的某一天，如果没有变化的话，苹果 将举行大型发布会推Phone7最好是非常棒的产品。别误会，这不是说我对iPhone SE有什么意见，或不喜欢小尺寸iPad Pro。每件产品在商...'];
			$('.xinxianDetail p').html(data[0]);
			// 自动播放
			clearInterval(timer2);
			timer=setInterval(function(){
				iNow++;
				tab();
			},2000);
			//鼠标经过，组织自动轮播
			$('.lunbo').hover(function (){
				clearInterval(timer);
			},function (){
				clearInterval(timer);
				timer=setInterval(function(){
					iNow++;
					tab();
				},2000);
			});
			// 下一张
			$('.lunbo .nextBtn').on('click',function (){
				iNow++;
				tab();
			});
			// 上一张
			$('.lunbo .prevBtn').on('click',function (){
				iNow--;
				tab();
			});
			// 鼠标经过点
			$('.lunbo ol li').on('mouseover',function (){
				iNow=Math.floor(iNow/len)*len+$(this).index();
				tab();
			});
			function tab(){
				if(iNow>=0){
					$('.xinxianDetail p').html(data[iNow%len]);
					$('.lunbo ol li').eq(iNow%len).addClass('active').siblings().removeClass('active');
				}else{
					$('.xinxianDetail p').html(data[(iNow%len+len)%len]);
					$('.lunbo ol li').eq((iNow%len+len)%len).addClass('active').siblings().removeClass('active');
				}
				move($('.overf ul'),-iNow*$('.overf ul li').eq(0).innerWidth());
			}
			var left=0;
			function move(obj,iTarget){
				var start=left;
				var count=Math.floor(700/30);
				var dis=iTarget-start;
				clearInterval(timer2);
				var n=0;
				timer2=setInterval(function(){
					n++;
					var a=1-n/count;
					
						left=start+dis*(1-Math.pow(a,3));
					if(left<0){
						obj.css({'left':left%W+'px'});
					}else{
						obj.css({'left':((left%W)-W)%W+'px'});
					}
					if(n==count){
						clearInterval(timer2);
					}
				},30);
			}

		}
		// 初始化
		funcs.init=function (){
			// 分页
			this.pageFn();
			//选项卡
			this.tabFn();

		}
		funcs.init();
	});
});
