let random = require("./random");
const LivingCreature = require("./class.main");

module.exports =class Vilt extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 16;
    }

    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char1, char2) {
        this.getNewDirections();
        return super.chooseCell(char1, char2);
    }

    mul(multForVilt) {
        var empty = random(this.chooseCell(0));
        if (empty && this.energy > multForVilt) {
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 4;
            var newVilt = new Vilt(newX, newY, 4);
            viltArr.push(newVilt);
            this.energy = 10;
        }
    }

    eat() {
        var food = random(this.chooseCell(1));
        if (food) {
            matrix[this.y][this.x] = 0;
            var newX = food[0];
            var newY = food[1];
            matrix[newY][newX] = 4;
            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.energy += 3
        }
    }

    move() {
        var empty = random(this.chooseCell(1, 0));
        if (empty) {
            matrix[this.y][this.x] = 0;
            var newX = empty[0];
            var newY = empty[1];
            if (matrix[newY][newX] == 0) {
                matrix[newY][newX] = 4;
                this.x = newX;
                this.y = newY;
                this.energy--;
            }
            else {
                for (var i in viltArr) {
                    if (viltArr[i].x == this.x && viltArr[i].y == this.y) {
                        viltArr.splice(i, 1);
                        break;
                    }
                }
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr[i].energy--;
                        break;
                    }
                }
            }
        }
        this.energy--;
    }
    
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in viltArr) {
                if (viltArr[i].x == this.x && viltArr[i].y == this.y) {
                    viltArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
