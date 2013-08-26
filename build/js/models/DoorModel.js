function DoorModel(index, data) {
    this.id = index;
    this.state = data.state;
    this.position = new Vector(0, 0);
}