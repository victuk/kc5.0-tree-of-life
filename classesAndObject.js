class Car {
    constructor() {
        this.numberOfTyres = 4;
        this.steering = 1;
    }

    getCarProperty () {
        return {
            numberOfTyres: this.numberOfTyres,
            steering: this.steering
        };
    }
}


class Toyota extends Car {
    constructor(color, maxSpeed) {
        super();
        this.canDrift = false;
        this.color = color;
        this.maxSpeed = maxSpeed;
    }

}

class Ferrari extends Car {
    constructor(color, maxSpeed) {
        super();
        this.canDrift = true;
        this.color = color;
        this.maxSpeed = maxSpeed;
    }
}

// const t = new Toyota("blue", "200km/h");

// const f = new Ferrari("black", "400km/hr");

// console.log(t.getCarProperty());
// console.log(f.getCarProperty());


// console.log(t.color);
// console.log(f.color);
