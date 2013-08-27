function PlayerController(model) {
    this.model = model;
    this.player = model.player;
    this.resetPosition();
    this.setupAnimationFrames();
    LateRunner.events.on('moveToSwitch', this.onMoveToSwitch, this);
}

PlayerController.prototype.resetPosition = function () {
    console.log(this.model.width);
    this.player.position = new Vector(this.model.width/14 * LateRunner.sizeMultiple, this.model.height);
    console.log(this.player.position);
}

PlayerController.prototype.setupAnimationFrames = function() {
    this.player.imageObject.src = LateRunner.AnimData.player.filename;
    this.player.runFrames = {
        right: LateRunner.AnimData.player.run.right.frames,
        left: LateRunner.AnimData.player.run.left.frames,
    }
    this.player.currentFrameIndex = 0;
}

PlayerController.prototype.update = function() {
    if(this.player.moveDirection == LateRunner.directions.RIGHT) {
        if(this.player.position.x < this.player.targetX) {
            this.player.position.x += this.player.moveSpeed;
            this.player.currentFrame = this.player.runFrames.right[Math.ceil(this.player.currentFrameIndex)];
            this.player.currentFrameIndex = (this.player.currentFrameIndex + 0.5) % (this.player.runFrames.left.length - 1);
        } else {
            this.player.position.x = this.player.targetX;
            this.player.lastMoveDirection = LateRunner.directions.RIGHT;
            this.player.moveDirection = LateRunner.directions.STILL;
            LateRunner.events.trigger('switchActivated', this.player.targetSwitch);
        }
    } else if (this.player.moveDirection == LateRunner.directions.LEFT) {
        if(this.player.position.x > this.player.targetX) {
            this.player.position.x -= this.player.moveSpeed;
            this.player.currentFrame = this.player.runFrames.left[Math.ceil(this.player.currentFrameIndex)];
            this.player.currentFrameIndex = (this.player.currentFrameIndex + 0.5) % (this.player.runFrames.left.length - 1);
        } else {
            this.player.position.x = this.player.targetX;
            this.player.lastMoveDirection = LateRunner.directions.LEFT;
            this.player.moveDirection = LateRunner.directions.STILL;
            LateRunner.events.trigger('switchActivated', this.player.targetSwitch);
        }
    } else {
        if(this.player.lastMoveDirection == LateRunner.directions.RIGHT) {
            this.player.currentFrame = this.player.runFrames.right[3];
        } else if (this.player.lastMoveDirection == LateRunner.directions.LEFT) {
            this.player.currentFrame = this.player.runFrames.left[3];
        }
    }
}

PlayerController.prototype.onMoveToSwitch = function(currentSwitch) {
    this.player.targetX = currentSwitch.position.x;
    this.player.targetSwitch = currentSwitch;
    if(this.player.targetX > this.player.position.x) this.player.moveDirection = LateRunner.directions.RIGHT;
    if(this.player.targetX < this.player.position.x) this.player.moveDirection = LateRunner.directions.LEFT;
}

PlayerController.prototype.onMoveToStairs = function(stairs) {
    console.log("PlayerController::onMoveToSwitch: " + stairs);
}