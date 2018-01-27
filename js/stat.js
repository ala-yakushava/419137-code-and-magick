'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function(ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px, PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

window.renderStatistics = function(ctx) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  renderText(ctx, 'Ура вы победили!', 150, 30);
  renderText(ctx, 'Список результатов:', 150, 50);
};
