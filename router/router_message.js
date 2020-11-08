const router = require("express").Router();
const messageCtr = require("../controller/mesage");

router.get("/", messageCtr.messages);
router.put("/", messageCtr.message);

module.exports = router;
