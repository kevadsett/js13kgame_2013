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
        if (x > 670) return 99;
        return -1;
    };
    
    this.render = function() {
        var ctx = game.view.context,
            stairWidth = (this.width/7.7), 
            stairHeight = (this.height/5),
            i,
            num,
            currentDoor,
            currentSwitch;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, this.width, this.height);
        for (i = 0; i < 5; i++) {
            num = Math.ceil(mapValue(i, 0, 4, 17, 255)).toString(16);
            ctx.fillStyle = "#" + num + num + num;
            ctx.fillRect(this.width - stairWidth, this.height - ((i+1) * stairHeight), stairWidth, stairHeight);
        };
        
        ctx.fillStyle = "#111111";
        
        for (i = 0; i < this.model.doors.length; i++) {
            currentDoor = this.model.doors[i];
            if(currentDoor.position == "closed"){
                ctx.fillRect(this.doorPositions[i], 0, game.view.pixelSize * 3, this.height);
            } else {
                ctx.fillRect(this.doorPositions[i], 0, game.view.pixelSize * 3, game.view.pixelSize * 3);
                ctx.fillRect(this.doorPositions[i], this.height - game.view.pixelSize * 3, game.view.pixelSize * 3, game.view.pixelSize * 3);
            };
        };
        for (i = 0; i < this.model.switches.length; i++) {
            currentSwitch = this.model.switches[i];
            ctx.fillRect(
                this.switchPositions[i] - (game.view.pixelSize * 2), 
                this.height/2 - game.view.pixelSize, 
                game.view.pixelSize * 4, 
                game.view.pixelSize * 2
            );
            ctx.fillRect(
                this.switchPositions[i] - game.view.pixelSize, 
                this.height/2- (game.view.pixelSize * 2), 
                game.view.pixelSize * 2, 
                game.view.pixelSize * 4
            );
        };
    };
    
    this.renderMask = function() {
        var ctx = game.view.context;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "3em sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(game.currentLevelIndex + 1, (this.width / 2), this.height + 60);
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
            this.doorPositions.push(mapValue(i+1, 0, this.model.doors.length+1, 0, this.width));
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