var express = require("express");
var fs = require("fs");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



app.use(express.static("../client"));
app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(8000, function () {
    console.log("App is running on port 8000");
});

count = 0
grassArr = [];
grassEaterArr = [];
predatorArr = [];
viltArr = [];
parartArr = [];
fireArr = [];

Fire = require("./game/class.fire");
Grass = require("./game/class.grass");
GrassEater = require("./game/class.grassEater");
Predator = require("./game/class.predator");
Vilt = require("./game/class.vilt");
Parart = require("./game/class.parart");
let random = require("./game/random");

multForGrass = 8;
multForGrassEater = 10;
multForPredator = 10;
multForVilt = 15;

io.on("connection", function (socket) {
    socket.on("afterClick", function (data) {
        multForGrass = data.multForGrass
    });
    socket.on("afterClick", function (data1) {
        multForGrassEater = data1.multForGrassEater
    });
    socket.on("afterClick", function (data2) {
        multForPredator = data2.multForPredator
    });
    socket.on("afterClick", function (data3) {
        multForPredator = data3.multForPredator
    });
    setInterval(drawForBackend, 5000);
});

matrix = [
    [1, 1, 1, 2, 1, 2, 1, 2, 3, 2, 1, 2, 0, 5, 1, 0, 2, 3, 2, 1, 0, 1, 1, 0, 2, 3, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 2, 3, 2, 1, 0, 3, 4, 2, 3, 2, 1, 0, 0, 1, 4, 3, 2, 1, 1, 0, 5, 0, 2, 3, 2],
    [0, 0, 1, 1, 0, 2, 3, 1, 0, 1, 1, 0, 2, 3, 1, 1, 1, 0, 0, 1, 2, 3, 5, 0, 2, 4, 2, 1, 1, 0],
    [1, 4, 0, 5, 4, 1, 0, 2, 3, 1, 2, 3, 2, 4, 0, 3, 0, 1, 5, 4, 0, 3, 1, 2, 5, 1, 0, 1, 4, 1],
    [0, 1, 1, 1, 0, 2, 3, 2, 1, 0, 3, 5, 1, 3, 2, 1, 1, 0, 1, 0, 1, 2, 0, 4, 0, 5, 1, 0, 3, 0],
    [1, 0, 1, 2, 1, 3, 5, 1, 0, 4, 1, 4, 2, 3, 1, 2, 5, 3, 0, 4, 5, 0, 1, 1, 2, 3, 1, 1, 2, 2],
    [0, 1, 2, 5, 1, 2, 3, 2, 1, 1, 3, 0, 2, 3, 2, 1, 0, 3, 1, 3, 1, 1, 1, 0, 0, 1, 0, 2, 3, 1],
    [1, 1, 0, 1, 1, 1, 0, 2, 3, 1, 0, 2, 3, 2, 1, 2, 1, 1, 4, 0, 5, 1, 0, 2, 3, 1, 1, 5, 0, 0],
    [1, 1, 1, 4, 0, 3, 1, 2, 5, 5, 3, 5, 2, 3, 2, 1, 0, 0, 1, 2, 0, 4, 1, 4, 1, 2, 2, 1, 3, 1],
    [0, 0, 1, 5, 1, 3, 1, 2, 0, 1, 0, 1, 0, 5, 3, 0, 1, 5, 5, 1, 4, 1, 1, 0, 5, 0, 2, 3, 1, 1],
    [1, 1, 0, 5, 1, 1, 5, 2, 3, 1, 2, 3, 2, 4, 0, 3, 0, 1, 0, 1, 1, 2, 3, 2, 1, 1, 3, 1, 4, 0],
    [1, 1, 1, 1, 0, 5, 0, 2, 3, 2, 1, 2, 1, 0, 1, 5, 4, 3, 2, 1, 1, 1, 0, 2, 3, 2, 5, 0, 5, 1],
    [1, 1, 5, 1, 1, 2, 3, 2, 1, 0, 3, 4, 2, 4, 2, 1, 5, 0, 1, 2, 5, 5, 1, 5, 2, 3, 1, 1, 1, 3],
    [1, 0, 1, 1, 0, 2, 3, 1, 1, 1, 1, 1, 2, 3, 1, 5, 1, 5, 1, 0, 4, 3, 1, 2, 0, 1, 3, 0, 2, 3],
    [1, 1, 0, 5, 5, 1, 0, 2, 3, 1, 2, 3, 2, 1, 4, 3, 5, 1, 5, 1, 0, 2, 3, 2, 1, 5, 1, 1, 2, 0],
    [0, 1, 2, 3, 1, 2, 3, 2, 1, 0, 3, 1, 2, 3, 2, 1, 0, 3, 0, 3, 3, 4, 1, 1, 0, 1, 5, 4, 3, 1],
    [1, 4, 4, 0, 5, 1, 0, 2, 3, 4, 0, 2, 3, 2, 1, 2, 4, 5, 1, 4, 2, 3, 5, 2, 3, 2, 5, 0, 3, 5],
    [1, 1, 1, 5, 1, 3, 1, 2, 1, 5, 3, 1, 2, 3, 2, 5, 1, 0, 5, 2, 1, 5, 1, 1, 2, 5, 1, 1, 1, 1],
    [1, 5, 1, 1, 0, 3, 5, 4, 4, 1, 3, 5, 2, 3, 2, 1, 5, 1, 1, 2, 3, 1, 0, 4, 1, 0, 2, 3, 1, 1],
    [0, 4, 5, 5, 1, 3, 1, 2, 0, 5, 0, 1, 0, 1, 4, 0, 1, 5, 0, 1, 4, 0, 1, 0, 2, 3, 2, 1, 4, 3],
    [1, 1, 0, 1, 0, 4, 5, 2, 3, 5, 2, 4, 2, 5, 0, 3, 4, 1, 1, 5, 1, 5, 4, 5, 3, 5, 4, 4, 2, 1],
    [1, 1, 1, 4, 1, 1, 0, 4, 3, 1, 2, 3, 2, 1, 1, 3, 5, 1, 1, 5, 1, 1, 3, 0, 1, 0, 0, 1, 1, 3],
];

