function GameController(gameModel) {
    this.initialise(gameModel);
}
    
GameController.prototype.initialise = function(gameModel) {
    console.log("GameController::initialise");
    
    LateRunner.directions = {
        RIGHT: 1,
        STILL: 0,
        LEFT: -1
    };
    
    LateRunner.touchRadius = 42;
    
    LateRunner.gameOffset = new Vector(0, 0);
    
    var canvas = document.getElementById("gameCanvas");
    this.context = canvas.getContext('2d');
    
    this.setupGameModel(gameModel);
    
    this.gameLoop();
    
}

GameController.prototype.onModelsReady = function() {
    LateRunner.randomLevelFactory = new RandomLevelFactory(this.gameModel, 1);
    LateRunner.resizeController = new ResizeController(this.gameModel);
    LateRunner.playerController = new PlayerController(this.gameModel);
    LateRunner.userInputController = new UserInputController(this.gameModel);
    LateRunner.doorAndSwitchController = new DoorAndSwitchController(this.gameModel);
    LateRunner.levelChangeController = new LevelChangeController(this.gameModel);
    LateRunner.events.trigger("modelsReady");
}

GameController.prototype.setupGameModel = function(gameModel) {
    console.log("GameController::setupGameModel");
    gameModel.touchRadius = 42;
//    gameModel.levels = ModelFactory.createLevels(LateRunner.LevelData);
//    gameModel.levels = ModelFactory.createLevels(this.randomLevelFactory.generateLevels());
    gameModel.currentLevelIndex = 0;
    
    this.gameModel = gameModel;
    
    this.onModelsReady();
}

GameController.prototype.setupGameViews = function() {
    this.gameModel.currentLevel = this.gameModel.levels[this.gameModel.currentLevelIndex];
    console.log(this.gameModel);
    
    LateRunner.backgroundColour = rgbObjToHexColourString({r:17, g:17, b:17});
    new LevelView(this.gameModel.currentLevel, this.context);
    new StairsView(this.gameModel.currentLevel.stairs, this.context);
    this.setupSwitchViews();
    new PlayerView(this.gameModel.player, this.context);
    this.setupDoorViews();
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
    this.context.clearRect(0, 0, this.gameModel.width, this.gameModel.height);
    if(this.gameModel.levelTransitioningOut) {
        LateRunner.levelChangeController.transitionGameOut();
    } else if (this.gameModel.levelTransitioningIn) {
        LateRunner.levelChangeController.transitionGameIn();
    }
    LateRunner.playerController.update();
    LateRunner.events.trigger('render');
    window.requestAnimFrame((this.gameLoop).bind(this), this);
};