const express = require("express");
const { createTransaction } = require("../controllers/Transactions.Controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Welcome to RFID Card backend" }).status(200);
});

router.route("/transactions").post(createTransaction);

module.exports = router;
