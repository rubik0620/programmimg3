socket = io();
var side = 40, m = 30, n = 22;
var grassColor = "#04EB00";
multForGrass = 8;
multForGrassEater = 10;
multForPredator = 10;
multForVilt = 15;



function setup() {
    frameRate(60);
    createCanvas(m * side, n * side);
    background('#acacac');
    button1 = document.getElementById("summer");
    button2 = document.getElementById("winter");
    button1.addEventListener("click", onColorChange);
    button2.addEventListener("click", onColorChange);
}

function onColorChange() {
    if (event.target.id == "summer") {
        grassColor = "#04EB00";
        multForGrass = 8;
        multForGrassEater = 10;
        multForPredator = 10;
        multForVilt = 15;
    }
    else if (event.target.id == "winter") {
        grassColor = "#00C1C9";
        multForGrass = 12;
        multForGrassEater = 13;
        multForPredator = 13;
        multForVilt = 24;
    }
    let data = {
        multForGrass: multForGrass
    }
    let data1 = {
        multForGrassEater: multForGrassEater
    }
    let data2 = {
        multForPredator: multForPredator
    }
    let data3 = {
        multForVilt: multForVilt
    }
    socket.on("matrix", drawMatrix);
    socket.emit("afterClick", data);
    socket.emit("afterClick", data1);
    socket.emit("afterClick", data2);
    socket.emit("afterClick", data3);
}

function drawMatrix(data) {
    matrix = data.matrix;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(grassColor);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("#fd1f1f");
            }
            else if (matrix[y][x] == 4) {
                fill("#FFAA34");
            }
            else if (matrix[y][x] == 5) {
                fill("#B000B0");
            }
            rect(x * side, y * side, side, side);
        }
    }
}
socket.on("matrix", drawMatrix);