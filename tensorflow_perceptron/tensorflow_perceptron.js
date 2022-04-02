let inputNodes = [
    new Node(new Coordinate(50, 75), "off", new Label("x", "0")),
    new Node(new Coordinate(50, 150), "on", new Label("x", "1")),
    new Node(new Coordinate(50, 225), "off", new Label("x", "2"))
];

let outputNodes = [
    new Node(new Coordinate(150, 112), "off", new Label("y", "0"))
];

let inputVariables = tf.tensor([
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 1]
]);
console.log("Input Variables: ");
inputVariables.print(true);

const learningRate = tf.scalar(0.3);
console.log("Learning Rate: ");
learningRate.print(true);

let weights = tf.tensor([[1], [1], [1]]);
console.log("Weights: ");
weights.print(true);

const expectedOutput = tf.tensor([[0], [0], [0], [1]]);
console.log("Expected Output: ");
expectedOutput.print(true);

function setup() {
    const canvas = createCanvas(500, 500);
    frameRate(1);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 1);
}

function draw() {
    background(0, 0, 100);
    console.log("Iterating: ");

    drawNodes(inputNodes);
    drawNodes(outputNodes);

    perceptronOperations();
}

function perceptronOperations() {
    console.log("Compute outputNeuron:");
    let outputNeuron = inputVariables.matMul(weights).step();
    outputNeuron.print(true);

    console.log("Compute Error:");
    let error = expectedOutput.sub(outputNeuron);
    error.print(true);

    console.log("Compute Delta:");
    let delta = learningRate.mul(inputVariables.transpose().matMul(error));
    delta.print(true);

    console.log("Update Weights:");
    weights = weights.add(delta);
    weights.print(true);
}
