const express = require("express");
const checkIfLoggedIn = require("../middleware/checkIfLoggedIn");
const paystackController = require("../controller/paystackController");

const router = express.Router();

router.use(checkIfLoggedIn);

router.post("/initialize-payment", paystackController.initializePayment);

router.post("/webhook", paystackController.paystackWebhook);

module.exports = router;