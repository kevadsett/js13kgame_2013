function LevelView(model, context) {
    console.log("LevelView instantiated");
    this.model = model;
    this.context = context;
}

LevelView.prototype.render = function() {
    var i;
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(this.model.position.x, this.model.position.y, this.model.width, this.model.height);
}