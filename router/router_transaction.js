const router = require("express").Router();
const tarnsactionCtr = require("../controller/transactionController");

router.get("/", tarnsactionCtr.transactions);
router.get("/id", tarnsactionCtr.isUse);
router.get("/details", tarnsactionCtr.details);
router.post("/send_mssg", tarnsactionCtr.sendMssg);
router.put("/", tarnsactionCtr.transaction);

module.exports = router;
