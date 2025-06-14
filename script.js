/*
    A function is simply a block of code that can be called/reused.
    
    A function can accept parameters and return value. Functions also follow the
    same rules used to name variables.
*/

// Example of a function
function callMe() {
    console.log("Hello viewer");
}

// The function above can be called like this:
callMe();

// "callMe" is the name you give to the function.
// The "callMe" function can also be called more then once.

/*
    A function can accept parameters and use those parameters. Example:
*/

// Example 1
function callWithParameter(nameParam) {
    console.log("Hello, my name is", nameParam);
}

callWithParameter("Victor"); // Output "Hello, my name is Victor"
// "Victor" is called an argument.
// nameParam is assigned the value of "Victor" at runtime.

// Example 2
function callWithParameter2(nameParam, countryParam) {
    console.log("Hello, my name is", nameParam, "and I stay in", countryParam);
}
// Here, multiple parameters are passed to a function.
// Here is how to call you below.
callWithParameter2("Victor", "Nigeria");


