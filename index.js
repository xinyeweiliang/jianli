var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;  //设备宽度
var winH = document.documentElement.clientHeight; //设备高度
var desW = 640; var desH = 960;

//适配
//设备的宽/设备的高<设计稿宽/设计稿高 按照高来缩放 ->把设计稿的高缩小到设备的高
if(winW / winH <= desW / desH){
	main.style.webkitTransform = "scale("+ winH / desH +")"; //main虽然缩放了，但是宽高不变还是640和960
}else{
	main.style.webkitTransform = "scale("+ winW / desW +")";
}

//第二步实现上下滑动的效果
[].forEach.call(oLis,function(){
	var oLi = arguments[0];
	oLi.index = arguments[1];
	oLi.addEventListener("touchstart", start, false);
	oLi.addEventListener("touchmove", move, false);
	oLi.addEventListener("touchend", end, false);

})

function start(e){
	this.startTouch = e.changedTouches[0].pageY;
}
function move(e){
	this.flag = true;
	var moveTouch = e.changedTouches[0].pageY;
	var pos = moveTouch - this.startTouch;
	var index = this.index;
	[].forEach.call(oLis,function(){
		if(arguments[1]!=index){
			arguments[0].style.display = "none";
		}
		arguments[0].className = "";
		arguments[0].firstElementChild.id = "";
	})
	if(pos>0){
		this.prevSIndex = (index == 0 ? oLis.length-1 : index-1);
		var duration = -winH+pos;
	}else if(pos){
		this.prevSIndex = (index == oLis.length-1 ? 0 : index+1);
		var duration = winH+pos;

	}
	oLis[this.prevSIndex].style.display = "block";
	oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+duration+"px)";
	oLis[this.prevSIndex].className = "zIndex";
	oLis[index].style.webkitTransform = "scale("+(1-Math.abs(pos)/winH*1/2)+") translate(0,"+pos+"px)";
}
function end(e){
	if(this.flag){
		oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
		oLis[this.prevSIndex].style.webkitTransition = "0.7s";
		oLis[this.prevSIndex].addEventListener("webkitTransitionEnd",function(){
			this.style.webkitTransition = "";
			this.firstElementChild.id="a"+this.index;
		},false)
		if($('ul li').eq(1).hasClass('zIndex')){
			$('ul li').eq(1).children('div').addClass('fadeInUp');
		}
		if($('ul li').eq(3).hasClass('zIndex')){
			$('ul li').eq(3).children('div').addClass('fadeIn');
		}
		if($('ul li').eq(2).hasClass('zIndex')){
			$('ul li').eq(2).children('div').children('img').addClass(' animated fadeInLeft');
		}

	}
}
document.addEventListener("touchmove",function(){});