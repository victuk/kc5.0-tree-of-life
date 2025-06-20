/*
    Conditional Statements
    Conditional statements are statements used to alter the flow of a
    program based on specified condition(s).

    In JavaScript we have two types of conditional statements.
    1. If-else conditional statement.
    2. Switch statement
*/

if(4 > 2) {
    console.log("4 is greater than two");
}
// Above is an if statement without a else statement

if(4 > 2) {
    console.log("4 is greater than two"); // Will execute if condition is true
} else {
    console.log("Condition is false"); // Will execute if condition is false
}

/*
    If els statement can be used to check for multiple conditions if its chained with
    multiple else if statements. Check for an example below:
*/

const studentScore = 80;

if(studentScore > 100 || studentScore < 0) {
    console.log("Invalid student score");
} else if (studentScore >= 80 && studentScore <= 100) {
    console.log("Excellent");
} else if(studentScore >= 70 && studentScore < 80) {
    console.log("Very Good");
} else if(studentScore >= 60 && studentScore < 70) {
    console.log("Good");
} else if (studentScore >=50 && studentScore < 60) {
    console.log("Average");
} else {
    console.log("Fail");
}

/*
    Switch statements are used to compare exact values rather than a range of values.
    See example below:
*/

const dayOfTheWeek = "Monday";

switch(dayOfTheWeek) {
    case "Monday":
        console.log("Hello Monday, I wish work resumes on Tuesday.");
    break;
    case "Tuesday":
        console.log("Hello Tuesday");
    break;
    case "Wednesday":
        console.log("Hello Wednesday");
    break;
    case "Thursday":
        console.log("Hello Thursday");
    break;
    case "Friday":
        console.log("Hello Friday, TGIF");
    break;
    case "Saturday":
        console.log("Hello Saturday, let me wash my clothes and cleanup");
    break;
    case "Sunday":
        console.log("Hello Sunday, we meet in church");
    break;
}


/*
    Loops
    A loop is simply a repition of a particular action. An iteration can be referred to
    the number of times a command has to be executed to complete the loop. E.g A loop to print
    "Hello World" 3 times has 3 iterations.

    Types of loops in JavaScript
    1. For loop
    2. While loop
    3. Do-while loop

    For Loop
    This loop as the name suggests is used to make something happen for a number of times.
    Here is the basic structure of a for loop:
    for(start; stop; step) {
        // Statements
    }
    
    See an example of a for loop to print numbers from 1 to 10 below:
*/

for(let i = 1; i <= 10; i++) {
    console.log(i);
}


