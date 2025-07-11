const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("postgres://postgres@localhost:5432/todo");


// sequelize.authenticate().then(() => {
//     console.log("Connected to db");
// }).catch((error) => {
//     console.log("Error connecting to database::", error);
// });

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true});
        console.log("Conected to database");
    } catch (error) {
        console.log("Error connecting to database::", error);
    }
})();

module.exports = sequelize;