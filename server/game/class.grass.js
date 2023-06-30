let random = require("./random");

const LivingCreature = require("./class.main");
module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
        this.canReproduce = true; 
    }

    chooseCell(character) {
        return super.chooseCell(character);
    }

    mul(multForGrass) {
        if (!this.canReproduce) {
            return;
        }
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= multForGrass) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
            this.canReproduce = false; 

            setTimeout(() => {
                this.canReproduce = true;
            }, 10000); 
        }
    }
};
