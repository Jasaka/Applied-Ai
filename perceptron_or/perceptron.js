let inputNodes = [[1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]];
let outputNodes = [[],[]];
let weights = [[-1, 1, 1], [0, 1, 1]];

function setup() {
    createCanvas(400, 400);
    noLoop();
    textSize(32);
    colorMode(HSB, 360, 1, 1, 1);
    strokeWeight(0);
}

function draw() {
    background(255);
    for (let i = 0; i < 4; i++) {
        drawNode(inputNodes[i][1], 0, i);
        fill(0, 1, 0.1 + inputNodes[i][2]);
        ellipse(175, 70 + 75 * i, 50, 50);
        drawNode(inputNodes[i][2], 1, i);
        //here the response for the neuron is computed
        outputNodes[0][i] = threshold(inputNodes[i][0] * weights[0][0] + inputNodes[i][1] * weights[0][1] + inputNodes[i][2] * weights[0][2]);
        drawNode(outputNodes[0][i], 2, i);
        outputNodes[1][i] = threshold(inputNodes[i][0] * weights[1][0] + inputNodes[i][1] * weights[1][1] + inputNodes[i][2] * weights[1][2]);
        drawNode(outputNodes[1][i], 3, i);
    }
    setText()
}

function drawNode(fillValue, column, row) {
    let startPoint = [100, 70]
    let padding = 75
    let radius = 50
    fill(0, 1, 0.1 + fillValue);
    ellipse(startPoint[0] + padding * column, startPoint[1] + padding * row, radius, radius);
}

function setText() {
    text("x 1", 80, 25);
    text("x 2", 155, 25);
    text("and", 225, 25);
    text("or", 310, 25);
}

function threshold(input) {
    if (input > 0)
        return 1;
    else
        return 0;
}
