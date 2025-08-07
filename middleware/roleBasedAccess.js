const roleBasedAccess = (role) => {
    return function (req, res, next) {

        if(!(role.includes(req.decoded.role))) {
            res.send({
                message: "You are not allowed to acess this role"
            });
            return;
        }

        next();
    }
}

module.exports = roleBasedAccess;