function TimerController(model) {
    this.model = model;
    this.model.startTime = new Date().getTime() / 1000;
    new TimerView(this.model);
    LateRunner.events.on('update', this.update, this);
}

TimerController.prototype.update = function() {
    var timeNow = new Date().getTime() / 1000,
        elapsedTime = (timeNow - this.model.startTime) ;
    if(Math.floor(elapsedTime) > 0 && this.model.timing) {
        this.model.startTime = timeNow;
        this.updateTime();
    }
}

TimerController.prototype.updateTime = function() {
    this.model.seconds = (this.model.seconds + 60 - 1) % 60;
    if(this.model.seconds == 59) 
    {
        this.model.minutes--;
        if(this.model.minutes < 0) {
            LateRunner.events.trigger('timeup');
            console.log('timeup');
            this.model.timing = false;
        }
    }
}

TimerController.prototype.getTimeLeftAsString = function() {
    return this.model.timing ? padNumber(this.model.minutes, 2) + ":" + padNumber(this.model.seconds, 2) : "YOU'RE LATE"; 
}