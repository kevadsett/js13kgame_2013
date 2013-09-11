function GameModel() {
    console.log("GameModel instantiated");
    this.position = new Vector(0,0);
    this.levels = [];
    this.player;
    this.levelTransitioningIn = false;
    this.levelTransitioningOut = false;
    this.originalLevelTransitionSpeed = 5;
    this.backgroundColour = {r:11, g:11, b:11};
    this.pixelSize = 4;
    this.sizeMultiple = 1;
}