let random = require("./random");
const LivingCreature = require("./class.main");

module.exports = class Predator extends LivingCreature {
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

    mul(multForPredator) {
        var empty = random(this.chooseCell(0));
        if (empty && this.energy > multForPredator && this.canReproduce) { 
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 3;
            var newPredator = new Predator(newX, newY, 3, !this.isFemale); 
            predatorArr.push(newPredator);
            this.energy = 5;
            this.canReproduce = false; 

            setTimeout(() => {
                this.canReproduce = true; 
            }, 8000); 
        }
    }

    eat() {
        var food = random(this.chooseCell(2));
        if (food) {
            matrix[this.y][this.x] = 0;
            var newX = food[0];
            var newY = food[1];
            matrix[newY][newX] = 3;
            this.x = newX;
            this.y = newY;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.isFemale) {
                this.energy += 1;
            } else {
                this.energy += 3;
            }
        }
    }

    move() {
        var empty = random(this.chooseCell(0));
        if (empty) {
            matrix[this.y][this.x] = 0;
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 3;
            this.x = newX;
            this.y = newY;
        }
        if (this.isFemale) {
            this.energy -= 2;
        } else {
            this.energy--;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
