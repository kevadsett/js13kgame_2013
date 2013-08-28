function DoorModel(index, data) {
    this.id = index;
    this.originalState = this.state = data.state;
    this.position = new Vector(0, 0);
}