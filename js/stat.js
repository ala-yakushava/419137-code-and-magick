'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 20;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var BAR_GAP = 50;
  var YOURSELF = 'Вы';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderText = function (ctx, text, x, y) {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.globalAlpha = 1;
    ctx.font = '16px, PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(text, x, y);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    renderText(ctx, 'Ура вы победили!', CLOUD_X + BAR_WIDTH, CLOUD_Y + FONT_GAP);
    renderText(ctx, 'Список результатов:', CLOUD_X + BAR_WIDTH, CLOUD_Y + FONT_GAP * 2);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      if (names[i] === YOURSELF) {
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.globalAlpha = Math.random();
      }

      ctx.fillRect(CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i, BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime + CLOUD_Y + FONT_GAP * 4, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);

      renderText(ctx, names[i], CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - FONT_GAP);
      renderText(ctx, Math.round(times[i]), CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i, BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime + CLOUD_Y + FONT_GAP * 3);
    }
  };
})();
