/*
    Let's talk about Object oriented programming but before that, let's talk about functions

    What is a function?
    A function is a callable block of code that can accept parameters and return a value;
    Example of a function below:
*/

function functionOne() {
    console.log("Hello");
}
// Here is a function named functionOne
// To call the function you write the following

functionOne(); // This line calls the function. You can call a function more than once.

/*
    A function can also accept parameters and use those parameters.
    Example:
*/

function greet(studentName) {
    console.log(`Hello ${studentName} and welcome to class.`);
}
greet();

// In the greet function above studentName is a parameter
// Functions can accept more than one parameter, depending on how many you want your
// function to accept

/*
    A function can also return result to where it was called.
    A function can contain multiple return statement but can return only once. 
    This means a function can't call return statement more than once in a function.
    Example below
*/

function greet(studentName) {
    return `Hello ${studentName} and welcome to class.`;
}

console.log(greet("Samuel")); // Output: Hello Samuel and welcome to class.

/*
    One advantage of returniing results is that the result of a function can be passed to
    another function or used for other purposes.
    Example below
*/

function greet(studentName) {
    return `Hello ${studentName} and welcome to class.`;
}

function logOutSomething(value) {
    console.log("The value you're logging out::::", value);
}

function capitalizeValue(value) {
    console.log("Value when capitalized will look like this:::", value.toLocaleUpperCase());
}

const result = greet("Martins");

logOutSomething(result);
// Output: The value you're logging out:::: Hello Martins and welcome to class.

capitalizeValue(result);
// Output: Value when capitalized will look like this::: HELLO MARTINS AND WELCOME TO CLASS.


/*
    Callbacks
    A callback can be defined as an anonymous function passed to
    another function as a parameter/an argument.
    Example below:
*/

function greet(studentName, country, cb) {
    let callbackValue = `Hello ${studentName} and welcome to class.`;
    cb(callbackValue, country, "You get it now?");
}
// Notice that the callback function is called inside the greet function.
// So when greet function is executed it will also call the callback function (the "cb" parameter in
// the greet function).

greet("Christianah", "Nigeria", function(val, countryParameter, myQuestion) {
    console.log("Callback function value::::", val); // Output: Callback function value:::: Hello Christianah and welcome to class.
    console.log("You specified", countryParameter, "as your country"); // You specified Nigeria as your country
    console.log("My question is::::", myQuestion); // Output: My question is:::: You get it now?
});

// The code above is an example of how you will call the greet function.
// Notice that the 3rd parameter is a function.

/*
    Arrow functions
    An arrow funcion is a type of anonymous function added in the ES6 syntax that allows you call
    define a function with an arrow-like symbol in it.
    Here is an example of an arrow function below:
*/

const fn = (parm1, parm2) => {

}
// This is how to define an arrow function. Note, an arrow function is anonymous.
// Notice that the function on it's own doesn't have a name but it's assigned to a
// variable as a value.

fn("argument 1", "argumant 2");
// This his how to call an anonymous function. You call the function by the variable
// name attached to it.


/*
    Here is a revision of JavaScript promise and how it can be called in case you forget
    how to define/use it.
*/

const myPromise = new Promise((resolve, reject) => {
    let a = 20;
    a % 2 == 0 ? resolve("It's even") : reject("It's odd");
});


// Using then-able function
myPromise.then((result) => {
    console.log("Result:::", result);
    console.log("I'm carrying out other activities");
}).catch((error) => {
    console.log("The error:::::", error);
}).finally(() => {
    console.log("I am finally free");
});


// Using async function
async function executePromise() {
    try {
        const promiseResult = await myPromise;
        console.log(promiseResult);
    } catch (error) {
        console.log("Reason for rejection::::", error);
    } finally{
        console.log("I finally executed");
    };
}

executePromise();


