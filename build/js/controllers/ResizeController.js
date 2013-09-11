function ResizeController(gameModel) {
    this.gameModel = gameModel;
}

ResizeController.prototype.resizeGame = function() {
    var canvas = document.getElementById("gameCanvas"),
        container = document.getElementById("canvasContainer");
    canvas.width = container.clientWidth;
    canvas.height = canvas.width / 3.85;
    container.style.marginTop = -canvas.height / 2;
    container.style.marginLeft = -canvas.width / 2;

    this.gameModel.prevWidth = this.gameModel.width || 0;
    this.gameModel.prevHeight = this.gameModel.height || 0;
    this.gameModel.height = this.gameModel.currentLevel.height = canvas.height;
    this.gameModel.width = this.gameModel.currentLevel.width = canvas.width;
    LateRunner.pixelSize = canvas.height * 0.02;
    LateRunner.sizeMultiple = mapValue(LateRunner.pixelSize, 0, 4, 0, 1);
    LateRunner.touchRadius = 42 * LateRunner.sizeMultiple;
    this.resizeLevel(this.gameModel.width, this.gameModel.height);
    this.resizePlayer(this.gameModel.width, this.gameModel.height);
    this.resizeBoss(this.gameModel.width, this.gameModel.height);
};

ResizeController.prototype.resizeLevel = function(newGameWidth, newGameHeight) {
    var level = this.gameModel.currentLevel;
    level.width = newGameWidth;
    level.height = newGameHeight;
    
    this.resizeDoors(newGameWidth, newGameHeight);
    this.resizeSwitches(newGameWidth, newGameHeight);
    this.resizeStairs(newGameWidth, newGameHeight);
    
    this.gameModel.levelTransitionSpeed = this.gameModel.originalLevelTransitionSpeed * LateRunner.sizeMultiple;
}

ResizeController.prototype.resizeDoors = function(newGameWidth, newGameHeight) {
    var level = this.gameModel.currentLevel,
        i, 
        currentDoor;
    
    for (i = 0; i < level.doors.length; i++) {
        currentDoor = level.doors[i];
        currentDoor.height = newGameHeight;
        currentDoor.width = currentDoor.openSegmentHeight = LateRunner.pixelSize * 4;
        console.log(currentDoor.position);
        console.log(this.gameModel.prevWidth);
        if(currentDoor.originalPosition) {
            currentDoor.position = new Vector(mapValue(currentDoor.originalPosition.x, 0, 770, newGameWidth/7.7, newGameWidth - newGameWidth/7.7), 0);
        } else {
            currentDoor.position = new Vector(mapValue(i+1, 0, level.doors.length+1, newGameWidth/7.7, newGameWidth - newGameWidth/7.7), 0);
        }
    };
}

ResizeController.prototype.resizeSwitches = function(newGameWidth, newGameHeight) {
    var level = this.gameModel.currentLevel,
        i, 
        currentSwitch, 
        switchesAt = new Array(level.doors.length), 
        switchPos;
    
    for(i = 0; i < level.doors.length; i++) {
        switchesAt[i] = [];
    };
    for (i = 0; i < level.switches.length; i++) {
        currentSwitch = level.switches[i];
        switchesAt[currentSwitch.doorPosition].push(currentSwitch);
        currentSwitch.radius = LateRunner.pixelSize * 2;
        switchPos = LateRunner.touchRadius * 1.5 * switchesAt[currentSwitch.doorPosition].length;
        if(currentSwitch.originalPosition) {
            currentSwitch.position = new Vector(
                mapValue(currentSwitch.originalPosition.x, 0, 770, newGameWidth/7.7, newGameWidth - newGameWidth/7.7), 
                mapValue(currentSwitch.originalPosition.y, 0, 200, 0, newGameHeight)
            );
        } else {
            currentSwitch.position = new Vector(level.doors[currentSwitch.doorPosition].position.x - switchPos, newGameHeight/2 - currentSwitch.radius);
        }
    };
}

ResizeController.prototype.resizeStairs = function(newGameWidth, newGameHeight) {
    var level = this.gameModel.currentLevel,
        stairs = level.stairs;
    stairs.stepHeight = newGameHeight / stairs.numberOfSteps;
    stairs.width = LateRunner.pixelSize * 24;
    stairs.height = newGameHeight;
    stairs.position.x = newGameWidth - stairs.width;
}

ResizeController.prototype.resizePlayer = function(newGameWidth, newGameHeight) {
    var player = this.gameModel.player;
    console.log(player.position.x, this.gameModel.prevWidth);
    player.position = new Vector(mapValue(player.position.x, 0, this.gameModel.prevWidth, 0, newGameWidth), newGameHeight);
    player.moveSpeed = player.originalMoveSpeed * LateRunner.sizeMultiple;
}

ResizeController.prototype.resizeBoss = function(newGameWidth, newGameHeight) {
    var boss = this.gameModel.boss;
    boss.position = new Vector(mapValue(600, 0, 770, 0, newGameWidth), newGameHeight);
}