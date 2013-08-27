function DoorView(model, context) {
    this.model = model;
    this.context = context;
    LateRunner.events.on('render', this.render, this);
}

DoorView.prototype.render = function() {
    this.context.fillStyle = LateRunner.backgroundColour;
    if(this.model.state == "closed"){
        this.context.fillRect(this.model.position.x, this.model.position.y, this.model.width, this.model.height);
    } else {
        this.context.fillRect(this.model.position.x, this.model.position.y, this.model.width, this.model.openSegmentHeight);
        this.context.fillRect(this.model.position.x, this.model.position.y + this.model.height - this.model.openSegmentHeight, this.model.width, this.model.openSegmentHeight);
    };
}