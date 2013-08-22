// shim layer with setTimeout fallback
;window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function resizeCanvas(){
    var canvas = document.getElementById("gameCanvas");
    canvas.width = document.getElementById("canvasContainer").clientWidth;
    canvas.height = canvas.width / 3.85;
    game.resize();
};

function startGame(){
    window.game = new GameModel();
    game.initialiseViews();
    window.touchRadius = 42;
    resizeCanvas();
    window.onresize = window.resizeCanvas;
};
