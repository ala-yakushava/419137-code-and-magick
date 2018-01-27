'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var barHeight = 150;

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

window.renderStatistics = function(ctx, players) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + BAR_WIDTH, CLOUD_Y + FONT_GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + BAR_WIDTH, CLOUD_Y + FONT_GAP * 2);

  for (var i = 0; i < players.length; i++) {
    //   MAX_BAR      BAR[I]
    // ----------- = --------
    //  BAR_WIDTH       X

    //  X = (BAR_WIDTH * BAR[I]) / MAX_BAR

    ctx.fillText(players[i], CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillRect(CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + BAR_WIDTH * 2, BAR_WIDTH, barHeight);
  }
};
