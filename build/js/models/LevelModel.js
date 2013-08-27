function LevelModel(index, data) {
    this.id = index;
    this.switches = data.switches;
    this.doors = data.doors;
    this.stairs = new StairsModel();
    this.numberOfStepsInStairs = 10;
    this.position = new Vector(0, 0);
    this.backgroundColour = {r:17, g:17, b:17};
}