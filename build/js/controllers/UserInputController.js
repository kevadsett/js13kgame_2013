function UserInputController(gameModel) {
    this.model = gameModel;
    document.getElementById('gameCanvas').onclick = this.onCanvasClicked.bind(this);
    document.onkeypress = this.onKeyPressed.bind(this);
}

UserInputController.prototype.onCanvasClicked = function(event){
    var canvasBounds = event.target.getBoundingClientRect(),
        clickedObject = this.getClickedObject(event.clientX - canvasBounds.left, event.clientY - canvasBounds.top);
    if(clickedObject) {
        LateRunner.events.trigger('moveToObject', clickedObject);
    }
};

UserInputController.prototype.getClickedObject = function(x, y) {
    var i, currentSwitch;
    for(var i = 0; i < this.model.currentLevel.switches.length; i++) {
        currentSwitch = this.model.currentLevel.switches[i];
        if (coordinateWasTouched(currentSwitch.position.x, currentSwitch.position.y, x, y)) {
            return currentSwitch;
        };
    };
    if (x > this.model.width - this.model.currentLevel.stairs.width) return this.model.currentLevel.stairs;
    return null;
}

UserInputController.prototype.onKeyPressed = function(event) {
    var keyCode = window.event ? event.keyCode : event.which ? event.which : null;
    if(keyCode) keyCode = String.fromCharCode(keyCode);
    switch (keyCode) {
        case "u":
            if(this.model.currentLevelIndex + 1 < this.model.levels.length) {
                LateRunner.game.levelChangeController.startLevel(this.model.currentLevelIndex + 1);
            }
        break;
        case "d":
            if(this.model.currentLevelIndex - 1 >= 0) {
                LateRunner.game.levelChangeController.startLevel(this.model.currentLevelIndex - 1);
            }
        break;
    }
}