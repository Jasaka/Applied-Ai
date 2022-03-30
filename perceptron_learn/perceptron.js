// initialise input variables
let x = [
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 1]
];
let w = [1,1,1];
//buffer of old weights just for
let w_old = [0, 0, 0];
let d_w = [0, 0, 0];
//the four expected outcomes, for the or function truth table
let y = [0, 0, 0, 1];
let ctr = 0;
//
let learn_rate = 0.3;
//controls for interaction
let pause = false;
let step = true;
let next = true;
//position of the nodes
let input_layer_x = 50;
let input_layer_y = 50;
let input_layer_y_step = 90;
let output_layer_x = 200;
let output_layer_y = input_layer_y+input_layer_y_step;

function setup() {
    cnv = createCanvas(300, 500);
    //w = [random(-1, 1), random(-1, 1), random(-1, 1)]
    w = [1, 1, 1];
    frameRate(1);
    colorMode(HSB, 360, 1, 1, 1);
    background(0, 0, 1);
}

function draw() {
    if (!pause) {
        if (!step | next) {
            background(255);
            next = false;
            ctr++;
            // use modulo 4 to step through the 4 possible combinations one after another
            ctr = ctr % 4;
            //compute the response of the output neuron
            out = threshold(x[ctr][0] * w[0] + x[ctr][1] * w[1] + x[ctr][2] * w[2]);
            //compute the error between the expected outcome y[ctr] and the result of the previous comp.
            error = y[ctr] - out;
            //adapt the weights towards the input vector if there is an error
            for (j = 0; j < 3; j++) {
                d_w[j] = learn_rate * error * x[ctr][j];
                w[j] = w[j] + d_w[j];
            }
            //draw the network
            for (j = 0; j < 3; j++) {
                noFill();
                strokeWeight(10 + 5 * w[j]);
                stroke(160 + w[j] * 180, .5, .8);
                bezier(input_layer_x , input_layer_y + input_layer_y_step * j, input_layer_y_step, input_layer_y + input_layer_y_step * j, output_layer_x, input_layer_y + input_layer_y_step * j, output_layer_x, output_layer_y);
                strokeWeight(1);
                stroke(0, 1, 0);
                strokeWeight(0);
                fill(20, 1, 0.2 + x[ctr][j]);
                ellipse(input_layer_x, input_layer_y + input_layer_y_step * j, 50, 50);
                stroke(0);
                fill(0);
                text("w_" + j + "= " + w[j], input_layer_x+40, 40 + input_layer_y_step * j);
            }
            strokeWeight(abs(error)*6);
            stroke(200,1,1,1);
            fill(20, 1, 0.2 + out);
            ellipse(output_layer_x, output_layer_y, 50, 50);
            fill(0,1,0);
            strokeWeight(0);
            text("type n for next step, r for running, p for pause",10, height-200 );
            text("s for step-mode", 10, height-170 )
        }
    }
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