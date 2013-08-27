function DoorAndSwitchController(gameModel) {
    this.model = gameModel;
    LateRunner.events.on('switchActivated', this.onSwitchActivated, this);
}

DoorAndSwitchController.prototype.onSwitchActivated = function(activatedSwitch) {
    var i;
    if(this.switchIsReachable(activatedSwitch)) {
        for(i = 0; i < activatedSwitch.connectedDoors.length; i++) {
            this.toggleDoorState(activatedSwitch.connectedDoors[i]);
            
        }
    }
}

//TODO write checkSwitchIsReachable function
DoorAndSwitchController.prototype.switchIsReachable = function(switchToCheck) {
    return true;
}

DoorAndSwitchController.prototype.toggleDoorState = function(door) {
    if(door.state == "closed") door.state = "open";
    else door.state = "closed";
}