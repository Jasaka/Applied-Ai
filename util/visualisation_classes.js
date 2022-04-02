class Node {
    constructor(coordinate, state, label) {
        this.coordinate = coordinate;
        this.state = state;
        this.label = label;
    }
}

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Label {
    constructor(main, subscript) {
        this.main = main;
        this.subscript = subscript;
    }
}