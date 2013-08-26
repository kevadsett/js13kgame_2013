var PlayerModel = function() {
    console.log("PlayerModel::Constructor");
    var canvas = document.getElementById('gameCanvas');
    this.x = -canvas.width/14;
    this.targetX = canvas.width / 14;
    this.moveDirection = "right";
    this.y = canvas.height;
    this.positionIndex = 0;
    this.destinationReachedCallback = null;
    this.destinationReachedCallbackArgs = null;
    
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
        console.log("PlayerView::reset");
        console.log(game.view.width);
        this.x = -game.view.width/14;
        this.targetX = -game.view.width / 14;
        this.moveDirection = "right";
        this.y = -game.view.height;
        this.positionIndex = 0;
        this.destinationReachedCallback = null;
        this.destinationReachedCallbackArgs = null;
    }
},
PlayerView = function(model) {
    this.model = model;
    this.imgObj = new Image();
    this.imgObj.src = globalAnimData.player.run.filename;
    this.animIndex = 3;
    this.runFrames = globalAnimData.player.run.right.frames;
    console.log(this.runFrames);
    this.render = function(startX, startY) {
        var ctx = game.view.context,
            currentFrame;
        
        if(this.model.moveDirection == "right") {
            if(this.model.x < this.model.targetX) {
                this.model.x += this.model.moveSpeed;
                this.runFrames = globalAnimData.player.run.right.frames;
                this.animIndex = (this.animIndex + 0.5) % (this.runFrames.length - 1);
            } else {
                this.model.moveDirection = "none";
                this.animIndex = 3;
                if(this.model.destinationReachedCallback) this.model.destinationReachedCallback(this.model.destinationReachedCallbackArgs);
            }
        } else if(this.model.moveDirection == "left") {
            if(this.model.x > this.model.targetX) {
                this.model.x -= this.model.moveSpeed;
                this.runFrames = globalAnimData.player.run.left.frames;
                this.animIndex = (this.animIndex + 0.5) % (this.runFrames.length - 1);
            } else {
                this.model.moveDirection = "none";
                this.animIndex = 3;
                if(this.model.destinationReachedCallback) this.model.destinationReachedCallback(this.model.destinationReachedCallbackArgs);
            }
        } else if (this.model.moveDirection == "up") {
            if (this.model.y > 0) {
                this.model.y -= this.model.moveSpeed;
            } else {
                if(this.model.destinationReachedCallback) this.model.destinationReachedCallback();
            }
        } else {
            // no movement
        }
        currentFrame = this.runFrames[Math.ceil(this.animIndex)];
        
        if(!game.transitioning) ctx.drawImage(this.imgObj, currentFrame.x, currentFrame.y, currentFrame.w, currentFrame.h, startX + this.model.x - currentFrame.w/2 * game.view.sizeMultiple, startY + this.model.y - currentFrame.h * game.view.sizeMultiple, currentFrame.w * game.view.sizeMultiple, currentFrame.h * game.view.sizeMultiple);
    };
    
    this.resize = function() {
        this.model.x = mapValue(this.model.x, 0, game.view.prevWidth, 0, game.view.width);
        this.model.y = game.view.height;
        this.model.moveSpeed = 10 * game.view.sizeMultiple;
        console.log(this.model.x, this.model.y);
    };
};