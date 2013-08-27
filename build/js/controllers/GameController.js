function GameController(gameModel) {
    this.initialise(gameModel);
}
    
GameController.prototype.initialise = function(gameModel) {
    console.log("GameController::initialise");
    this.resizeController = new ResizeController(gameModel);
    
    var canvas = document.getElementById("gameCanvas");
    this.context = canvas.getContext('2d');
    this.setupGameModel(gameModel);
    this.setupGameViews();
    this.resizeController.resizeGame();
    this.gameLoop();
    
}

GameController.prototype.setupGameModel = function(gameModel) {
    console.log("GameController::setupGameModel");
    gameModel.touchRadius = 42;
    gameModel.levels = ModelFactory.createLevels(LateRunner.LevelData);
    gameModel.currentLevel = gameModel.levels[0];
    gameModel.player = new PlayerModel();
    this.gameModel = gameModel;
}

GameController.prototype.setupGameViews = function() {
    LateRunner.backgroundColour = rgbObjToHexColourString({r:17, g:17, b:17});
    new LevelView(this.gameModel.currentLevel, this.context);
    this.setupDoorViews();
    this.setupSwitchViews();
    new StairsView(this.gameModel.currentLevel.stairs, this.context);
}

GameController.prototype.setupDoorViews = function() {
    for(var i = 0; i < this.gameModel.currentLevel.doors.length; i++) {
        new DoorView(this.gameModel.currentLevel.doors[i], this.context);
    }
}

GameController.prototype.setupSwitchViews = function() {
    for(var i = 0; i < this.gameModel.currentLevel.switches.length; i++) {
        new SwitchView(this.gameModel.currentLevel.switches[i], this.context);
    }
}

GameController.prototype.gameLoop = function() { 
    window.requestAnimFrame((this.gameLoop).bind(this), this);
    LateRunner.events.trigger('render');
};