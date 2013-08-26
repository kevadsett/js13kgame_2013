function GameView(model) {
    this.model = model;
    
    this.render = function() {
        LateRunner.levelView.render();
    }
}