let inputNodes = [
    {
        coordinate: {
            x: 50,
            y: 75
        },
        state: "off"
    }, {
        coordinate: {
            x: 50,
            y: 150
        },
        state: "on"
    }, {
        coordinate: {
            x: 50,
            y: 225
        },
        state: "off"
    }
];

let outputNodes = [
    {
        coordinate: {
            x: 150,
            y: 112
        },
        state: "off"
    }, {
        coordinate: {
            x: 150,
            y: 187
        },
        state: "off"
    }
];

// initialise input variables
let inputVariables = [
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 1]
];
let weights = [[1, 1, 1], [1, 1, 1]];

let pause = false;
let step = false;
let next = false;

function setup() {
    const canvas = createCanvas(300, 500);
    w = [1, 1, 1];
    frameRate(1);
    colorMode(HSB, 360, 1, 1, 1);
    background(0, 0, 1);
}

function draw() {
    if (!pause) {
        if (!step | next) {
            background(255);
            printTutorial()
            //draw connections between input nodes and output nodes
            for (let i = 0; i < inputNodes.length; i++) {
                for (let j = 0; j < outputNodes.length; j++) {
                    drawConnection("", inputNodes[i], outputNodes[j]);
                }
            }
            // iterate over all input nodes and draw them using drawNode
            for (let i = 0; i < inputNodes.length; i++) {
                drawNode(inputNodes[i]);
                printLabel("x", i, inputNodes[i]);
            }
            // iterate over all output nodes and draw them using drawNode
            for (let i = 0; i < outputNodes.length; i++) {
                drawNode(outputNodes[i]);
                printLabel("y", i, outputNodes[i]);
            }

        }
    }
}

function printTutorial() {
    strokeWeight(0);
    fill(255, 0, 0);
    text("type n for next step, r for running, p for pause", 10, height - 200);
    text("s for step-mode", 10, height - 170)
}

// draw a connection using p5.js between two points with parameters color, startNode and endNode
function drawConnection(strokeMode, startNode, endNode) {
    setStroke(strokeMode);
    strokeWeight(5);
    line(startNode.coordinate.x, startNode.coordinate.y, endNode.coordinate.x, endNode.coordinate.y);
}

//draw a node using the nodes coordinate and the state to determine fill color
function drawNode(node, newState = null) {
    strokeWeight(0);
    if (newState) {
        node.state = newState;
    }
    if (node.state === "on") {
        fill(255, 1, 1);
    } else {
        fill(255, 1, 0);
    }
    ellipse(node.coordinate.x, node.coordinate.y, 50, 50);
}

function setStroke(colorMode) {
    strokeWeight(10);
    switch (colorMode) {
        case "wrong":
            stroke(0, 0, 1);
            break;
        case "correct":
            stroke(0, 1, 0);
            break;
        case "searching":
            stroke(1, 0, 0);
            break;
        default:
            stroke(0, 0, 0);
            break;
    }
}

function printLabel(main, sub, node){
    strokeWeight(0);
    fill(255, 0, 1);
    text(sub, node.coordinate.x, node.coordinate.y + 10);
    text(main, node.coordinate.x-5, node.coordinate.y +5);
}

function threshold(x) {
    if (x > 0)
        return 1;
    else
        return 0;
}

function keyPressed() {
    if (keyCode == 88) //x
        w = [0, 0, 0];
    if (keyCode == 80) { //p
        pause = true;
    }
    if (keyCode == 82) { //r
        pause = false;
        step = false;
    }
    if (keyCode == 83) { //s
        step = true;
    }
    if (keyCode == 78) { //n
        next = true;
    }
}