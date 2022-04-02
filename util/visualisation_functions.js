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

function drawNodes(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        drawNode(nodes[i]);
        printLabel(nodes[i]);
    }
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

function drawNetwork(currentNetworkIndex, inputNodes, outputNodes) {
    for (let i = 0; i < inputNodes.length; i++) {
        for (let j = 0; j < outputNodes.length; j++) {
            if (currentNetworkIndex === j) {
                if (isLastOutputEqualForWeight(currentNetworkIndex)) {
                    drawConnection("correct", inputNodes[i], outputNodes[j]);
                } else {
                    drawConnection("searching", inputNodes[i], outputNodes[j]);
                }
            } else {
                if (isLastOutputEqualForWeight(1 - currentNetworkIndex)) {
                    drawConnection("correct", inputNodes[i], outputNodes[j]);
                } else {
                    drawConnection("wrong", inputNodes[i], outputNodes[j]);
                }
            }
        }
    }

    for (let i = 0; i < inputNodes.length; i++) {
        drawNode(inputNodes[i]);
        printLabel(inputNodes[i]);
    }

    for (let i = 0; i < outputNodes.length; i++) {
        drawNode(outputNodes[i]);
        printLabel(outputNodes[i]);
    }
}

function printLabel(node) {
    strokeWeight(0);
    fill(255, 0, 100);
    text(node.label.subscript, node.coordinate.x, node.coordinate.y + 10);
    text(node.label.main, node.coordinate.x - 5, node.coordinate.y + 5);
}

function printTutorial(height) {
    strokeWeight(0);
    fill(255, 0, 0);
    text("type n for next step, r for running, p for pause", 10, height - 200);
    text("s for step-mode", 10, height - 170)
}

function printWeights(weights) {
    strokeWeight(0);
    fill(255, 0, 0);
    for (let i = 0; i < weights.length; i++) {
        text(weights[i], outputNodes[i].coordinate.x + 40, outputNodes[i].coordinate.y);
    }
}