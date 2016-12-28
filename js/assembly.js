/*本文件目前包含两个组件: 1. 轮播图组件; 2. 鼠标轮动页面组件*/

(function(){
	/*轮播图组件
		1.构造函数中传入轮播图总父级的id
		2.配置参数: 
			1) 图片数据
			2) 图片的父级元素
			3) 下标的标签名 例: i
			4) 下标的父级元素
			5) 上一张按钮元素
			6) 下一张按钮元素
			7) 回调函数，在点击图片之后执行
	 * */
	window.TabImg = function(id) {
		this.obj = document.getElementById(id);
		this.index = 0;
		this.timer = null;
		this.subCode = null;
		this.width = document.documentElement.clientWidth || document.body.clientWidth;
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
		
		var _this = this;
		window.onresize = function () {
			_this.width = document.documentElement.clientWidth || document.body.clientWidth;
		}
		this.imgs = this.settings.imgParObj.getElementsByTagName('img');
	}
	TabImg.prototype.touchMove = function () {
		var startX = 0;
		var disX = 0;
		var num = 0;
		var _this = this;
		this.settings.imgParObj.addEventListener('touchstart',function(ev){
			var touchs = ev.changedTouches[0];
			startX = touchs.pageX;
			clearInterval(_this.timer)
		});
		this.settings.imgParObj.addEventListener('touchmove',function(ev){
			var touchs = ev.changedTouches[0];
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
				_this.settings.callBack();
				_this.nextBtn();
			},1600)
		});
	}
	TabImg.prototype.setTime = function () {
		var _this = this;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			_this.settings.callBack();
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
	
	TabImg.prototype.subCodeClear = function (num) {
		for ( var i=0; i<this.subCode.length; i++ ) {
			tools.rmClass(this.subCode[i],'active');
		}
		tools.addClass(this.subCode[num],'active');
	}
	
	TabImg.prototype.randerSubCode = function () {
		this.settings.subParCode.innerHTML = '';
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
	
	/*鼠标轮动页面组件
		1. 
	 * */
	window.Scroll = function (id) {
		this.obj = document.getElementById(id);
		this.settings = {
			wheelObj: window
		};
	}
	Scroll.prototype = {
		constructor: Scroll,
		init: function (json) {
			if (json) this.settings = extend(this.settings,json); 
			this.scrollMouse();
			this.touchMove();
		},
		scrollMouse: function () {
			var _this = this;
			this.wheel(function(upDown){
				var nowY = move.css(_this.obj,'translateY');
				nowY = upDown? nowY-15: nowY + 15;
				
				if ( -nowY>=_this.obj.scrollHeight+140-window.innerHeight ) {
					nowY = -(_this.obj.scrollHeight+140-window.innerHeight);
				} else if (nowY>=0) {
					nowY = 0;	
				}
				
				move.css(_this.obj,'translateY',nowY)
			})
		},
		wheel: function(callBack) {
			this.settings.wheelObj.addEventListener('DOMMouseScroll',fnWheel);
			this.settings.wheelObj.addEventListener('mousewheel',fnWheel);
			
			function fnWheel(ev){
				var upDown;
				if ( ev.detail ) {
					/*ev.detail: 火狐版*/
					upDown = ev.detail > 0? true: false;
				} else {
					/*ev.wheelDelta: 谷歌版*/
					upDown = ev.wheelDelta<0? true: false;
				}
				/*upDown是真就是下滚，否则就是上滚*/
				callBack(upDown);
			}
		},
		touchMove: function (callBack) {
			var _this = this;
			var disY, nowY, lastTime, disTime, lastMouse, disMouse;
			
			move.css(this.obj,'translateZ',.01);//作用：优化用3d
			
			this.obj.addEventListener('touchstart',function(ev){
				var touchs = ev.changedTouches[0];
				disTime = disMouse = 0;
				disY = touchs.pageY - move.css(_this.obj,'translateY');
			})
			this.obj.addEventListener('touchmove',function(ev){
				var touchs = ev.changedTouches[0];
				var nowTime = new Date().getTime();
				var nowMouse = touchs.pageY;
				nowY = touchs.pageY - disY;
				move.css(_this.obj,'translateY',nowY);
				disTime = nowTime - lastTime;
				lastTime = nowTime;
				disMouse = nowMouse - lastMouse;
				lastMouse = nowMouse;
			})
			this.obj.addEventListener('touchend',function(ev){
				
				var s = disMouse / disTime;
				s = (isNaN(s) || s == 0 )? 0.01: s;
				var target = parseInt(Math.abs(s*30)-3)*(Math.abs(s*10)/(s*10));
				
				nowY  = target + nowY;
				if ( nowY>=0 ) {
					nowY = 0;
				} else if (nowY<=-(this.scrollHeight+140-window.innerHeight)) {
					nowY=-(this.scrollHeight+140-window.innerHeight);
				}
				move.mTween(_this.obj,{'translateY':nowY},nowY*20,'easeOut');
				
			})
		}
	}
	
	
	function extend(obj1,obj2,onOff) {
		obj1 = obj1 || {};
		for ( var attr in obj2 ) {
			if ( obj2.hasOwnProperty(attr) ) {
				if ( typeof obj2[attr] === 'object' && onOff ) {//真: 深度克隆
					obj1[attr] = Array.isArray(obj2[attr])? []: {};
					extend(obj1[attr],obj2[attr],onOff);
				} else {
					obj1[attr] = obj2[attr];
				}
			}
		}
		return obj1;
	}
	
})()
