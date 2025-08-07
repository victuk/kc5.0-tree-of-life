const multer = require("multer");
const uuid = require("uuid");

const upload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/");
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + "." + file.mimetype.split("/")[1]);
    }
});

// const upload = multer.memoryStorage();

// const fileUpload = multer({storage: upload});

module.exports = multer({storage: upload});