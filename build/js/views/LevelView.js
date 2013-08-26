function LevelView(model) {
    console.log("LevelView instantiated");
    this.model = model;
}

LevelView.prototype.render = function() {
    var i;
    this.model.context.fillStyle = "#FFFFFF";
    this.model.context.fillRect(this.model.position.x, this.model.position.y, this.model.width, this.model.height);
    for (i = 0; i < this.model.numberOfStepsInStairs; i++) {
        var currentDoor,
            currentSwitch,
            stairColourR = this.model.backgroundColour.r,
            stairColourG = this.model.backgroundColour.g,
            stairColourB = this.model.backgroundColour.b,
            rectX = this.model.position.x + this.model.width - this.model.stairWidth,
            rectY = this.model.position.y + this.model.height - ((i + 1) * this.model.stairHeight);
        stairColourR = Math.ceil(mapValue(i, 0, this.model.numberOfStepsInStairs - 1, stairColourR, 255)).toString(16);
        stairColourG = Math.ceil(mapValue(i, 0, this.model.numberOfStepsInStairs - 1, stairColourG, 255)).toString(16);
        stairColourB = Math.ceil(mapValue(i, 0, this.model.numberOfStepsInStairs - 1, stairColourB, 255)).toString(16);
        this.model.context.fillStyle = "#" + stairColourR + stairColourG + stairColourB;
        this.model.context.fillRect(rectX, rectY, this.model.stairWidth, this.model.stairHeight);
    };
    this.model.context.fillStyle = this.model.backgroundColour;
    
    this.model.context.fillRect(rectX - this.model.pixelSize, this.model.position.y, this.model.pixelSize, this.model.height);
    
    for (i = 0; i < this.model.doors.length; i++) {
        currentDoor = this.model.doors[i];
        if(currentDoor.state == "closed"){
            this.model.context.fillRect(this.model.position.x + currentDoor.position.x, this.model.position.y + currentDoor.position.y, this.model.pixelSize * 3, this.model.height);
        } else {
            this.model.context.fillRect(this.model.position.x + currentDoor.position.x, this.model.position.y + currentDoor.position.y, this.model.pixelSize * 3, this.model.pixelSize * 3);
            this.model.context.fillRect(this.model.position.x + currentDoor.position.x, this.model.position.y + currentDoor.position.y + this.model.height - this.model.pixelSize * 3, this.model.pixelSize * 3, this.model.pixelSize * 3);
        };
    };
    /*
    for (i = 0; i < this.model.switches.length; i++) {
        currentSwitch = this.model.switches[i];
        this.model.context.fillRect(
            this.model.position.x + this.model.switchPositions[i] - (this.model.pixelSize * 2), 
            this.model.position.y + this.model.height/2 - this.model.pixelSize, 
            this.model.pixelSize * 4, 
            this.model.pixelSize * 2
        );
        this.model.context.fillRect(
            this.model.position.x + this.model.switchPositions[i] - this.model.pixelSize, 
            this.model.position.y+ this.model.height/2- (this.model.pixelSize * 2), 
            this.model.pixelSize * 2, 
            this.model.pixelSize * 4
        );
    };*/
}