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

let inputVariables = [
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 1]
];

let weights = [[1, 1, 1], [1, 1, 1]];
let currentNode = 0;

const learningRate = 0.3;
const expectedOutput = [[0, 0, 0, 1], [0, 1, 1, 1]];
let lastOutput = [[0, 0, 0, 0], [0, 0, 0, 0]];

let stepCount = 0;
let pause = false;
let step = true;
let next = true;

function setup() {
    const canvas = createCanvas(500, 500);
    w = [1, 1, 1];
    frameRate(1);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 1);
}

function draw() {
    if (!pause) {
        if (!step | next) {
            background(0, 0, 100);
            printTutorial()
            next = false;
            stepCount++;
            stepCount = stepCount % 4;
            if (stepCount === 0) {
                toggleCurrentWeight();
            }
            let outputNeuron = computeOutputNeuron(inputVariables[stepCount], weights[currentNode]);
            let error = expectedOutput[currentNode][stepCount] - outputNeuron;

            for (let i = 0; i < weights[currentNode].length; i++) {
                weights[currentNode][i] += learningRate * error * inputVariables[stepCount][i];
            }

            for (let i = 0; i < inputNodes.length; i++) {
                inputNodes[i].state = inputVariables[stepCount][i] === 1 ? "on" : "off";
            }

            outputNodes[currentNode].state = outputNeuron === 1 ? "on" : "off";

            drawNetwork(currentNode);

            lastOutput[currentNode][stepCount] = outputNeuron;

            printWeights();
            if (stepCount === 3 && isLastOutputEqual()) {
                pause = true;
            }
        }
    }
}

function isLastOutputEqualForWeight(weight) {
    for (let i = 0; i < lastOutput[weight].length; i++) {
        if (lastOutput[weight][i] !== expectedOutput[weight][i]) {
            return false;
        }
    }
    return true;
}

function isLastOutputEqual() {
    for (let i = 0; i < lastOutput.length; i++) {
        for (let j = 0; j < lastOutput[i].length; j++) {
            if (lastOutput[i][j] !== expectedOutput[i][j]) {
                return false;
            }
        }
    }
    return true;
}


function threshold(x) {
    if (x > 0)
        return 1;
    else
        return 0;
}

function computeOutputNeuron(input, weights) {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        sum += input[i] * weights[i];
    }
    return threshold(sum);
}

function toggleCurrentWeight() {
    currentNode = currentNode === 0 ? 1 : 0;
}

function drawConnection(strokeMode, startNode, endNode) {
    setStroke(strokeMode);
    strokeWeight(5);
    line(startNode.coordinate.x, startNode.coordinate.y, endNode.coordinate.x, endNode.coordinate.y);
}

function drawNode(node) {
    strokeWeight(0);
    if (node.state === "on") {
        fill(170, 50, 70);
    } else {
        fill(255, 1, 0);
    }
    ellipse(node.coordinate.x, node.coordinate.y, 50, 50);
}

function setStroke(colorMode) {
    strokeWeight(10);
    switch (colorMode) {
        case "wrong":
            stroke(0, 36, 70);
            break;
        case "correct":
            stroke(118, 36, 70);
            break;
        case "searching":
            stroke(283, 36, 70);
            break;
        default:
            stroke(0, 0, 0);
            break;
    }
}

function drawNetwork(currentNetwork) {
    for (let i = 0; i < inputNodes.length; i++) {
        for (let j = 0; j < outputNodes.length; j++) {
            if (currentNetwork === j) {
                if (isLastOutputEqualForWeight(currentNetwork)) {
                    drawConnection("correct", inputNodes[i], outputNodes[j]);
                } else {
                    drawConnection("searching", inputNodes[i], outputNodes[j]);
                }
            } else {
                if (isLastOutputEqualForWeight(1 - currentNetwork)) {
                    drawConnection("correct", inputNodes[i], outputNodes[j]);
                } else {
                    drawConnection("wrong", inputNodes[i], outputNodes[j]);
                }
            }
        }
    }

    for (let i = 0; i < inputNodes.length; i++) {
        drawNode(inputNodes[i]);
        printLabel("x", i, inputNodes[i]);
    }

    for (let i = 0; i < outputNodes.length; i++) {
        drawNode(outputNodes[i]);
        printLabel("y", i, outputNodes[i]);
    }
}

function printLabel(main, sub, node) {
    strokeWeight(0);
    fill(255, 0, 100);
    text(sub, node.coordinate.x, node.coordinate.y + 10);
    text(main, node.coordinate.x - 5, node.coordinate.y + 5);
}

function printTutorial() {
    strokeWeight(0);
    fill(255, 0, 0);
    text("type n for next step, r for running, p for pause", 10, height - 200);
    text("s for step-mode", 10, height - 170)
}

function printWeights() {
    strokeWeight(0);
    fill(255, 0, 0);
    for (let i = 0; i < weights.length; i++) {
        text(weights[i], outputNodes[i].coordinate.x + 40, outputNodes[i].coordinate.y);
    }
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