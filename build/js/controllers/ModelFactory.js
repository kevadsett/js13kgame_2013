var ModelFactory = {};

ModelFactory.createLevels = function(levelData) {
    console.log("ModelFactory::generateLevelModels");
    var i, levels = [];
    for(i = 0; i < levelData.levels.length; i++) {
        levelData.levels[i].doors = ModelFactory.createDoorModels(i, levelData);
        levelData.levels[i].switches = ModelFactory.createSwitchModels(i, levelData);
        newLevelModel = new LevelModel(i, levelData.levels[i]);
        levels.push(newLevelModel);
    };
    return levels;
}

ModelFactory.createDoorModels = function(levelIndex, levelData) {
    var i, doorModels = [];
    for(i = 0; i < levelData.levels[levelIndex].doors.length; i++) {
        doorModels.push(new DoorModel(i, levelData.levels[levelIndex].doors[i]));
    }
    return doorModels;
}

ModelFactory.createSwitchModels = function(levelIndex, levelData) {
    var i, switchModels = [], dataConnectedDoors, connectedDoors = [];
    for(i = 0; i < levelData.levels[levelIndex].switches.length; i++) {
        dataConnectedDoors = levelData.levels[levelIndex].switches[i].connectedDoors;
        connectedDoors = [];
        for(j = 0; j < dataConnectedDoors.length; j++) {
            connectedDoors.push(levelData.levels[levelIndex].doors[dataConnectedDoors[j]]);
        }
        levelData.levels[levelIndex].switches[i].connectedDoors = connectedDoors;
        switchModels.push(new SwitchModel(i, levelData.levels[levelIndex].switches[i]));
    }
    switchModels = switchModels.reverse();
    return switchModels;
}