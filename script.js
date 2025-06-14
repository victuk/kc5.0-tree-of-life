/*
    A variable can be defined as a named container or memory space that can hold value.
    You declare variables using the var or let keyword.
*/

var greetEveryone = "Hello world" // Example 1
let variable200 = 200 // Example 2

/*
    A constant is a special kind of variable that is not allowed to/does not change at run at runtime.
*/

const iAmAConstant = "I can not be changed during runtime" // Example of a constant

/*
    Variable Naming:
    1. A variable can't start with a digit but can contain and/or end with a digit/digits.
    2. A variable can't contain special characters like brackets, curly braces, asterisks, etc.
    3. A variable can start with/contain a dollar symbol ($) or/and an underscore.
    4. A variable can't contain space.
*/

/*
    Data Types
    1. String
    2. Number
    3. Boolean
    4. Array
    5. Object
    6. Null
    7. BigInt
    8. Undefined
    9. Symbol

    We will treat Strings, Numbers and boolean for this lesson

    String:
    A string is a set of characters enclosed in either single/double quotes or backticks.

    Number:
    A number is a set of numeric values including -Infinity, Infinity and NaN.
*/

const num1 = 50; // Example 1
const num2 = 3.142; // Example 2
const notANumber = NaN; // Try this
console.log(typeof(notANumber)); //It tells you NaN is a "number" type right

// Another way to generate an NaN value is by using non-numeric characters in
// mathematical expressions

const notANumber2 = "hello" / 200; // Hello divided by 200
console.log(notANumber2); // Output will be NaN
console.log(typeof(notANumber2)); // Output will be NaN

/*
    Boolean
    A boolean is simply a true or false value.
*/

const boolean1 = true;
const boolean2 = false;

/*
    You generate boolean values by comparing two values.
*/

const comparison1 = 5 > 2; //Example
console.log(comparison1); // Output will be false

/*
    Comparison symbols
    > -- Greater than
    < -- Less than
    >= -- Greater than or equal to
    <= -- Less than or equal to
    == -- Equal to (checks if both operands are equal in value)
    === -- Equivalent to (checks if both operands are equal in value and data type)
    != -- Not equal to (checks if both operands are not equal in value)
    !== -- Not equivalent to (checks if both operands are not equal in value and data type)
*/

// Difference between == and ===

console.log(5 == "5"); // Will output true
console.log(5 === "5"); // Will output false

/*
    Logical operators
    Logical operator are used to chain multiple comparison statements.

    AND logical operator (&&): This logical operator returns true only if
    all its operands returns true.

    AND truth table (for two operands/inputs and one output)
    Input 1         Input 2         Output
    True            True            True
    True            False           False
    False           True            False
    False           False           False

*/

// Examples
console.log(5 == 5 && 10 > 8); // Returns true
console.log(5 == 5 && 5 > 20); // Returns false

/*
    OR logical operator (||): This logical operator returns true
    if at least one of it's operands resolves to true

    OR truth table (for two operands/inputs and one output)
    Input 1         Input 2         Output
    True            True            True
    True            False           True
    False           True            True
    False           False           False
*/

// Examples
console.log(5 == 5 && 10 > 8); // Returns true
console.log(5 == 5 && 5 > 20); // Returns true


