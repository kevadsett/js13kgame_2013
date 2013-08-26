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
    this.distributeDataToModels();
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
    LateRunner.gameView = new GameView(this.gameModel);
    LateRunner.levelView = new LevelView(this.gameModel.currentLevel);
}

GameController.prototype.distributeDataToModels = function() {
    this.gameModel.context = this.gameModel.currentLevel.context = this.context;
    this.gameModel.currentLevel.pixelSize = this.gameModel.pixelSize;   
}

GameController.prototype.gameLoop = function() { 
    window.requestAnimFrame((this.gameLoop).bind(this), this);
    LateRunner.gameView.render();
};