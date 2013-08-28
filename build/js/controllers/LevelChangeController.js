function LevelChangeController(model) {
    this.model = model;
    LateRunner.events.on('stairsReached', this.startNextLevel, this);
    console.log(this);
}

LevelChangeController.prototype.startNextLevel = function() {
    if(this.model.currentLevelIndex + 1 < this.model.levels.length) {
        this.model.currentLevelIndex++;
        this.model.currentLevel = this.model.levels[this.model.currentLevelIndex];
        LateRunner.events.trigger('destroyViews');
        LateRunner.game.setupGameViews()
        LateRunner.game.resizeController.resizeGame()
        LateRunner.game.playerController.resetPosition();
    }
}