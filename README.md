# How to start a simple express backend project

Step 1: Create a folder and open that folder

Step 2: Run the command ```npm init``` to initialize a node package and complete the prompt

Step 3: Create an entry point file that has the .js file extension.

Step 4: Install express by typing ```npm install express```

Step 5: Head over to you entry point file, import/initialize express and create a simple route.

```
const express = require("express");

const app = express();

const PORT = 3000

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

```
