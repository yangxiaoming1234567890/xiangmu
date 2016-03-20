/**
 * Created by acer on 2016/3/12.
 */
var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;//设备的宽
var winH = document.documentElement.clientHeight;//设备的高
var desW = 640;//设计稿的宽
var desH = 960;//设计稿的高
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";//main虽然缩放了但是宽高还是不变
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
//实现上下滑动的效果
[].forEach.call(oLis,function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});
function start(e) {
    this.touchstart = e.changedTouches[0].pageX;
}
function move(e) {
    moveTouch = e.changedTouches[0].pageY;
    var pos = moveTouch - this.touchstart;
    var index = this.index;
    this.flag=true;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=index){
            arguments[0].style.display="none";
        }
        arguments[0].className="";
        arguments[0].firstElementChild.id="";
    });
    if (pos > 0) {//获得的是上一张图片
        var duration = -winH + pos;
        this.prevsIndex = (index == 0 ? oLis.length - 1 : index - 1);
        oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)"
        oLis[this.prevsIndex].className = "zIndex";
    } else if (pos < 0) {//获得的是下一张图片
        this.prevsIndex = (index == oLis.length - 1 ? 0 : index + 1);
        var duration = winH + pos
    }
    oLis[this.prevsIndex].style.display="block";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";
    oLis[this.prevsIndex].className = "zIndex";
    oLis[index].style.webkitTransform="scale("+(1-Math.abs(pos)/winH*1/2)+")translate(0,"+pos+"px)";
}
function end(e) {
    if(this.flag){
        oLis[this.prevsIndex].style.webkitTransform="translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition="1.5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition="";
            this.firstElementChild.id="a"+this.index;
        },false)
    }
}
document.addEventListener("touchmove",function(){

})