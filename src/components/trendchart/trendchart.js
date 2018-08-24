var commonTrendLine; //走势图直线
//绘制走抛图
function drawTrend() {
  var x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0;
  //创建canvas面板
  createCanvas(document.getElementById("lotteryTrendArea"));
  //获取位数
  var trendLineNum = document.getElementsByClassName('trendLine').length;
  for (var a = 1; a <= trendLineNum; a++) {
    //获取显示期数总条数
    var trendBallList = document.getElementsByClassName('trendBall-' + a);
    for (var i = 0; i < trendBallList.length; i++) {
      //计算坐标的起始位置，并处于元素中心
      var w1 = trendBallList[i].clientWidth;
      var h1 = trendBallList[i].clientHeight;
      x1 = trendBallList[i].offsetLeft + w1 / 2;
      y1 = trendBallList[i].offsetTop + h1 / 2;
      if (i + 1 < trendBallList.length) {
        var w2 = trendBallList[i + 1].clientWidth;
        var h2 = trendBallList[i + 1].clientHeight;
        x2 = trendBallList[i + 1].offsetLeft + w2 / 2;
        y2 = trendBallList[i + 1].offsetTop + h2 / 2;
      }
      //开始绘制走势
      commonLine(x1, y1, x2, y2);
      x1 = x2;
      y1 = y2;
    }
  }
};
//常用浏览器走势图-非IE
function commonLine(x1, y1, x2, y2) {
  commonTrendLine.beginPath();
  commonTrendLine.moveTo(x1, y1);
  commonTrendLine.lineTo(x2, y2);
  commonTrendLine.closePath();
  commonTrendLine.stroke();
  commonTrendLine.restore();
};
//创建canvas区域
function createCanvas(ele) {
  var w = ele.clientWidth;
  var h = ele.clientHeight;
  var oCanvas = document.createElement('canvas');
  oCanvas.id = 'lotteryTrendCanvas';
  oCanvas.className = 'lotteryTrendCanvas';
  oCanvas.width = w;
  oCanvas.height = h;
  commonTrendLine = oCanvas.getContext('2d');
  commonTrendLine.strokeStyle = 'red';
  commonTrendLine.lineWidth = 2;
  ele.append(oCanvas);
};
//期数切换，清除画布
function clearCanvas() {
  var tagElements = document.getElementById("lotteryTrendCanvas");
  var w = document.getElementById("lotteryTrendArea").clientWidth;
  var h = document.getElementById("lotteryTrendArea").clientHeight;
  var cxt = document.getElementById("lotteryTrendCanvas").getContext("2d");
  cxt.clearRect(0, 0, w, h);
  tagElements.parentNode.removeChild(tagElements);
}

//走势显示隐藏
function trendLineCheck(item) {
  var dom = document.getElementById("lotteryTrendCanvas");
  if (item === false) {
    dom.style.display = 'none';
  } else {
    dom.style.display = 'block';
  }
}

export {
  drawTrend,
  clearCanvas,
  trendLineCheck
}
