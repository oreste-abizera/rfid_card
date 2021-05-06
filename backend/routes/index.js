const express = require("express");
const {
  createTransaction,
  getTransactions,
} = require("../controllers/Transactions.Controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Welcome to RFID Card backend" }).status(200);
});

router.route("/transactions").post(createTransaction).get(getTransactions);

module.exports = router;
