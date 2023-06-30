let random = require("./random");

const LivingCreature = require("./class.main");
module.exports =class Parart extends LivingCreature{
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

    mul() {
        var empty = random(this.chooseCell(0));
        if (empty && this.energy > 15) {
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 5;
            var newParart = new Parart(newX, newY, 5);
            parartArr.push(newParart);
            this.energy = 10;
        }
    }

    eat() {
        var food = random(this.chooseCell(1));
        if (food) {
       
            var newX = food[0];
            var newY = food[1];
           
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr[i].multiply ++
                    break;
                }
            }
            this.energy=0;
        }
    }

    move() {
        var empty = random(this.chooseCell(1, 0));
        if (empty) {
            matrix[this.y][this.x] = 0;
            var newX = empty[0];
            var newY = empty[1];
            if (matrix[newY][newX] == 0) {
                matrix[newY][newX] = 5;
                this.x = newX;
                this.y = newY;
                this.energy--;
            }
            else {
                for (var i in parartArr) {
                    if (parartArr[i].x == this.x && parartArr[i].y == this.y) {
                        parartArr.splice(i, 1);
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
            for (var i in parartArr) {
                if (parartArr[i].x == this.x && parartArr[i].y == this.y) {
                    parartArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
