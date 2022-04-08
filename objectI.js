video = "";
st = "";
objects = [];

function preload() {
    video = createVideo("vid.mp4");
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (st != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status Object Detected";
            document.getElementById("num_ofObjects").innerHTML = "Number of object detected" + objects.length;
            fill("black");
            percent = floor(objects[i].confidence * 100);
            noFill();
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            stroke("black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function identifyObject() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded() {
    console.log("Model is loaded");
    st = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}




