/*
    Object Oriented Programming
    OOP as it's called is a paradigm in programming used to
    structure your code design into classes/objects.
    
    Before now what we've been doing is functional programming, in functional programming you use
    functions and variables to build your logic.
    In OOP you use classes and objects to house your logic.

    What is a class?
    A class is a blueprint for the object that's to be created.
    A class can contain properties, methods and a constructor method.
    A constructor is a special kind of method that is executed when an instance of
    a class is being created.

    What is an object in OOP?
    An object is an instance of a class. You create an object instance of a class by using the
    "new" keyword followed by the name of the class and a pair of parentheses.

    Example below
*/

class MyFirstClass {
    balance = 0;

    checkMyBalance() {
        return this.balance;
    }
}
// With the code above you've declared/created a class. Now the next thing to do is to create
// an instance of the class.

const c1 = new MyFirstClass(); // c1 is an object instance created from the "MyFirstClass" class.

// To access properties and methods of the class you use the dot notation with the object instance name.
// Example below:

console.log(c1.balance); // Prints the balance property value for the
// "c1" instance of the "MyFirstClass" class.

console.log(c1.checkMyBalance()); // Calls the checkMyBalance function in the
// "c1" instance of the "MyFirstClass" class.

/*
    How do you pass prooperties to an object instance when you're trying
    to create the object instance?

    You use the constructor method to do so. The constructor function is executed
    as soon as an object instance is created. The constructor can accept arguments also.

    Example below:
*/

class MyBank {
    customerName;
    constructor(customerName) {
        this.customerName = customerName;
    }
}

const myBank1 = new MyBank("Victor Peter");
// Victor Peter will be used as customerName when the myBank1 instance of the class MyBank is
// being created.

/*
    You can pass in more parameters to the constructor as required/desired.
*/

// Below are examples of JavaScript classes you can instantiate and pay with.


/*
    MyBankAccount class is a class used to simulate a bank account platform
*/

class MyBankAccount {
    customerName = "";
    occupation = "";
    balance = 0;
    accountType = "";

    constructor (customerName, occupation, initialBalance, accountType) {
        this.customerName = customerName;
        this.occupation = occupation;
        this.balance = initialBalance;
        this.accountType = accountType;
    }
    
    checkBalance() {
        return this.balance;
    }

    profile() {
        return `Hello ${this.customerName} (${this.occupation}), your balance is ${this.balance} and 
        you are operating a ${this.accountType} account`
    }

    deposit(amount) {
        this.balance += amount;
        return "Successful Deposit";
    }

    withdraw(amount) {
        if(this.balance - amount < 0) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
        return "Successful withdrawal"
    }

}



// ===============================================================================================

/*
    The class below is used to simulate aan e-commerce platform.
*/

class Vumia {

    storeName;
    address;
    users = [];
    products = [];

    constructor (storName, address) {
        this.storeName = storName;
        this.address = address;
    }

    register (fullName, email, userType) {

        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i].email == email) {
                throw new Error("Email is already used");
            }
        }
        this.users.push({id: Date.now(), fullName, email, userType});
        return `${fullName} registered successfully`;
    }

    addProduct(productName, cost, ownerId) {
        this.products.unshift({id: Date.now(), ownerId, productName, cost});
        return `${productName} added successfully`;
    }

    removeProduct(id, ownerId) {
        const updatedProducts = [];

        for(let i = 0; i < this.products.length; i++) {
            if(this.products[i].id != id) {
                updatedProducts.push(this.products[i]);
            } else {
                if(this.products[i].ownerId == ownerId) {
                    continue;
                }
                throw new Error("You can't delete this product as you are not the owner");
            }
        }
        this.products = updatedProducts;
        return "Product deleted successfully";
    }

    viewProducts () {
        return this.products;
    }

    vewOneProduct(id) {
        for(let i = 0; i < this.products.length; i++) {
            if(this.products[i].id == id) {
                return this.products[i];
            }
        }
        throw new Error("Product not found");
    }
}
