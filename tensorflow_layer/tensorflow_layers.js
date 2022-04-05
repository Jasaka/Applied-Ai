let inputNodes = [
    new Node(new Coordinate(50, 75), "off", new Label("x", "0")),
    new Node(new Coordinate(50, 150), "on", new Label("x", "1")),
    new Node(new Coordinate(50, 225), "off", new Label("x", "2"))
];

let firstLayer = [
    new Node(new Coordinate(150, 75), "off", new Label("y", "0")),
    new Node(new Coordinate(150, 150), "on", new Label("y", "1")),
    new Node(new Coordinate(150, 225), "off", new Label("y", "2"))
];

let secondLayer = [
    new Node(new Coordinate(250, 75), "off", new Label("z", "0")),
    new Node(new Coordinate(250, 150), "on", new Label("z", "1")),
    new Node(new Coordinate(250, 225), "off", new Label("z", "2"))
];

const verbose = false

let model = tf.sequential()
let singleLayer = tf.layers.dense({
    units: 3,
    inputShape: [3],
    activation: 'hardSigmoid',
    useBias: false
});

let anotherLayer = tf.layers.dense({
    units: 3,
    inputShape: [3],
    activation: 'hardSigmoid',
    useBias: false
});

model.add(singleLayer);
model.add(anotherLayer);
model.summary()
model.compile({
    loss: 'meanSquaredError',
    optimizer: tf.train.sgd(45.5)
});

let input = tf.tensor([
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 1]
], [4, 3]);

let output = tf.tensor([
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 1],
    [1, 1, 0]
], [4, 3]);

model.fit(input, output, {
    batchSize: 4,
    epochs: 500,
    callbacks: {
        onEpochEnd: (epoch, logs) => {
            if (verbose) {
                console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
            }
        }
    }
}).then(result => {
    let testTensor = tf.tensor([1, 0, 0], [1, 3]);

    console.log("Training finished");

    let prediction = model.predict(testTensor);
    prediction.print();

    testTensor = tf.tensor([1, 0, 1], [1, 3]);
    prediction = model.predict(testTensor);
    prediction.print();

    testTensor = tf.tensor([1, 1, 0], [1, 3]);
    prediction = model.predict(testTensor);
    prediction.print();

    testTensor = tf.tensor([1, 1, 1], [1, 3]);
    prediction = model.predict(testTensor);
    prediction.print();

});

function setup() {
    const canvas = createCanvas(500, 500);
    frameRate(1);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 100);
    drawInertNetwork([inputNodes, firstLayer, secondLayer]);
}

function draw() {
}

