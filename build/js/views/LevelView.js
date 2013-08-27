function LevelView(model, context) {
    console.log("LevelView instantiated");
    this.model = model;
    this.context = context;
    LateRunner.events.on('render', this.render, this);
}

LevelView.prototype.render = function() {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(this.model.position.x, this.model.position.y, this.model.width, this.model.height);
}