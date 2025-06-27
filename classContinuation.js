/*
    We wil talk about some key concepts in OOP.
    Those key concepts are:
    1. Inheritance
    2. Polymorphism
    3. Encapsulation
    4. Abstraction
    
*/

/*
    Inheritance: The ability of a child class to posess characteristics
    of it's parent class.
*/

// Example

class Phones {
    constructor () {
        this.hasScreen = true;
        this.hasCharger = true;
        this.hasCamera = true;
    }
}

class TinoPhone extends Phones {
    constructor() {
        super();
        this.rareCameraPixels = "20px";
        this.frontCameraPixels = "10px";
        this.color = "black";
    }
}

const myTinoPhone = new TinoPhone();

console.log(myTinoPhone.color); // black
console.log(myTinoPhone.hasScreen); // true

/*
    Phone is a parent class while TinoPhone is a child class. TinoPhone class when instantiated
    inherits properties of it's parent's class.
*/

/*
    Polymorphism: "Poly" means many while "morph" means form. So when something is said to be
    polymorphic, it means it exists in many form. For example there are many forms of phones.
    So all brands of phones can be thought of as different form of the phone.
*/

// Example

class IterPhoneY20 extends TinoPhone {
    constructor(color) {
        super();
        this.rareCameraPixels = "20px";
        this.frontCameraPixels = "10px";
        this.color = color;
    }
}

class IterPhoneZ50 extends TinoPhone {
    constructor(color) {
        super();
        this.rareCameraPixels = "40px";
        this.frontCameraPixels = "14px";
        this.color = color;
    }
}

class IterPhoneA200 extends TinoPhone {
    constructor(color) {
        super();
        this.rareCameraPixels = "60px";
        this.frontCameraPixels = "28px";
        this.color = color;
    }
}

/*
    You see above that a phone brand names IterPhone has different makes of their phone, Iter Phone
    Y20, Z50 and A200.
    Iter Phone exists in many make (form).
*/

/*
   Encapsulation: This is the concept that has to do with having everything that has to do with a class
   inside that class. E.g al the properties and methods of that concerns phone is inside the phone class.
   Remember, in functional programming you just write your functions wherever you want to write them,
   but in OOP, you have all the methods and properties of a class inside the class it's concerned with.
*/

/*
    Abstraction: Abstraction has to do with hiding details of a class inside that class so that those
    details can not be directly accessed when an instance of that class is being created.
    In JavaScript classes this has to do with creating private properties and private methods.
*/

// Example
class BankAccount {

    #balance;

    constructor(customerName, initialBalance, accountType) {
        this.customerName = customerName;
        this.#balance = initialBalance;
        this.accountType = accountType;
    }

    #triggerWithdraw(amount) {
        this.#balance -= amount;
    }

    withdraw(amount) {
        if(this.#balance - amount < 0) {
            throw new Error("Insufficient balance");
        }
        this.#triggerWithdraw(amount);
        return {
            message: "Withdraw successful",
            newBalance: this.#balance
        }
    }
}

const myBankAccount = new BankAccount("Victor", 2000, "savings");

console.log(myBankAccount.withdraw(1000));
console.log(myBankAccount.withdraw(4000));
