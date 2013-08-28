function PlayerView(model, context) {
    this.model = model;
    this.context = context;
    LateRunner.events.on('render', this.render, this);
    //LateRunner.events.on('destroyViews', this.destroy, this);
}

PlayerView.prototype.render = function() {
    this.context.drawImage(this.model.imageObject,
                           this.model.currentFrame.x, 
                           this.model.currentFrame.y, 
                           this.model.currentFrame.w, 
                           this.model.currentFrame.h, 
                           this.model.position.x - this.model.currentFrame.w/2 * LateRunner.sizeMultiple,
                           this.model.position.y - this.model.currentFrame.h * LateRunner.sizeMultiple,
                           this.model.currentFrame.w * LateRunner.sizeMultiple,
                           this.model.currentFrame.h * LateRunner.sizeMultiple);
    this.context.fillStyle = "#FF0000";
}

PlayerView.prototype.destroy = function(params) {
    LateRunner.events.off('render', this.render)
    delete this;
}