img = "";
status = "";
object = [];

function preload() {
    img = loadImage("TV.jpeg");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    objectdetector = ml5.objectDetector('cocossd' , modelloaded )
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelloaded() {
    console.log("model is loaded");
    status = true;
    objectdetector.detect(img, gotresults);
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 400);
    if (status != "") {
        for (i=0; i<object.length; i++) {
            document.getElementById("status").innerHTML = "Loading...";
            fill("#ff1100");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke("#ff1100");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}