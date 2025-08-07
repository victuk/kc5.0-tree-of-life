const jsonWebToken = require("jsonwebtoken");

function checkIfLoggedIn(req, res, next) {
    try {

        if(!req.headers.authorization) {return res.status(400).send({message: "No token supplied"});}

        const [scheme, token] = req.headers.authorization.split(" ");

        if(scheme.toLocaleLowerCase() == "bearer") {
            const value = jsonWebToken.verify(token, process.env.JWT_KEY);
            req.decoded = value;
            next();
        } else {
            res.status(422).send({
                message: "Invalid authentication scheme"
            });
        }
    } catch (error) {
        res.status(500).send({error});
    }
}

module.exports = checkIfLoggedIn;