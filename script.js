/*
    JavaScript Promises
    A promise in JavaScript represents an eventual completion or failure of an operation.
    Promises helps by not allowing long running tasks to halt/block the execution of other
    tasks.

    Here is an example of how to write a promise in JavaScript below
*/

const myFulfilledPromise = new Promise((resolve, reject) => {
    resolve("My promise has been resolved/fulfilled");
});

const myRejectedPromise = new Promise((resolve, reject) => {
    reject("My promise has failed/been rejected");
});

/*
    How do you then use/call the promise you've written up there?
    There are two popular ways:
    1. Using then-able functions
    2. Using async/await

    Here's how below using thenable function;
*/

myFulfilledPromise.then((result) => {
    console.log(result);
});

myRejectedPromise.catch((error) => {
    console.log(error);
});
// When your promise rejects, the result of the reject will be thrown as an error.
// If you don't have a .catch statement then you'll get an Unhandled exception error.

/*
    How to call/consume your promise using async/await:
*/

async function condumeMyPromise() {
    try {
        const resolvedPromiseResult = await myFulfilledPromise;
        console.log(resolvedPromiseResult);
        await myRejectedPromise;
    } catch (error) {
        console.log(error);
    }
}

condumeMyPromise();

/*
    Callback hell
    Callback hell is created when callbacks are nested inside other callbacks, this can be
    illustrated with calling multiple nested promises below:
*/

myFulfilledPromise.then((res) => {
    console.log(res);
    myRejectedPromise.catch((error) => {
        console.log(error);
    });
});

// The code above is less readable because the promises are nested. A better way to call/use
// promises is by using an async function that's wrapped in a try-catch statement.
