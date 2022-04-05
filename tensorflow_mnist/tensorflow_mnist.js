const verbose = true

let mnistData = new MnistData();


let model = tf.sequential()

let singleLayer = tf.layers.dense({
    units: 10, // 0 - 10
    inputShape: [784], // 28x28
    activation: 'hardSigmoid',
    useBias: false
});

model.add(singleLayer);
model.summary()
model.compile({
    loss: 'meanSquaredError',
    optimizer: tf.train.sgd(45.5)
});


mnistData.load(100, 10).then(trainModel);

function setup() {
    const canvas = createCanvas(500, 500);
    frameRate(1);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 100);
}

function draw() {
}

function trainModel() {
    let [trainData, trainLabels] = mnistData.getTrainData();
    trainData = trainData.reshape([100, 784]);
    model.fit(trainData, trainLabels, {
        batchSize: 1,
        epochs: 10,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                if (verbose) {
                    console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
                }
            }
        }
    }).then(testModel);
}

function testModel() {
    const numberOfTestSamples = 1;
    let [testData, testLabels] = mnistData.getTestData(numberOfTestSamples);
    testData.print(true)
    testData = testData.reshape([numberOfTestSamples, 784]);
    model.predict(testData).print();
    testLabels.print();


}

