const router = require("express").Router();
const tarnsactionCtr = require("../controller/transactionController");

router.get("/trans", tarnsactionCtr.transactions);
router.put("/", tarnsactionCtr.transaction);

module.exports = router;
