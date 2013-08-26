var ModelFactory = {};

ModelFactory.createLevels = function(levelData) {
    console.log("ModelFactory::generateLevelModels");
    var i, j,levels = [], doors = [], switches = [], newLevelData = {};
    for(i = 0; i < levelData.levels.length; i++) {
        newLevelData.doors = [];
        for(j = 0; j < levelData.levels[i].doors.length; j++) {
            newLevelData.doors.push(ModelFactory.createDoorModel(j, levelData.levels[i].doors[j]));
        }
        levelData.levels[i].doors = newLevelData.doors;
        console.log(levelData.levels[i]);
        newLevelModel = new LevelModel(i, levelData.levels[i]);
        levels.push(newLevelModel);
    };
    return levels;
}

ModelFactory.createDoorModel = function(index, doorData) {
    return new DoorModel(index, doorData);
}