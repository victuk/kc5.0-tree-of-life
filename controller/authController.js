const userModel = require("../schema/user");
const otpModel = require("../schema/otp");
const generateOTP = require("../utility/generateOTP");
const bcrypt = require("bcrypt");
const smtp = require("../utility/sendEmail");
const {v4} = require("uuid");
const jsonWebToken = require("jsonwebtoken");
const Joi = require("joi");

async function register(req, res) {
    const {
        fullName, email, password, role
    } = req.body;


    const {error} = Joi.object({
        fullName: Joi.string().min(4).required(),
        email: Joi.string().email({tlds: {allow: false}}).required(),
        password: Joi.string().min(8).alphanum().required(),
        role: Joi.string().valid("customer", "admin")
    }).validate({
        fullName, email, password, role
    });

    if(error) {
        res.status(422).send({
            errorMessage: error.message
        });
        return;
    }    

    const emailExists = await userModel.findOne({email});

    if(emailExists) {
        res.status(409).send({
            message: "Email already exist"
        });
        return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await userModel.create({
        fullName, email, password: hashedPassword, role
    });

    const otp = generateOTP();

    const generateOTPToken = v4();

    await otpModel.create({
        otp, otpToken: generateOTPToken, userId: newUser._id, purpose: "verify-email"
    });

    await smtp.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Company Name - Verify Email",
        html: `
            <div>
                <h1>Verify email</h1>
                <div>Your otp is: ${otp}</div>
            </div>
        `
    });

    res.status(201).send({
        message: "User created successfully!",
        otpToken: generateOTPToken, purpose: "verify-email"
    });
}

async function verifyOTP(req, res) {
    const {otp, otpToken, purpose} = req.body;

    if(purpose != "verify-email") {
        res.status(422).send({
            message: "Invalid otp purpose"
        });
        return;
    }

    const otpDetails = await otpModel.findOne({otpToken, purpose});

    if(!otpDetails) {
        res.status(422).send({
            message: "Invalid otp token"
        });
        return;
    }

    if(otp != otpDetails.otp) {
        res.status(422).send({
            message: "Invalid otp"
        });
        return;
    }

    await userModel.findByIdAndUpdate(otpDetails.userId, {
        isEmailVerified: true
    });

    await otpModel.deleteMany({userId: otpDetails.userId, purpose: "verify-email"});

    res.send({
        message: "User email verified successfully"
    });

}

async function login(req, res) {

    console.log("Here");

    const {email, password} = req.body;

    const {error} = Joi.object({
        email: Joi.string().email({tlds: {allow: false}}).required(),
        password: Joi.string().min(8).alphanum().required().messages({
            "string.min": "Password has to be at least 8 characters long",
            "string.empty": "Password can not be empty",
            "any.required": "The password field is required"
        })
    }).validate(req.body);

    if(error) {
        res.status(422).send({
            errorMessage: error.message
        });
        return;
    }

    const userDetail = await userModel.findOne({email});
    if(!userDetail) {
        res.status(404).send({
            message: "User not found"
        });
        return;
    }

    const passwordsMatch = bcrypt.compareSync(password, userDetail.password);

    if(!passwordsMatch) {
        res.status(400).send({
            message: "Invalid credentials"
        });
        return;
    }

    const token = jsonWebToken.sign({userId: userDetail.id, email: userDetail.email, role: userDetail.role}, process.env.JWT_KEY);

    res.send({
        message: "Login successful",
        userDetail: {
            fullName: userDetail.fullName,
            email: userDetail.email
        },
        token
    });
}



module.exports = {
    register,
    verifyOTP,
    login
}
