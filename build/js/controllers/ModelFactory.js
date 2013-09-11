var ModelFactory = {};

ModelFactory.createLevels = function(levelData) {
    console.log("ModelFactory::createLevels");
    var i, levels = [], newLevelModel;
    for(i = 0; i < levelData.levels.length; i++) {
        levels.push(this.createLevel(i, levelData.levels[i]));
    };
    return levels;
}

ModelFactory.createLevel = function(index, levelData) {
    levelData.doors = ModelFactory.createDoorModels(index, levelData);
    levelData.switches = ModelFactory.createSwitchModels(index, levelData);
    return new LevelModel(index, levelData);
}

ModelFactory.createDoorModels = function(levelIndex, levelData) {
    var i, doorModels = [], newDoor;
    console.log(levelData.doors);
    for(i = 0; i < levelData.doors.length; i++) {
        newDoor = this.createDoorModel(levelData.doors[i]);
        newDoor.id = i;
        doorModels.push(newDoor);
    }
    return doorModels;
}

ModelFactory.createDoorModel = function(doorData) {
    return new DoorModel(doorData);
}

ModelFactory.createSwitchModels = function(levelIndex, levelData) {
    var i, switchModels = [], dataConnectedDoors, connectedDoors = [];
    for(i = 0; i < levelData.switches.length; i++) {
        dataConnectedDoors = levelData.switches[i].connectedDoors;
        connectedDoors = [];
        for(j = 0; j < dataConnectedDoors.length; j++) {
            connectedDoors.push(levelData.doors[dataConnectedDoors[j]]);
        }
        levelData.switches[i].connectedDoors = connectedDoors;
        switchModels.push(new SwitchModel(i, levelData.switches[i]));
    }
    switchModels = switchModels.reverse();
    return switchModels;
}