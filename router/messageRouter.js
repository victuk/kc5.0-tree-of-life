const express = require("express");
const checkIfLoggedIn = require("../middleware/checkIfLoggedIn");
const paystackController = require("../controller/paystackController");
const chatsModel = require("../schema/chats");
const messageModel = require("../schema/messages");

const router = express.Router();

router.use(checkIfLoggedIn);

router.post("/send", async (req, res) => {
  try {
    const { to, message, files } = req.body;

    console.log("me", req.decoded.userId, "to", to);

    // {userIds: $in: [req.decoded.userId, to]}

    const createdMessage = await messageModel.create({
      userIds: [req.decoded.userId, to],
      sender: req.decoded.userId,
      message,
      files
    });

    const myChat = await chatsModel.findOne({
      me: req.decoded.userId,
      theOtherPerson: to,
    });

    if (!myChat) {
      await chatsModel.create({
        me: req.decoded.userId,
        theOtherPerson: to,
        lastMessageId: createdMessage._id,
        containsFiles: files.length > 0,
      });
    } else {
        await chatsModel.findByIdAndUpdate(myChat._id, {
        lastMessageId: createdMessage._id,
      });
    }

    const theOtherPersonsChat = await chatsModel.findOne({
      me: to,
      theOtherPerson: req.decoded.userId,
    });

    if (!theOtherPersonsChat) {
      await chatsModel.create({
        me: to,
        theOtherPerson: req.decoded.userId,
        lastMessageId: createdMessage._id,
        containsFiles: files.length > 0,
      });
    } else {
        await chatsModel.findByIdAndUpdate(theOtherPersonsChat._id, {
        lastMessageId: createdMessage._id,
        containsFiles: files.length > 0,
      });
    }

    req.socket.to(to).emit("send-message", message);

    res.send({
        message: "Message sent"
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/chats", async (req, res, next) => {

    const chats = await chatsModel.find({
        me: req.decoded.userId
    }).populate("theOtherPerson", "-password").populate("lastMessageId", "-createdAt -updatedAt");
    res.send({chats});
});

router.get("/messages/:theOtherPerson", async (req, res, next) => {

    const {theOtherPerson} = req.params;

    const messages = await messageModel.find({
        userIds: {
            $in: [req.decoded.userId, theOtherPerson],
        }
    });
    res.send({messages});
});

module.exports = router;