var isFemale = true;
for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            isFemale = !isFemale;
            var grEater = new GrassEater(x, y, 2, isFemale);
            grassEaterArr.push(grEater);
        }
        else if (matrix[y][x] == 3) {
            isFemale = !isFemale;
            var predator = new Predator(x, y, 3, isFemale);
            predatorArr.push(predator);
        }
        else if (matrix[y][x] == 4) {
            var vilt = new Vilt(x, y, 4);
            viltArr.push(vilt);
        }
        else if (matrix[y][x] == 5) {
            var parart = new Parart(x, y, 5);
            parartArr.push(parart);
        }
    }
}

function drawForBackend() {
    for (var i in grassArr) {
        grassArr[i].mul(multForGrass);
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
        grassEaterArr[i].move();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
        predatorArr[i].move();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for (var i in viltArr) {
        viltArr[i].eat();
        viltArr[i].move();
        if (viltArr[i] != undefined) {
            viltArr[i].mul();
            viltArr[i].die();
        }
    }
    for (var i in parartArr) {
        parartArr[i].eat();
        parartArr[i].move();
        if (parartArr[i] != undefined) {
            parartArr[i].mul();
            parartArr[i].die();
        }
    }
    count++
    if (count > 10) {
        var fier = new Fire()
        fier.destroy()
        count = 0
    }
    if (grassEaterArr.length == 0) {
        for (var i = 0; i < 40; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 1
            var greater = new GrassEater(x, y, 1)
            grassEaterArr.push(greater)
        }
    }
    if (predatorArr.length == 0) {
        for (var i = 0; i < 40; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 1
            var pred = new Predator(x, y, 1)
            predatorArr.push(pred)
        }
    }
    if (grassArr.length == 0) {
        for (var i = 0; i < 400; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    if (viltArr.length == 0) {
        for (var i = 0; i < 40; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 1
            var vl = new Vilt(x, y, 1)
            viltArr.push(vl)
        }
    }
    if (parartArr.length == 0) {
        for (var i = 0; i < 80; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 1
            var pr = new Parart(x, y, 1)
            parartArr.push(pr)
        }
    }


    let sendData = {
        matrix: matrix
    }
    statistics = {
        grasses: grassArr.length,
        grassEaters: grassEaterArr.length,
        predators: predatorArr.length,
        vilt: viltArr.length,
        parart: parartArr.length,
    }


    fs.writeFileSync("../client/value/grasses.txt", JSON.stringify(statistics.grasses, undefined, 2));
    fs.writeFileSync("../client/value/grassEaters.txt", JSON.stringify(statistics.grassEaters, undefined, 2));
    fs.writeFileSync("../client/value/predators.txt", JSON.stringify(statistics.predators, undefined, 2));
    fs.writeFileSync("../client/value/vilt.txt", JSON.stringify(statistics.vilt, undefined, 2));
    fs.writeFileSync("../client/value/parart.txt", JSON.stringify(statistics.parart, undefined, 2));


    fs.writeFileSync('statistics.json', JSON.stringify(statistics, undefined, 2));
    mystatistics = fs.readFileSync('statistics.json').toString();
    io.sockets.emit("sendStatistics", JSON.parse(mystatistics));
    io.sockets.emit("matrix", sendData);
}
setInterval(drawForBackend, 500)

