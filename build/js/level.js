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
        this.doorPositions = [];
        this.switchPositions = [];
        for (var i = 0; i < this.model.doors.length; i++) {
            this.doorPositions.push(mapValue(i+1, 0, this.model.doors.length+1, 0, game.view.width));
        }
        for (var i = 0; i < this.model.switches.length; i++) {
            this.switchPositions.push(this.doorPositions[this.model.switches[i].position] - 50);
        }
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
        var ctx = game.view.context;
        
        for (var i = 0; i < 5; i++) {
            var num = Math.ceil(mapValue(i, 0, 4, 17, 255)).toString(16);
            ctx.fillStyle = "#" + num + num + num;
            ctx.fillRect(670, game.view.height - ((i+1) * 40), 100, 40);
        };
        
        ctx.fillStyle = "#111111";
        
        for (var i = 0; i < this.model.doors.length; i++) {
            var currentDoor = this.model.doors[i];
            if(currentDoor.position == "closed"){
                ctx.fillRect(this.doorPositions[i], 0, game.view.pixelSize * 3, game.view.height);
            } else {
                ctx.fillRect(this.doorPositions[i], 0, game.view.pixelSize * 3, game.view.pixelSize * 3);
                ctx.fillRect(this.doorPositions[i], game.view.height - game.view.pixelSize * 3, game.view.pixelSize * 3, game.view.pixelSize * 3);
            };
        };
        for (var i = 0; i < this.model.switches.length; i++) {
            var currentSwitch = this.model.switches[i];
            ctx.fillRect(
                this.switchPositions[i] - (game.view.pixelSize * 2), 
                game.view.height/2 - game.view.pixelSize, 
                game.view.pixelSize * 4, 
                game.view.pixelSize * 2
            );
            ctx.fillRect(
                this.switchPositions[i] - game.view.pixelSize, 
                game.view.height/2- (game.view.pixelSize * 2), 
                game.view.pixelSize * 2, 
                game.view.pixelSize * 4
            );
        };
    };
    
};