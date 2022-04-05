let scalarOne = tf.scalar(3.14)
let scalarTwo = tf.scalar(2.718);
let vectorOne = tf.tensor1d([1, 1]);
let vectorTwo = tf.tensor1d([0, 2]);
let matrixOne = tf.tensor2d([[1, 3], [2, 2]]);
let matrixTwo = tf.tensor2d([[0, 2], [0, 2]]);

//p5 setup code
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    textSize(16);
    noLoop();
    printTensors()
    scalarOperations()
    vectorOperations()
    matrixOperations()
}


function printTensors() {
    textSize(16);
    text("scalarOne:" + scalarOne.toString(), 10, 50);
    text("scalarTwo:" + scalarTwo.toString(), 10, 90);
    text("vectorOne:" + vectorOne.toString(), 10, 140);
    text("vectorTwo:" + vectorTwo.toString(), 10, 180);
    text("matrixOne:" + matrixOne.toString(), 10, 240);
    text("matrixTwo:" + matrixTwo.toString(), 10, 300);
}

function scalarOperations() {
    // add both scalar tensors and log the scalars with the result
    let scalarSum = scalarOne.add(scalarTwo);
    text("scalarSum:" + scalarSum.toString(), 250, 50);
    // multiply both scalar tensors and log the scalars with the result
    let scalarProduct = scalarOne.mul(scalarTwo);
    text("scalarProduct:" + scalarProduct.toString(), 250, 100);
    // subtract both scalar tensors and log the scalars with the result
    let scalarDifference = scalarOne.sub(scalarTwo);
    text("scalarDifference:" + scalarDifference.toString(), 250, 150);
}

function vectorOperations() {
    // multiply scalar and vector using tensorflow_mnist.js and log the result
    let scalarVectorProduct = vectorOne.mul(scalarOne);
    text("vectorSum:" + scalarVectorProduct.toString(), 490, 50);
    // add two vectors using tensorflow_mnist.js and log the result
    let vectorSum = vectorOne.add(vectorTwo);
    text("vectorSum:" + vectorSum.toString(), 490, 100);
    // subtract two vectors using tensorflow_mnist.js and log the result
    let vectorDifference = vectorOne.sub(vectorTwo);
    text("vectorDifference:" + vectorDifference.toString(), 490, 150);
    // multiply two vectors using tensorflow_mnist.js and log the result
    let vectorProduct = vectorOne.mul(vectorTwo);
    text("vectorProduct:" + vectorProduct.toString(), 490, 200);
    // outer product of two vectors using tensorflow_mnist.js and log the result
    let vectorOuterProduct = tf.outerProduct(vectorOne, vectorTwo);
    text("vectorOuterProduct:" + vectorOuterProduct.toString(), 490, 250);
    // dot product of two vectors using tensorflow_mnist.js and log the result
    let vectorDotProduct = vectorOne.dot(vectorTwo);
    text("vectorDotProduct:" + vectorDotProduct.toString(), 490, 310);
}

function matrixOperations(){
    // multiply a scalar and a matrix using tensorflow_mnist.js and log the result
    let scalarMatrixProduct = matrixOne.mul(scalarOne);
    text("matrixSum:" + scalarMatrixProduct.toString(), 730, 50);
    // add two matrices using tensorflow_mnist.js and log the result
    let matrixSum = matrixOne.add(matrixTwo);
    text("matrixSum:" + matrixSum.toString(), 730, 110);
    // multiply two matrices using tensorflow_mnist.js and log the result
    let matrixProduct = matrixOne.matMul(matrixTwo);
    text("matrixProduct:" + matrixProduct.toString(), 730, 170);
    // multiply two matrices elementwise using tensorflow_mnist.js and log the result
    let matrixElementwiseProduct = matrixOne.mul(matrixTwo);
    text("matrixElementwiseProduct:" + matrixElementwiseProduct.toString(), 730, 230);
}