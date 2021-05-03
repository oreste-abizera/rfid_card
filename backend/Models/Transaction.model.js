const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: [true, "Card id is required"],
  },
  intial_balance: {
    type: Boolean,
    required: [true, "initial balance is required"],
  },
  transaction_fare: {
    type: Boolean,
    required: [true, "transaction fare is required"],
  },
  new_balance: {
    type: Boolean,
    required: [true, "new balance is required"],
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
