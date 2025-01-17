'use strict';

(function() {
  var socket = new WebSocket("ws://"+window.location.hostname+":8080")
  // var socket = io('http://localhost:3000')  // var socket = io(); 改成新版 socket.io 2.0 的語法
  var canvas = document.querySelectorAll('.whiteboard')[0];
  var colors = document.querySelectorAll('.color');
  var context = canvas.getContext('2d');

  var current = {
    color: 'black'
  };
  var drawing = false;

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  /* socket.on('drawing', onDrawingEvent);
  function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }*/



  socket.onopen = function (event) {
    console.log('socket:onopen()...')
  }

  socket.onerror = function (event) {
    console.log('socket:onerror()...')
  }
  
  socket.onclose = function (event) {
    console.log('socket:onclose()...')
  }

  socket.onmessage = function(event){                //接收到對方傳來的訊息 然後我就話線
    console.log('onmessage:', event.data);
    var data = JSON.parse(event.data);
    if (data.type == 'drawing') {
      var w = canvas.width;
      var h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }
  }

  window.addEventListener('resize', onResize, false);
  onResize();

  function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    socket.send(JSON.stringify({      //傳送出去 然後到伺服器再把字串解開
      type:'drawing',
      x0: x0 / w,               //寬與高正規畫(為了讓每個人板子不同大小都能看到同一張圖)  使用到比例
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color                     
    }))
    /*
    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
    */
  }

  function onMouseDown(e){
    drawing = true;
    current.x = e.clientX;
    current.y = e.clientY;
  }

  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
  }

  function onMouseMove(e){
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    current.x = e.clientX;
    current.y = e.clientY;
  }

  function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {  //滑鼠事件會發很快很多 會造成server壓力 所以throttle限制她每秒發出的移動次數
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

})();
