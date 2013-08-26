var LevelModel = function(levelData) {
    this.initialise = function(levelData) {
        this.switches = levelData.switches;
        this.doors = levelData.doors;
    }
    
    this.initialise(levelData);
},
LevelView = function(model) {
    this.model = model;
    
    this.initialise = function() {
        this.resize();
    };
    
    this.getClickedSwitch = function(x, y) {
        for(var i = 0; i < this.switchPositions.length; i++) {
            currentX = this.switchPositions[i];
            if (currentX < (x + touchRadius) && currentX > (x - touchRadius)) {
                return i;
            };
        };
        if (x > this.width - this.width/7.7) return 99;
        return -1;
    };
    
    this.render = function(startX, startY) {
        var ctx = game.view.context,
            numberOfDoors = 10,
            stairWidth = (this.width/7.7), 
            stairHeight = (this.height/numberOfDoors),
            i,
            currentDoor,
            currentSwitch,
            backgroundR = game.view.backgroundColour.slice(1, 3),
            backgroundG = game.view.backgroundColour.slice(3, 5),
            backgroundB = game.view.backgroundColour.slice(5, 7),
            stairColourR, 
            stairColourG,
            stairColourB;
            
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(startX, startY, this.width, this.height);
        backgroundR = parseInt(backgroundR);
        backgroundG = parseInt(backgroundG);
        backgroundB = parseInt(backgroundB);
        for (i = 0; i < numberOfDoors; i++) {
            stairColourR = Math.ceil(mapValue(i, 0, numberOfDoors - 1, parseInt(backgroundR, 16), 255)).toString(16);
            stairColourG = Math.ceil(mapValue(i, 0, numberOfDoors - 1, parseInt(backgroundG, 16), 255)).toString(16);
            stairColourB = Math.ceil(mapValue(i, 0, numberOfDoors - 1, parseInt(backgroundB, 16), 255)).toString(16);
            ctx.fillStyle = "#" + stairColourR + stairColourG + stairColourB;
            ctx.fillRect(startX + this.width - stairWidth, startY + this.height - ((i+1) * stairHeight), stairWidth, stairHeight);
        };
        ctx.fillStyle = game.view.backgroundColour;
        
        ctx.fillRect(startX + this.width - stairWidth - game.view.pixelSize, startY, game.view.pixelSize, this.height);
        
        for (i = 0; i < this.model.doors.length; i++) {
            currentDoor = this.model.doors[i];
            if(currentDoor.position == "closed"){
                ctx.fillRect(startX + this.doorPositions[i], startY, game.view.pixelSize * 3, this.height);
            } else {
                ctx.fillRect(startX + this.doorPositions[i], startY, game.view.pixelSize * 3, game.view.pixelSize * 3);
                ctx.fillRect(startX + this.doorPositions[i], startY + this.height - game.view.pixelSize * 3, game.view.pixelSize * 3, game.view.pixelSize * 3);
            };
        };
        for (i = 0; i < this.model.switches.length; i++) {
            currentSwitch = this.model.switches[i];
            ctx.fillRect(
                startX + this.switchPositions[i] - (game.view.pixelSize * 2), 
                startY + this.height/2 - game.view.pixelSize, 
                game.view.pixelSize * 4, 
                game.view.pixelSize * 2
            );
            ctx.fillRect(
                startX + this.switchPositions[i] - game.view.pixelSize, 
                startY+ this.height/2- (game.view.pixelSize * 2), 
                game.view.pixelSize * 2, 
                game.view.pixelSize * 4
            );
        };
    };
    
    this.resize = function() {
        var canvas = document.getElementById('gameCanvas'),
            i,
            switchesAt = new Array(this.model.doors.length),
            switchPos;
            
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.doorPositions = [];

        for (i = 0; i < this.model.doors.length; i++) {
            this.doorPositions.push(mapValue(i+1, 0, this.model.doors.length+1, this.width/7.7, this.width));
        };
        
        this.switchPositions = [];
        
        for(i = 0; i < this.model.doors.length; i++) {
            switchesAt[i] = [];
        };
        for (i = 0; i < this.model.switches.length; i++) {
            switchesAt[this.model.switches[i].position].push(this.model.switches[i]);
            switchPos = (this.width/14 * switchesAt[this.model.switches[i].position].length);
            this.switchPositions.push(this.doorPositions[this.model.switches[i].position] - switchPos);
        };
    };
    
};