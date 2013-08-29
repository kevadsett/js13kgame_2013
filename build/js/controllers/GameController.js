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
    this.setupGameViews();
    
    this.resizeController = new ResizeController(gameModel);
    this.resizeController.resizeGame();
    
    this.playerController = new PlayerController(gameModel);
    this.userInputController = new UserInputController(gameModel);
    this.doorAndSwitchController = new DoorAndSwitchController(gameModel);
    this.levelChangeController = new LevelChangeController(gameModel);
    
    this.gameLoop();
    
}

GameController.prototype.setupGameModel = function(gameModel) {
    console.log("GameController::setupGameModel");
    gameModel.touchRadius = 42;
//    gameModel.levels = ModelFactory.createLevels(LateRunner.LevelData);
    gameModel.levels = RandomLevelFactory.generateLevels(30);
    gameModel.currentLevelIndex = 0;
    gameModel.currentLevel = gameModel.levels[gameModel.currentLevelIndex];
    gameModel.player = new PlayerModel();
    this.gameModel = gameModel;
}

GameController.prototype.setupGameViews = function() {
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
        this.levelChangeController.transitionGameOut();
    } else if (this.gameModel.levelTransitioningIn) {
        this.levelChangeController.transitionGameIn();
    }
    this.playerController.update();
    LateRunner.events.trigger('render');
    window.requestAnimFrame((this.gameLoop).bind(this), this);
};