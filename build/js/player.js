var PlayerModel = function() {
    this.x = this.targetX = 50;
    this.y = 200;
    this.moveSpeed = 10;
    this.moveDirection = "none";
    this.positionIndex = 0;
    
    new PlayerView(this);

    this.moveToPosition = function(newPosition, callback, callbackArgs) {
        if(this.x < newPosition) this.moveDirection = "right";
        if(this.x > newPosition) this.moveDirection = "left";
        this.targetX = newPosition;
        this.destinationReachedCallback = callback;
        this.destinationReachedCallbackArgs = callbackArgs;
        this.positionIndex = callbackArgs;
    }
    
    this.moveUpstairs = function(callback) {
        this.destinationReachedCallback = callback;
        this.moveDirection = "up";
    }
    
    this.reset = function() {
        this.x = 50;
        this.y = 200;
        this.positionIndex = 0;
        this.moveDirection = "none";
    }
};

var PlayerView = function(model) {
    this.model = model;
    this.imgObj = new Image();
    this.imgObj.src = globalAnimData.player.run.filename;
    this.animIndex = 3;
    this.runFrames = globalAnimData.player.run.right.frames;
    console.log(this.runFrames);
    this.render = function() {
        var ctx = game.view.context;
        
        if(this.model.moveDirection == "right") {
            if(this.model.x < this.model.targetX) {
                this.model.x += this.model.moveSpeed;
                this.runFrames = globalAnimData.player.run.right.frames;
                this.animIndex = (this.animIndex + 0.5) % (this.runFrames.length - 1);
            } else {
                this.model.moveDirection = "none";
                this.animIndex = 3;
                this.model.destinationReachedCallback(this.model.destinationReachedCallbackArgs);
            }
        } else if(this.model.moveDirection == "left") {
            if(this.model.x > this.model.targetX) {
                this.model.x -= this.model.moveSpeed;
                this.runFrames = globalAnimData.player.run.left.frames;
                this.animIndex = (this.animIndex + 0.5) % (this.runFrames.length - 1);
            } else {
                this.model.moveDirection = "none";
                this.animIndex = 3;
                this.model.destinationReachedCallback(this.model.destinationReachedCallbackArgs);
            }
        } else if (this.model.moveDirection == "up") {
            if (this.model.y > 0) {
                this.model.y -= this.model.moveSpeed;
            } else {
                this.model.destinationReachedCallback();
            }
        } else {
            // no movement
        }
        var currentFrame = this.runFrames[Math.ceil(this.animIndex)];
        
        ctx.drawImage(this.imgObj, currentFrame.x, currentFrame.y, currentFrame.w, currentFrame.h, game.view.levelX + this.model.x - currentFrame.w/2, game.view.levelY + this.model.y - currentFrame.h, currentFrame.w, currentFrame.h);
    }
};