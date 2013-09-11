function LevelChangeController(model) {
    this.model = model;
    LateRunner.events.on('stairsReached', this.startLevelTransitionOut, this);
}

LevelChangeController.prototype.startLevel = function(newLevelIndex) {
    this.model.currentLevelIndex = newLevelIndex;
    this.model.currentLevel = this.model.levels[this.model.currentLevelIndex];
    LateRunner.events.trigger('destroyViews');
    LateRunner.game.setupGameViews()
    LateRunner.resizeController.resizeGame()
    LateRunner.playerController.resetPosition();
    LateRunner.doorAndSwitchController.resetDoors();
}

LevelChangeController.prototype.startLevelTransitionOut = function() {
    this.model.levelTransitioningOut = true;
}

LevelChangeController.prototype.startLevelTransitionIn = function() {
    LateRunner.gameOffset.y = -this.model.height;
    this.model.levelTransitioningIn = true;
    this.model.levelTransitioningOut = false;
}

LevelChangeController.prototype.transitionGameOut = function() {
    if(LateRunner.gameOffset.y < this.model.height) {
        LateRunner.gameOffset.y += this.model.levelTransitionSpeed;
    } else {
        if(this.model.currentLevelIndex + 1 < this.model.levels.length) this.startLevel(this.model.currentLevelIndex+1);
        this.startLevelTransitionIn();
    }
}

LevelChangeController.prototype.transitionGameIn = function() {
    if(LateRunner.gameOffset.y < 0) {
        LateRunner.gameOffset.y += this.model.levelTransitionSpeed;
    } else {
        LateRunner.gameOffset.y = 0;
        LateRunner.events.trigger('levelStarted');
    }
}
