let random = require("./random");
const LivingCreature = require("./class.main");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index, isFemale) {
        super(x, y, index);
        this.energy = 5;
        this.isFemale = isFemale; 
        this.canReproduce = true; 
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

    chooseCell(character) {
        this.getNewDirections();
        return super.chooseCell(character);
    }

    mul(multForGrassEater) {
        var empty = random(this.chooseCell(0));
        if (empty && this.energy > multForGrassEater && this.canReproduce) { 
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 2;
            var newGrassEater = new GrassEater(newX, newY, 2, !this.isFemale); 
            grassEaterArr.push(newGrassEater);
            this.energy = 5;
            this.canReproduce = false; 

            setTimeout(() => {
                this.canReproduce = true; 
            }, 5000); 
        }
    }

    eat() {
        var food = random(this.chooseCell(1));
        if (food) {
            matrix[this.y][this.x] = 0;
            var newX = food[0];
            var newY = food[1];
            matrix[newY][newX] = 2;
            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.isFemale) {
                this.energy += 2;
            } else {
                this.energy += 4;
            }
        }
    }

    move() {
        var empty = random(this.chooseCell(0));
        if (empty) {
            matrix[this.y][this.x] = 0;
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 2;
            this.x = newX;
            this.y = newY;
        }
        if (this.isFemale) {
            this.energy -= 3;
        } else {
            this.energy--;
        }
    }

    die() {
        if (this.energy <= 0 && this.isFemale) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
