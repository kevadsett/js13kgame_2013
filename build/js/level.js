var LevelModel = function(levelData) {
    this.initialise = function(levelData) {
        this.switches = levelData.switches;
        this.doors = levelData.doors;
    }
    
    this.initialise(levelData);
};

var LevelView = function(model) {
    this.model = model;
    
    this.initialise = function() {
        this.height = 200;
        this.width = 770;
        
        this.doorPositions = [];
        this.switchPositions = [];
        var switchesAt = new Array(this.model.doors.length);
        for(var i = 0; i < this.model.doors.length; i++) {
            switchesAt[i] = [];
        };
        for (var i = 0; i < this.model.doors.length; i++) {
            this.doorPositions.push(mapValue(i+1, 0, this.model.doors.length+1, 0, this.width));
        };
        for (var i = 0; i < this.model.switches.length; i++) {
            switchesAt[this.model.switches[i].position].push(this.model.switches[i]);
            var switchPos = (50 * switchesAt[this.model.switches[i].position].length);
            this.switchPositions.push(this.doorPositions[this.model.switches[i].position] - switchPos);
        };
    };
    
    this.getClickedSwitch = function(x, y) {
        console.log(x, y);
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
        var ctx = game.view.context;
        ctx.fillStyle = "#FFFFFF";
        console.log(game.view.levelX, game.view.levelY, this.width, this.height);
        ctx.fillRect(game.view.levelX, game.view.levelY, this.width, this.height);
        var stairWidth = 100, stairHeight = 40;
        for (var i = 0; i < 5; i++) {
            var num = Math.ceil(mapValue(i, 0, 4, 17, 255)).toString(16);
            ctx.fillStyle = "#" + num + num + num;
            ctx.fillRect(game.view.levelX + this.width - stairWidth, game.view.levelY + this.height - ((i+1) * stairHeight), stairWidth, stairHeight);
        };
        
        ctx.fillStyle = "#111111";
        
        for (var i = 0; i < this.model.doors.length; i++) {
            var currentDoor = this.model.doors[i];
            if(currentDoor.position == "closed"){
                ctx.fillRect(game.view.levelX + this.doorPositions[i], game.view.levelY, game.view.pixelSize * 3, this.height);
            } else {
                ctx.fillRect(game.view.levelX + this.doorPositions[i], game.view.levelY, game.view.pixelSize * 3, game.view.pixelSize * 3);
                ctx.fillRect(game.view.levelX + this.doorPositions[i], game.view.levelY + this.height - game.view.pixelSize * 3, game.view.pixelSize * 3, game.view.pixelSize * 3);
            };
        };
        for (var i = 0; i < this.model.switches.length; i++) {
            var currentSwitch = this.model.switches[i];
            ctx.fillRect(
                game.view.levelX + this.switchPositions[i] - (game.view.pixelSize * 2), 
                game.view.levelY + this.height/2 - game.view.pixelSize, 
                game.view.pixelSize * 4, 
                game.view.pixelSize * 2
            );
            ctx.fillRect(
                game.view.levelX + this.switchPositions[i] - game.view.pixelSize, 
                game.view.levelY + this.height/2- (game.view.pixelSize * 2), 
                game.view.pixelSize * 2, 
                game.view.pixelSize * 4
            );
        };
    };
    
    this.renderMask = function() {
        var ctx = game.view.context;
        ctx.fillStyle = "#111111";
        ctx.fillRect(game.view.levelX, game.view.levelY + this.height, this.width, this.height);
        ctx.fillRect(game.view.levelX, game.view.levelY - this.height, this.width, this.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "3em sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(game.currentLevelIndex + 1, game.view.levelX + (this.width / 2), game.view.levelY + this.height + 60);
    };
    
};