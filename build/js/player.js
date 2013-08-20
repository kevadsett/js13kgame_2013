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
    this.animIndex = 0;
    this.render = function() {
        var runFrames = globalAnimData.player.run.frames;
        if(this.model.moveDirection == "right") {
            if(this.model.x < this.model.targetX) {
                this.model.x += this.model.moveSpeed;
                this.animIndex = (this.animIndex + 0.5) % (runFrames.length - 1);
            } else {
                this.model.moveDirection = "none";
                this.model.destinationReachedCallback(this.model.destinationReachedCallbackArgs);
            }
        } else if(this.model.moveDirection == "left") {
            if(this.model.x > this.model.targetX) {
                this.model.x -= this.model.moveSpeed;
                this.animIndex = (this.animIndex + 0.5) % (runFrames.length - 1);
            } else {
                this.model.moveDirection = "none";
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
        var ctx = game.view.context;
        
        var currentFrame = runFrames[Math.ceil(this.animIndex)];
        ctx.drawImage(this.imgObj, currentFrame.x, currentFrame.y, currentFrame.w, currentFrame.h, this.model.x - currentFrame.w/2, this.model.y - currentFrame.h, currentFrame.w, currentFrame.h);
    }
};