var data = ['img/16.jpg','img/17.jpg','img/18.jpg','img/3.jpg','img/4.jpg'];
var aboutData = [
	'个人介绍',
	'毕业院校: 河北北方学院',
	'工作年限: 3年',
	'兴趣爱好: 旅游、看书、敲代码'
];
(function(){
	$body = $(document.body);
	
	//页面进来图片加载
	loading();
	
	
	
	
	
	
	//canvas动画设置开始
	var hat = new drawHat('hat',move.css($('#logo')[0],'height')/2+30);
	var shoesTop = window.innerHeight - $('#navConvas').offset().top - $('#navConvas').outerHeight()/2;
	var shoes = new drawHat('shoes',shoesTop);
	
	//绘制页面中所有的canvas效果
	allCanvas();
	
	
	navRound('nav');
	
	
	//首页个性化方法
	void function (w,d){
		var $tabHome = $('#home');
		if ( $tabHome[0] ) {
			var imgTab = new TabImg('home');
			
			imgTab.init({
				data: ['img/16.jpg','img/17.jpg','img/18.jpg','img/3.jpg','img/4.jpg'],
				imgParObj: $tabHome.find('.productList')[0],
				subParCode: $tabHome.find('.subCode')[0],
				nextBtn: $tabHome.find('.next')[0],
				prevBtn: $tabHome.find('.prev')[0],
				callBack: fnProductHid
			})
			imgTab.extend({
				a:function(obj) {
					var startX, disX, num = 0;
					var _this = this;
					obj.addEventListener('touchstart',function(ev){
						var ev = ev || event;
						console.log(ev);
						console.log(ev.changedTouches[0].pageX,ev.changedTouches[0].pageY)
						if (ImgEvent(obj,ev.changedTouches[0].pageX,ev.changedTouches[0].pageY)){
							startX = _this.touchStart(ev);
						}
					});
					obj.addEventListener('touchmove',function(ev){
						var ev = ev || event;
						disX = _this.touchsMove(ev,disX,startX);
					});
					obj.addEventListener('touchend',function(){
						var ev = ev || event;
						_this.touchsEnd(disX);
					});
				}
			})
			imgTab.a($('#hat')[0]);
			imgTab.a($('#shoes')[0]);
			
			//点击图片，弹出/隐藏详情框
			;(function(factory) {
				var $productList = $('#home').find('.productList');
				$productList[0].onOff = true;
				$productList.on('click',function(ev){
					factory($productList);
				})
				$('#hat').click(function(ev){
					var ev = ev || event;
					if (ImgEvent(this,ev.pageX,ev.pageY)) {
						factory($productList);
					}
				})
				$('#shoes').click(function(ev){
					
					var ev = ev || event;
					
					if (ImgEvent(this,ev.pageX,ev.pageY)) {
						factory($productList);
					}
				})
			})(function($productList){
				if ( $productList[0].onOff ) {
					fnProductShow();
				} else {
					fnProductHid();
				}
			});
			//弹出详情框
			function fnProductShow() {
				hat.init({now:'activeData',last:'loadedData'},{time:500});
				shoes.init({now:'activeData',last:'loadedData'},{onOff:true,time:500});
				$('#hint').css({
					'transition': 'all .5s',
					'-webkit-transition': 'all .5s',
					'opacity': '1',
					'width':$('#hint').prop('width'),
					'height':$('#hint').prop('width'),
					'top': $('#hint').prop('top')
				});
				//creatText(aboutData,$('#hint').find('.showText')[0]);
				$('#home').find('.productList')[0].onOff = false;
			}
			//隐藏详情框
			function fnProductHid() {
				if (!$('#home').find('.productList')[0].onOff) {
					hat.init({now:'loadedData',last:'activeData'},{time:500});
					shoes.init({now:'loadedData',last:'activeData'},{onOff:true,time:500});
					$('#hint').css({
						'width':'0',
						'height':'0',
						'top': '40%',
						'opacity': '0'
					});
					$('#home').find('.productList')[0].onOff = true;
				}
			}
		}
	}(window,document);
	
	
	//works页面个性化方法
	void function (w,d) {
		var $tabWorks = $('#works');
		if ( $tabWorks[0] ) {
			var $aAs = $tabWorks.find('a');
			$aAs.on('mouseover',function(){
				$(this).css({'transform':'scale(1.3)','-webkit-transform':'scale(1.3)'});
			});
			$aAs.on('mouseout',function(){
				$(this).css({'transform':'scale(1)','-webkit-transform':'scale(1)'});
			});
			;(function(){
				var listWheel = new Scroll('works');
				listWheel.init();
			})()
		}
	}(window,document);
	
	
	//works页面个性化方法
	void function (w,d,factory) {
		var $tabAbout = $('#about');
		var $tabContact = $('#contact');
		
		factory(w,d,$tabAbout,aboutData);
		factory(w,d,$tabContact,aboutData);
		
	}(window,document,function(w,d,$obj,data){
		if ( $obj[0] ) {
			$('#hint').css({
				'opacity': '1',
				'width':$('#hint').prop('width'),
				'height':$('#hint').prop('width'),
				'top': $('#hint').prop('top')
			});
			creatText(data,$('#hint').find('.showText')[0]);
		}
	});
	
	
	function allCanvas() {	
		if ( $body.hasClass('home') ) {
			drawLogo('logo');
			
			hat.init({now:'loadedData',last:'loadingData'},{time:700});
			shoes.init({now:'loadedData',last:'loadingData'},{onOff:true,time:700});
		} else if ($body.hasClass('works') ) {
			drawLogo('logo','#fff');
			
			hat.init({now:'activeData',last:'loading'},{time:700,color:'#1e1e1e'});
			shoes.init({now:'activeData',last:'loadingData'},{onOff:true,time:700});
		} else if ( $body.hasClass('about') || $body.hasClass('contact') ) {
			drawLogo('logo','#fff');
			
			hat.init({now:'activeData'},{time:700,color:'#1e1e1e'});
			shoes.init({now:'activeData'},{onOff:true,time:700});
		}
		drawNav('navConvas');
	}
	
	//点击导航,导航旋转
	function navRound(id) {
		var $nav = $('#'+id);
		var $navBase = $nav.find('.navBase');
		var $navBg = $nav.find('.navBg');
		var $navList = $nav.find('.navList');
		var $a = $nav.find('.navList').find('a');
		
		move.css($navBase[0],'rotate',45);
		move.css($navList[0],'rotate',45);
		for ( var i=0; i<$a.length; i++ ) {
			move.css($a[i],'rotate',-45);
		}
		
		$a.off('click').on('click',function(){
			if ( !$(this).hasClass('active') ) {
				var index = $(this).index();
				var className = $(this).attr('class');
				$(this).addClass('active').siblings().removeClass('active');
				
				move.mTween($navBase[0],{'rotate':-(index*90-45)},index*200,'linear',function(){
					if ( $body.hasClass('about') || $body.hasClass('contact')) {
						openWin(className);
					} else {
						$body.removeClass('loaded').addClass('loading');
						setTimeout(function(){
							openWin(className);
						},700);
					}
					
				});
				move.mTween($navBg[0],{'rotate':-index*90},index*200,'linear');
				move.mTween($navList[0],{'rotate':-(index*90-45)},index*200,'linear');
				for ( var i=0; i<$a.length; i++ ) {
					move.mTween($a[i],{'rotate':(index*90+45)-90},index*200,'linear');
				}
			}
		})
	}
	
	
	//打开一个新的页面
	function openWin(name) {
		name = name === 'home'? 'index': name;
		window.location.href = name + '.html';
	}
	
	
	
	//设置详情展框的位置和宽高
	function setSquareHeight(){
		//设置导航按钮的位置
		//获取顶部的logo
		var $top = $('#logo').offset().top;
		//获取底部的nav列表
		var $NavObj = $('#nav').find('.navList');
		var $NavTop = $NavObj.offset().top;
		var $NavHeight = $NavObj.outerHeight()/2;
		
		var c = $NavTop+$NavHeight-$top;
		
		var a = Math.sqrt(Math.pow(c,2)/2);
		$('#hint').css({
					'transition': '',
					'-webkit-transition': ''
				});
		$('#hint').css({'width':a,'height':a});
		$('#hint').offset({'top':$top});
		$('#hint').prop('width',a);
		$('#hint').prop('top',$('#hint').css('top'));
		$('#hint').css({'width':0,'height':0,'top':'40%'});
	}
	//页面进来图片加载
	function loading() {
		if ( $body.hasClass('loading') ) {
			var num = 0;
			$(data).each(function(i,e){
				var $img = $('<img src="'+e+'"/>');
				$img.off().on('load',function(){
					num ++;
					if ( num === data.length ) {
						$body.removeClass('loading').addClass('loaded');
						setTimeout(setSquareHeight,800);
					}
				})
			})
		} else {
			setSquareHeight();
		}
		
	}
	
	function creatText(data,obj) {
		if(!Array.isArray(data) || data.length===0) return;
		var num = 0;
		var arrObj = [];
		obj.innerHTML = '';
		for ( var i=0; i<data.length; i++ ) {
			var p = document.createElement('p');
			arrObj.push(obj.appendChild(p));
		}
		randText(0,arrObj[0]);
		function randText(n,p){
			var index = 0,timer= null,curTimer=null ;
			//var p = document.createElement('p');
			var i = document.createElement('i');
			p.appendChild(i);
			//obj.appendChild(p);
			timer = setInterval(function(){
				var txt = document.createTextNode(data[n].charAt(index));
				p.insertBefore(txt,i);
				
				if ( index === data[n].length-1 ) {
					
					clearInterval(timer);
					if ( n<data.length-1 ) {
						n++;
						p.removeChild(i);
						randText(n,arrObj[n]);
					}
				}
				index++;
			},200);
			curTimer = setInterval(function(){
				if (!i) {
					clearInterval(curTimer);
				} else {
					i.style.opacity = (!i.onOff?'100':'0');
					i.onOff = !i.onOff;
				}
			},200)
		}
	}
	
})()



