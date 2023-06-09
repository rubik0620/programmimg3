class Predator {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 5;
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
    mul() {
        var empty = random(this.chooseCell(0));
        if (empty && this.energy > 10) {
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 3;
            var newPredator = new Predator(newX, newY, 3);
            predatorArr.push(newPredator);
            this.energy = 5;
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
            this.energy += 2
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
        this.energy--;
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
