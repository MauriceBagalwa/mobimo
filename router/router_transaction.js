const router = require("express").Router();
const tarnsactionCtr = require("../controller/transactionController");

router.get("", tarnsactionCtr.transactions);

module.exports = router;
