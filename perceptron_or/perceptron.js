//example code for a btework computing the or function

//array with all possible combination for the three expressions
let x = [[1, 0, 0],[1, 0, 1], [1, 1, 0],[1, 1, 1]];
let y =[];
//weight combination for realizing the or function
let w=[0,1,1];
function setup() {
    createCanvas(400, 400);
    noLoop();
}

function draw() {
    background(255);
    colorMode(HSB, 360, 1, 1, 1);
    strokeWeight(0);
    //compute the perceptron response for all 4 combinations of the truth table
    for (i = 0; i < 4; i++) {
	fill(0, 1, 0.1 + x[i][1]);
	ellipse(100, 70 + 75 * i, 50, 50);
	fill(0, 1, 0.1 + x[i][2]);
	ellipse(175, 70 + 75 * i, 50, 50);
	//here the response for the neuron is computed
	y[i] = threshold(x[i][0] * w[0] + x[i][1] * w[1] + x[i][2] * w[2]);
	fill(0,1,0.1+ y[i]);
	ellipse(275,70+75*i,50,50);
    }
    textSize(32);
    strokeWeight(0);
    //noFill();
    text("x 1", 80, 25);
    text("x 2", 160, 25);
    text("y ", 260, 25);
}

function threshold(input) {
    if (input > 0)
	return 1;
    else
	return 0;
}
