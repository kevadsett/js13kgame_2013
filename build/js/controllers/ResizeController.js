function ResizeController(gameModel) {
    this.gameModel = gameModel;
}

ResizeController.prototype.resizeGame = function() {
    console.log("ResizeController::resizeGame");
    var canvas = document.getElementById("gameCanvas"),
        container = document.getElementById("canvasContainer");
    canvas.width = container.clientWidth;
    canvas.height = canvas.width / 3.85;
    container.style.marginTop = -canvas.height / 2;
    container.style.marginLeft = -canvas.width / 2;

    this.gameModel.prevWidth = this.gameModel.width;
    this.gameModel.prevHeight = this.gameModel.height;
    this.gameModel.height = this.gameModel.currentLevel.height = canvas.height;
    this.gameModel.width = this.gameModel.currentLevel.width = canvas.width;
    this.gameModel.pixelSize = this.gameModel.currentLevel.pixelSize = canvas.height * 0.02;
    this.gameModel.sizeMultiple = mapValue(this.gameModel.pixelSize, 0, 4, 0, 1);
    this.resizeLevel(this.gameModel.width, this.gameModel.height);
    this.resizePlayer(this.gameModel.width, this.gameModel.height);
};

ResizeController.prototype.resizeLevel = function(newGameWidth, newGameHeight) {
    console.log("ResizeController::resizeLevel(" + newGameWidth + ", " + newGameHeight + ")");
    var level = this.gameModel.currentLevel,
        switchesAt = new Array(level.doors.length);
    level.width = newGameWidth  ;
    level.height = newGameHeight;

    for (i = 0; i < level.doors.length; i++) {
        level.doors[i].position = new Vector(mapValue(i+1, 0, level.doors.length+1, newGameWidth/7.7, newGameWidth), 0);
    };
    
    /*level.switchPositions = [];
    
    for(i = 0; i < level.doors.length; i++) {
        switchesAt[i] = [];
    };
    for (i = 0; i < level.switches.length; i++) {
        switchesAt[level.switches[i].position].push(level.switches[i]);
        switchPos = (newGameWidth/14 * switchesAt[level.switches[i].position].length);
        level.switchPositions.push(level.doorPositions[level.switches[i].position] - switchPos);
    };*/
}

ResizeController.prototype.resizePlayer = function(newGameWidth, newGameHeight) {
    console.log("ResizeController::resizePlayer(" + newGameWidth + ", " + newGameHeight + ")");
    var player = this.gameModel.player;
}