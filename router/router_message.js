const router = require("express").Router();
const messageCtr = require("../controller/mesage");

router.get("/", messageCtr.messages);

module.exports = router;
