const router = require("express").Router();
const tarnsactionCtr = require("../controller/transactionController");

router.get("/", tarnsactionCtr.transactions);
router.get("/id", tarnsactionCtr.isUse);
router.put("/", tarnsactionCtr.transaction);

module.exports = router;
