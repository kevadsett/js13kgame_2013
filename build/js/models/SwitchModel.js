function SwitchModel(index, data) {
    this.id = index;
    this.connectedDoors = data.connectedDoors;
    this.doorPosition = data.doorPosition;
    this.position = new Vector(0, 0);
    this.radius = 2;
}