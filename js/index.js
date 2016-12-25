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
	
	
	fnProductList()
	//点击图片，弹出详情框
	function fnProductList() {
		var onOff = true;
		
		$('#home').find('.productList').on('click',function(ev){
			if ( onOff ) {
				$('#hint').css({
					'transition': 'all .5s',
					'-webkit-transition': 'all .5s',
					'opacity': '1',
					'width':$('#hint').prop('width'),
					'height':$('#hint').prop('width'),
					'top': $('#hint').prop('top')
				});
			} else {
				$('#hint').css({
					'width':'0',
					'height':'0',
					'top': '40%',
					'opacity': '0'
				});
			}
			
			onOff = !onOff;
		})
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



