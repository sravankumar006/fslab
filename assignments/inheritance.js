// SINGLE INHERITANCE
console.log("Single Inheritance:----------------");

class Animal {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(`${this.name} is eating.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log(`${this.name} is barking.`);
    }
}

const myDog = new Dog("Rocky");
myDog.eat();
myDog.bark();


// MULTILEVEL INHERITANCE
console.log("\nMultilevel Inheritance:----------------");

class Vehicle {
    move() {
        console.log("Moving forward.");
    }
}

class Bike extends Vehicle {
    wheels() {
        console.log("Bike has 2 wheels.");
    }
}

class Car extends Bike {
    windows() {
        console.log("Car has 4 windows.");
    }
}

const myCar = new Car();
myCar.move();
myCar.wheels();
myCar.windows();


// HIERARCHICAL INHERITANCE
console.log("\nHierarchical Inheritance:----------------");

class User {
    constructor(username) {
        this.username = username;
    }

    login() {
        console.log(`${this.username} logged in.`);
    }
}

class Admin extends User {
    deleteUser() {
        console.log(`${this.username} deleted a user.`);
    }
}

class Customer extends User {
    checkout() {
        console.log(`${this.username} checked out successfully.`);
    }
}

const admin = new Admin("Karthik");
const customer = new Customer("Ram");

admin.login();
customer.login();
admin.deleteUser();
customer.checkout();

// MULTIPLE INHERITANCE (MIXINS)
console.log("\nMultiple Inheritance (Using Mixins):----------------");

// Mixin 1
const Hall = {
    sofa() {
        console.log("Sofa is placed in Hall.");
    },

    tv() {
        console.log("TV is placed in Hall.");
    }
};

// Mixin 2
const BedRoom = {
    bed() {
        console.log("Bed is in Bedroom.");
    },

    closet() {
        console.log("Closet is in Bedroom.");
    }
};

class Building {
    constructor(houseNo) {
        this.houseNo = houseNo;
    }

    house() {
        console.log(`Building House No: ${this.houseNo}`);
    }
}

class Area extends Building {
    constructor(houseNo, area) {
        super(houseNo);
        this.area = area;
    }

    showArea() {
        console.log(`Area: ${this.area}`);
    }
}

// Apply Mixins
Object.assign(Area.prototype, Hall, BedRoom);

const myArea = new Area("101", "MVP Colony");

myArea.house();
myArea.showArea();
myArea.sofa();
myArea.tv();
myArea.bed();
myArea.closet();


