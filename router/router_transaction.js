const router = require("express").Router();
const tarnsactionCtr = require("../controller/transactionController");

router.get("/get", tarnsactionCtr.transactions);
router.put("/", tarnsactionCtr.transaction);

module.exports = router;
