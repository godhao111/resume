var data = ['img/16.jpg','img/17.jpg','img/18.jpg','img/3.jpg','img/4.jpg'];
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
			
			//点击图片，弹出/隐藏详情框
			;(function() {
				var $productList = $('#home').find('.productList');
				$productList[0].onOff = true;
				$productList.on('click',function(ev){
					if ( $productList[0].onOff ) {
						fnProductShow();
					} else {
						fnProductHid();
					}
				})
			})();
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
	
	
	function allCanvas() {	
		if ( $body.hasClass('home') ) {
			drawLogo('logo');
			
			hat.init({now:'loadedData',last:'loadingData'},{time:700});
			shoes.init({now:'loadedData',last:'loadingData'},{onOff:true,time:700});
		} else if ($body.hasClass('works')) {
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
					$(document.body).removeClass('loaded').addClass('loading');
					setTimeout(function(){
						openWin(className);
					},700)
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
	}
	
})()



