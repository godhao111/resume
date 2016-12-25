(function(){
	function TabImg(id) {
		this.obj = document.getElementById(id);
		this.index = 0;
		this.timer = null;
		this.subCode = null;
		this.width = this.obj.clientWidth;
		this.settings = {
			data: [],
			imgParObj: null,
			subTag: 'i',
			subParCode: null,
			nextBtn: null,
			prevBtn: null,
			callBack: function(){}
		}
	}
	TabImg.prototype.init = function (json) {
		this.settings = tools.extend(this.settings,json);
		this.randerSubCode();
		this.settings.subParCode && this.fnSubCode();
		this.settings.nextBtn && this.nextPrevBtn();
		this.setTime();
		this.overOutPar();
		this.touchMove();
		this.settings.callBack();
		
		this.imgs = this.settings.imgParObj.getElementsByTagName('img');
	}
	TabImg.prototype.touchMove = function () {
		var startX = 0;
		var disX = 0;
		var num = 0;
		var _this = this;
		this.settings.imgParObj.addEventListener('touchstart',function(ev){
			var touchs = ev.touches[0];
			startX = touchs.pageX;
			clearInterval(_this.timer)
		});
		this.settings.imgParObj.addEventListener('touchmove',function(ev){
			var touchs = ev.touches[0];
			disX = touchs.pageX - startX;
			if ( disX>0 ) {
				num = _this.index -1;
				num = num<0? _this.settings.data.length-1: num;
				
				_this.imgs[1].src = _this.settings.data[_this.index];
				
				_this.imgs[0].src = _this.settings.data[num];
				move.css(_this.settings.imgParObj,'translateX',-_this.width+disX);
			
			} else if ( disX<0 ) {
				num = _this.index +1;
				num %= _this.settings.data.length;
				
				_this.imgs[0].src = _this.settings.data[_this.index];
				
				_this.imgs[1].src = _this.settings.data[num];
				move.css(_this.settings.imgParObj,'translateX',disX);
			}
		});
		this.settings.imgParObj.addEventListener('touchend',function(){
			if ( Math.abs(disX) >= _this.width/3 ) {
				disX>0? move.mTween(_this.settings.imgParObj,{'translateX': 0},400,'linear'):
					move.mTween(_this.settings.imgParObj,{'translateX': -_this.width},400,'linear');
				_this.index = num;
			} else {
				disX>0? move.mTween(_this.settings.imgParObj,{'translateX': -_this.width},400,'linear'):
					move.mTween(_this.settings.imgParObj,{'translateX': 0},400,'linear');
			}
		});
		
	}
	TabImg.prototype.overOutPar = function () {
		var _this = this;
		this.obj.addEventListener('mouseenter',function(){
			clearInterval(_this.timer);
		});
		this.obj.addEventListener('mouseleave',function(){
			clearInterval(_this.timer);
			_this.timer = setInterval(function(){
				_this.nextBtn();
			},1600)
		});
	}
	TabImg.prototype.setTime = function () {
		var _this = this;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			_this.nextBtn();
		},1600)
	}
	TabImg.prototype.fnSubCode = function () {
		var _this = this;
		for ( var i=0; i<this.subCode.length; i++ ) {
			this.subCode[i].addEventListener('click',function(){
				var activeObj = tools.getByClass('active',_this.settings.subParCode)[0];
				if ( activeObj.index > this.index ) {
					_this.prevBtn(this.index);
				} else if (activeObj.index < this.index ) {
					_this.nextBtn(this.index);
				}
			})
		}
	}
	TabImg.prototype.nextPrevBtn = function () {
		var _this = this;
		this.settings.nextBtn.addEventListener('click',function(){
			_this.nextBtn();
		})
		this.settings.prevBtn.addEventListener('click',function(){
			_this.prevBtn();
		})
	}
	TabImg.prototype.nextBtn = function (num) {
		num = typeof(num) === 'undefined'? this.index +1: num;
		num %= this.settings.data.length;
		
		move.css(this.settings.imgParObj,'translateX',0);
		this.imgs[0].src = this.settings.data[this.index];
		
		this.subCodeClear(num);
		this.imgs[1].src = this.settings.data[num];
		move.mTween(this.settings.imgParObj,{'translateX': -this.width},400,'linear');
		this.index = num;
	}
	TabImg.prototype.prevBtn = function (num) {
		num = typeof(num) === 'undefined'? this.index -1: num;
		num = num<0? this.settings.data.length-1: num;
		
		move.css(this.settings.imgParObj,'translateX',-this.width);
		this.imgs[1].src = this.settings.data[this.index];
		
		this.subCodeClear(num);
		this.imgs[0].src = this.settings.data[num];
		move.mTween(this.settings.imgParObj,{'translateX': 0},400,'linear');
		this.index = num;
	}
	TabImg.prototype.imgTab = function () {
		
	}
	
	TabImg.prototype.subCodeClear = function (num) {
		for ( var i=0; i<this.subCode.length; i++ ) {
			tools.rmClass(this.subCode[i],'active');
		}
		tools.addClass(this.subCode[num],'active');
	}
	
	TabImg.prototype.randerSubCode = function () {
		
		this.subCode = this.settings.subParCode.getElementsByTagName(this.settings.subTag);
		for ( var i=0; i<this.settings.data.length; i++ ) {
			var tag = document.createElement(this.settings.subTag);
			tag.index = i;
			if ( i === this.index ) {
				tag.className = 'active';
			}
			this.settings.subParCode.appendChild(tag);
		}
	}
	
	
	var $tabHome = $('#home');
	var imgTab = new TabImg('home');
	
	imgTab.init({
		data: ['img/16.jpg','img/17.jpg','img/18.jpg','img/3.jpg','img/4.jpg'],
		imgParObj: $tabHome.find('.productList')[0],
		subParCode: $tabHome.find('.subCode')[0],
		nextBtn: $tabHome.find('.next')[0],
		prevBtn: $tabHome.find('.prev')[0]
	})
})()
