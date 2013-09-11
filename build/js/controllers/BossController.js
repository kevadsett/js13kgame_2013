function BossController(model) {
    this.model = model.boss;
    LateRunner.events.on('update', this.update, this);
    LateRunner.events.on('moveToObject', this.onMoveToObject, this);
    this.setupAnimationFrames();
}

BossController.prototype.update = function() {
    if(Math.random() > 0.85) {
        this.model.currentFrameIndex = (this.model.currentFrameIndex + 1) % 2;
        this.model.currentFrame = this.model.talkFrames[this.model.currentFrameIndex];
    }
}    

BossController.prototype.setupAnimationFrames = function() {
    console.log(this.model);
    this.model.imageObject.src = LateRunner.AnimData.boss.filename;
    this.model.talkFrames = LateRunner.AnimData.boss.talk.frames;
    this.model.currentFrameIndex = 0;
    console.log(this.model.talkFrames);
    this.model.currentFrame = this.model.talkFrames[0];
}