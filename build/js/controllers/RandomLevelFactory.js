function RandomLevelFactory(gameModel, numberOfLevels) {
    this.gameModel = gameModel;
    console.log("New randomLevelFactory - " + numberOfLevels + " level" + (numberOfLevels == 1? "" : "s"));
    this.numberOfLevels = numberOfLevels;
    LateRunner.events.on("modelsReady", this.generateLevels, this);
}

RandomLevelFactory.prototype.generateLevels = function() {
    console.log("RandomLevelFactory::generateLevels");
    var i, levelData = {levels:[]}, levels, randomLevel;
    for(i = 0; i < this.numberOfLevels; i++) {
        randomLevel = this.generateRandomLevel(i);
        while(!randomLevel.isCompletable) {
            randomLevel = this.generateRandomLevel(i);
            console.log(randomLevel.isCompletable);
        }
        randomLevel.id = i;
        randomLevel.heuristic = this.getLevelHeuristic(randomLevel);
        levelData.levels.push(randomLevel);
    }
    levelData.levels = this.sortLevelsByHeuristic(levelData.levels);
    return levelData;
}

RandomLevelFactory.prototype.generateRandomLevel = function(levelIndex) {
    console.log("RandomLevelFactory::generateRandomLevel");
    var i,
        randomLevelData = {},
        numberOfDoors,
        randomDoors,
        numberOfSwitches,
        randomSwitches,
        levelIsCompletable = false,
        atLeastOneDoorIsClosed = false;
    while (!randomLevelData.isCompletable) {
        randomLevelData = {},
        numberOfDoors = randomInt(1, 5),
        randomDoors = new Array(numberOfDoors);
        numberOfSwitches = randomInt(1, 5),
        randomSwitches = new Array(numberOfSwitches);
        atLeastOneDoorIsClosed = false;
        for(i = 0; i < numberOfDoors; i++) {
            var randomDoor = this.generateRandomDoorData();
            randomDoor.id = i;
            if(randomDoor.state == "closed") atLeastOneDoorIsClosed = true;
            randomDoors[i] = randomDoor;
        }
        if(atLeastOneDoorIsClosed == false){
            randomDoors[randomInt(0, randomDoors.length - 1)].state = "closed"
            atLeastOneDoorIsClosed = true;
        }
        
        for(i = 0; i < numberOfSwitches; i++) {
            randomSwitches[i] = this.generateRandomSwitchData(numberOfDoors);
        }
        randomLevelData = {switches: randomSwitches, doors: randomDoors};
        randomLevelData.isCompletable = this.isCompletable(levelIndex, randomLevelData);
        console.log(randomLevelData.isCompletable);
    }
    return randomLevelData;
}

RandomLevelFactory.prototype.generateRandomDoorData = function () {
    return {state: (randomInt(0, 1) == 0) ? "closed" : "open", originalPosition: { x:randomInt(0, 770) }};
}

RandomLevelFactory.prototype.generateRandomSwitchData = function (numberOfDoors) {
    var i,
        connectedDoors = [],
        numberOfconnectedDoors = randomInt(1, numberOfDoors),
        potentialDoorChoices = new Array(numberOfconnectedDoors),
        chosenConnectedDoor = randomInt(0, numberOfconnectedDoors),
        randomSwitchData;
    
    for(i = 0; i < numberOfconnectedDoors; i++) {
        potentialDoorChoices[i] = i;
    }
    
    for(i = 0; i < numberOfconnectedDoors; i++) {
        connectedDoors.push(potentialDoorChoices.splice(randomInt(0, potentialDoorChoices.length - 1), 1)[0]);
    }
    randomSwitchData = {
        connectedDoors: (randomInt(0, 1) == 0) ? [randomInt(0, numberOfDoors - 1)] : connectedDoors,
        doorPosition: randomInt(0, numberOfDoors - 1),
        //originalPosition: { x: randomInt(0, 770), y: randomInt(0, 200) }
    };
    return randomSwitchData;
}


