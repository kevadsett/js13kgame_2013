var RandomLevelFactory = {};

RandomLevelFactory.generateLevels = function(numberOfLevels) {
    var i, levelData = {levels:[]}, levels;
    for(i = 0; i < numberOfLevels; i++) {
        levelData.levels.push(this.generateRandomLevel());
        levelData.levels[i].id = i;
    }
    levels = ModelFactory.createLevels(levelData);
    return levels;
}

RandomLevelFactory.generateRandomLevel = function() {
    var i,
        randomLevelData = {},
        numberOfDoors,
        randomDoors,
        numberOfSwitches,
        randomSwitches,
        levelIsCompletable = false;
    console.log("Generating level");
    while (!levelIsCompletable) {
        randomLevelData = {},
        numberOfDoors = randomInt(1, 5),
        randomDoors = new Array(numberOfDoors);
        numberOfSwitches = randomInt(1, 5),
        randomSwitches = new Array(numberOfSwitches);
        for(i = 0; i < numberOfDoors; i++) {
            var randomDoor = this.generateRandomDoorData();
            randomDoor.id = i;
            randomDoors[i] = randomDoor;
        }
        
        for(i = 0; i < numberOfSwitches; i++) {
            randomSwitches[i] = this.generateRandomSwitchData(numberOfDoors);
        }
        
        levelIsCompletable = this.getCompletionScore(randomLevelData) > -1;
    }
    randomLevelData = {switches: randomSwitches, doors: randomDoors};
    
    return randomLevelData;
}

RandomLevelFactory.generateRandomDoorData = function () {
    return {state: (randomInt(0, 1) == 0) ? "closed" : "open", originalPosition: { x:randomInt(0, 770) }};
}

RandomLevelFactory.generateRandomSwitchData = function (numberOfDoors) {
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
        originalPosition: { x: randomInt(0, 770), y: randomInt(0, 200) }
    };
    return randomSwitchData;
}


RandomLevelFactory.getCompletionScore = function() {
    // click first available switch
    // if fewer doors are open than before, click it back
    // move onto next available switch, 
    // if no switch available, click
    return 1;
    
}