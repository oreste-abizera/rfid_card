const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    cardId: {
      type: String,
      required: [true, "Card id is required"],
    },
    initial_balance: {
      type: Number,
      required: [true, "initial balance is required"],
    },
    transaction_fare: {
      type: Number,
      required: [true, "transaction fare is required"],
    },
    new_balance: {
      type: Number,
      required: [true, "new balance is required"],
    },
  },
  {
    timestamps: {
      createdAt: "timestamp",
    },
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
