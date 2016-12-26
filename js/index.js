var data = ['img/16.jpg','img/17.jpg','img/18.jpg','img/3.jpg','img/4.jpg'];
(function(){
	var num = 0;
	$(data).each(function(i,e){
		var $img = $('<img src="'+e+'"/>');
		$img.off().on('load',function(){
			num ++;
			if ( num === data.length ) {
				
				$(document.body).removeClass('loading').addClass('loaded');
				setTimeout(setSquareHeight,800);
			}
		})
	})
	
	
	//轮播图开始
	var $tabHome = $('#home');
	var imgTab = new TabImg('home');
	
	imgTab.init({
		data: ['img/16.jpg','img/17.jpg','img/18.jpg','img/3.jpg','img/4.jpg'],
		imgParObj: $tabHome.find('.productList')[0],
		subParCode: $tabHome.find('.subCode')[0],
		nextBtn: $tabHome.find('.next')[0],
		prevBtn: $tabHome.find('.prev')[0],
		callBack: fnProductHid
	})
	//轮播图结束
	
	//canvas动画设置开始
	drawLogo('logo');
	
	var hat = new drawHat('hat',move.css($('#logo')[0],'height')/2+30);
	hat.init({now:'loadedData',last:'loadingData'},{time:700});
	var shoesTop = window.innerHeight - $('#navConvas').offset().top - $('#navConvas').outerHeight()/2;
	var shoes = new drawHat('shoes',shoesTop);
	shoes.init({now:'loadedData',last:'loadingData'},{onOff:true,time:700});
	
	drawNav('navConvas');
	//canvas动画设置结束
	
	
	
	//点击图片，弹出详情框
	fnProductList()
	
	
	//点击导航,导航旋转
	function navRound(id) {
		var nav = document.getElementById(id);
		
	}
	
	
	
	//点击图片，弹出详情框
	function fnProductList() {
		var $productList = $('#home').find('.productList');
		$productList[0].onOff = true;
		$productList.on('click',function(ev){
			if ( $productList[0].onOff ) {
				fnProductShow();
			} else {
				fnProductHid();
			}
		})
	}
	
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
	
	
})()



