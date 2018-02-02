export {
  getCookie,
  wheel,
  isClass,
  DelCookie,
  wSocket,
  Tippop
}
import Vue from 'vue'

function getCookie(name) {
  var arr = document.cookie;
  var reg = new RegExp(name + "=(.*?)(;|$)");
  var args = arr.match(reg);
  if (args !== null) return JSON.parse(args[1]);
  return null;
}

function DelCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
  var cval = getCookie(name);
  document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() + ";path=/";
}

// 滑动
function wheel(dom, childDom, fn) {
  if (window.addEventListener) {
    dom.addEventListener('DOMMouseScroll', function(e) {
      scroll(e, dom, fn)
    }, false);
    dom.addEventListener('mousewheel', function(e) {
      scroll(e, dom, fn)
    }, false);
  } else if (window.attachEvent) {
    dom.attachEvent('onmousewheel', function(e) {
      scroll(e, dom, fn)
    });
  }
  var scroll = function(ev, obj, fn) {
    var ev = ev || window.event;
    var type = ev.type;
    var down;
    if (type == 'DOMMouseScroll' || type == 'mousewheel') {
      down = (ev.wheelDelta) ? ev.wheelDelta / 120 : -(ev.detail || 0) / 3;
    }
    if (down < 0) {
      var scrollTop = obj.scrollTop;
      var clientHeight = obj.clientHeight;
      var scrollHeight = obj.scrollHeight;
      var childHeight = childDom.clientHeight;
      if (childHeight >= clientHeight) {
        if (scrollTop + clientHeight === scrollHeight) {
          (fn)()
        }
      }
    }
  }
}

//	判断元素中是否有某个类
function isClass(obj, val) {
  var classNm = obj.className.split(" ");
  var n = 0;
  for (var i = 0; i < classNm.length; i++) {
    if (classNm[i] === val) {
      n++;
    }
  };
  if (n > 0) {
    return true;
  } else {
    return false;
  }
}
// 弹框动画
function Tippop(el, height) {
  if (typeof el == 'object') {
    this.el = el
  } else if (typeof el == 'string') {
    this.el = document.getElementById(el);
  } else {
    return
  }
  this.height = height || 0;
  this.elHeight = parseInt(this.el.style.height);
  if (this.elHeight == 0) {
    this.el.style.display = "block";
    var show = setInterval(this.changeHeight('up'), 2);
  } else {
    var hide = setInterval(this.changeHeight('down'), 2);
  }

  this.changeHeight = function(str) {
    if (str == "up") { //如果这个参数是UP
      if (this.elHeight <= this.height) { //如果转化为数值的高度小于等于100
        this.el.style.height = (this.elHeight + 4).toString() + "px"; //高度增加4个象素
      } else {
        clearInterval(show); //否则就取消这个函数调用,意思就是如果高度超过100象度了,就不再增长了
      }
    }
    if (str == "down") {
      if (this.elHeight >= 4) { //如果这个参数是down
        this.el.style.height = (this.elHeight - 4).toString() + "px"; //那么窗口的高度减少4个象素
      } else { //否则
        clearInterval(hide); //否则就取消这个函数调用,意思就是如果高度小于4个象度的时候,就不再减了
        this.el.style.display = "none"; //因为窗口有边框,所以还是可以看见1~2象素没缩进去,这时候就把DIV隐藏掉
      }
    }
  }
}
// 获取请求参数

// // get 请求
// function httpGet(url,fn){
// 	Vue.http.get(url,{emulateJSON:true}).then(fn,function(){
// 		alert("网络异常")
// 	})
// }
// // post 请求
// function httpPost(url,data,fn){
// 	Vue.http.post(url,data,{emulateJSON:true}).then(fn,function(){
// 		alert("网络异常")
// 	})
// }
// // put 请求
// function httpPut(url,data,fn){
// 	Vue.http.put(url,data,{emulateJSON:true}).then(fn,function(){
// 		alert("网络异常")
// 	})
// }
// // delete 请求
// function httpDelete(url,fn){
// 	Vue.http.delete(url).then(fn,function(){
// 		alert("网络异常")
// 	})
// }