RandomLevelFactory.prototype.getLevelHeuristic = function(level) {
    var i, 
        numSwitches = level.switches.length, 
        currentSwitch, 
        numDoors = level.doors.length, 
        currentDoor, 
        levelScore = numSwitches + numDoors;
    for (i = 0; i < numSwitches; i++) {
        currentSwitch = level.switches[i];
        for(j = 0; j < currentSwitch.connectedDoors.length; j++) {
            levelScore+=2;
        }
    }
    return levelScore;
}

RandomLevelFactory.prototype.sortLevelsByHeuristic = function(levels) {
    return levels.sort(function(a, b) {
        return a.heuristic - b.heuristic;
    });
}

RandomLevelFactory.prototype.isCompletable = function(index, levelData) {
    console.log("RandomLevelFactory::isCompletable");
    var testLevel = ModelFactory.createLevel(index, cloneObject(levelData, "|")),
        testPosition = new Vector(0, 0),
        switchIndex = 0;
    this.gameModel.currentLevel = testLevel;
    console.log(this.gameModel.currentLevel);
    LateRunner.resizeController.resizeGame();
    return runThroughLevel(testPosition, testLevel, "|");
    
    //------------internal function ------------//
    function runThroughLevel(currentPosition, levelModel, depthIndicator) {
        console.log("--------runThroughLevel--------");
        if(!testDoorIsClosedBetween(levelModel, currentPosition, levelModel.stairs.position)) {
            console.log(depthIndicator + " Stairs available, level is completable!");
           return true;
        } else {
            console.log(depthIndicator + " Stairs not available from this position");
            var availableSwitches = getAvailableSwitches(currentPosition, levelModel.switches),
                i;
            if (availableSwitches.length > 0) {
                for(i = 0; i < availableSwitches.length; i++) {
                    switch (availableSwitches[i].activatedCount) {
                        case undefined:
                        case 0:
                            testActivateSwitch(availableSwitches[i]);
                            return runThroughLevel(availableSwitches[i].position, levelModel, depthIndicator + "|");
                            availableSwitches[i].activatedCount = 0;
                            break;
                        case 1:
                            // switch has already been clicked once, move onto the next switch
                            break;
                        case 2:
                            return false;
                    }
                }
                // all switches tested, no stairs...
                return false;
            } else {
                return false;
            }
        }
    }
    
    function getAvailableSwitches(currentPosition, levelSwitches) {
        var i,
            availableSwitches = [];
        for(i = 0; i < levelSwitches.length; i++) {
            if(!testDoorIsClosedBetween(testLevel, currentPosition, levelSwitches[i].position)) {
                availableSwitches.push(levelSwitches[i]);
            }
        }
        return availableSwitches;
    }
    
    function testDoorIsClosedBetween(levelData, position1, position2) {
        var i, currentDoor, doorsBetween = [], doors = levelData.doors;
        for(i = 0; i < doors.length; i ++) {
            if(position1.x < position2.x) {
                if(doors[i].position.x >= position1.x && doors[i].position.x < position2.x) {
                    doorsBetween.push(doors[i]);
                }
            }else if(position1.x > position2.x) {
                if(doors[i].position.x < position1.x && doors[i].position.x >= position2.x) {
                    doorsBetween.push(doors[i]);
                }
            }
        }
        
        for(i = 0; i < doorsBetween.length; i++) {
            if(doorsBetween[i].state == "closed") return true;
        }
        return false;
    }
    
    function testActivateSwitch(activatedSwitch) {
        var i;
        activatedSwitch.activatedCount =  activatedSwitch.activatedCount ? activatedSwitch.activatedCount + 1 : 1;
        for(i = 0; i < activatedSwitch.connectedDoors.length; i++) {
            LateRunner.doorAndSwitchController.toggleDoorState(activatedSwitch.connectedDoors[i]);
        }
    }
    
}