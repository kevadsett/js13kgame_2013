function LevelView(model, context) {
    console.log("LevelView instantiated");
    this.model = model;
    this.context = context;
    LateRunner.events.on('render', this.render, this);
    LateRunner.events.on('destroyViews', this.destroy, this);
}

LevelView.prototype.render = function() {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(LateRunner.gameOffset.x + this.model.position.x, LateRunner.gameOffset.y + this.model.position.y, this.model.width, this.model.height);
}

LevelView.prototype.destroy = function(params) {
    LateRunner.events.off('render', this.render)
    delete this;
}