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
    var container = document.getElementById("canvasContainer");
    canvas.width = container.clientWidth;
    canvas.height = canvas.width / 3.85;
    container.style.marginTop = -canvas.height / 2;
    container.style.marginLeft = -canvas.width / 2;
    game.resize();
};

function startGame(){
    window.game = new GameModel();
    game.initialiseViews();
    window.touchRadius = 42;
    resizeCanvas();
    window.onresize = window.resizeCanvas;
};