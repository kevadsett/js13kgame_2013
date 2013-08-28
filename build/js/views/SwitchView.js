function SwitchView(model, context) {
    this.model = model;
    this.context = context;
    LateRunner.events.on('render', this.render, this);
    LateRunner.events.on('destroyViews', this.destroy, this);
}

SwitchView.prototype.render = function() {
    this.context.fillRect(
        this.model.position.x - this.model.radius,
        this.model.position.y - (this.model.radius / 2),
        this.model.radius * 2, 
        this.model.radius
    );
    this.context.fillRect(
        this.model.position.x - (this.model.radius / 2),
        this.model.position.y - this.model.radius,
        this.model.radius, 
        this.model.radius * 2
    );
}

SwitchView.prototype.destroy = function() {
    LateRunner.events.off('render', this.render)
    delete this;
}