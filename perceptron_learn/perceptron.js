let inputNodes = [
    new Node(new Coordinate(50, 75), "off", new Label("x", "0")),
    new Node(new Coordinate(50, 150), "on", new Label("x", "1")),
    new Node(new Coordinate(50, 225), "off", new Label("x", "2"))
];

let outputNodes = [
    new Node(new Coordinate(150, 112), "off", new Label("y", "0")),
    new Node(new Coordinate(150, 187), "off", new Label("y", "1"))
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
    frameRate(1);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 1);
}

function draw() {
    if (!pause) {
        if (!step | next) {
            background(0, 0, 100);
            printTutorial(height)

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

            drawNetwork(currentNode, inputNodes, outputNodes);

            lastOutput[currentNode][stepCount] = outputNeuron;

            printWeights(weights);
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