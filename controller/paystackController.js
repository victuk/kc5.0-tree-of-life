const axios = require("axios");
const { sendMail } = require("../utility/sendEmail");


const initializePayment = async (req, res) => {
    try {

        const {amount} = req.body;
        
        const response = await axios.post("https://api.paystack.co/transaction/initialize", {
            email: req.decoded.email,
            amount: amount * 100
        }, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });

        console.log("=============================Initialized payment=============================");
        console.log("Payment response", response.data);

        res.status(response.status).send({result: response.data});

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const paystackWebhook = async (req, res) => {
    try {
        
        console.log("webhook response", req.body);
        
         await sendMail({
            from: "ukokjnr@gmail.com",
            to: "ukokjnr@gmail.com",
            subject: "Paystack webhook",
            html: `
                ${JSON.stringify(req.body)}
            `
         });

        res.sendStatus(200);

    } catch (error) {
        res.send(500);
    }
}

module.exports = {
    initializePayment,
    paystackWebhook
}