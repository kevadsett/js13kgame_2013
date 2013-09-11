function PlayerController(model) {
    this.model = model;
    this.player = model.player;
    this.resetPosition();
    this.setupAnimationFrames();
    LateRunner.events.on('moveToObject', this.onMoveToObject, this);
}

PlayerController.prototype.resetPosition = function () {
    this.player.position = new Vector(this.model.width/14 * LateRunner.sizeMultiple, this.model.height);
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
            this.onTargetObjectReached();
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
            this.onTargetObjectReached();
        }
    } else {
        if(this.player.lastMoveDirection == LateRunner.directions.RIGHT) {
            this.player.currentFrame = this.player.runFrames.right[3];
        } else if (this.player.lastMoveDirection == LateRunner.directions.LEFT) {
            this.player.currentFrame = this.player.runFrames.left[3];
        }
    }
}

PlayerController.prototype.onMoveToObject = function(targetObject) {
    if(LateRunner.doorAndSwitchController.doorIsClosedBetween(this.player.position, targetObject.position)) return;
    this.player.targetX = (targetObject.numberOfSteps) ? targetObject.position.x + targetObject.width/2 : targetObject.position.x;
    this.player.targetObject = targetObject;
    if(this.player.targetX > this.player.position.x) {
        this.player.moveDirection = LateRunner.directions.RIGHT;
        this.player.targetX -= this.player.currentFrame.w;
    } else if(this.player.targetX < this.player.position.x) {
        this.player.moveDirection = LateRunner.directions.LEFT;
        this.player.targetX += this.player.currentFrame.w;
    } else {
        this.onTargetObjectReached();
    }
}

PlayerController.prototype.onTargetObjectReached = function() {
    if(this.player.targetObject.numberOfSteps) {
        LateRunner.events.trigger('stairsReached');
    } else {
        LateRunner.events.trigger('switchActivated', this.player.targetObject);
    }
    this.player.targetObject = null;
}