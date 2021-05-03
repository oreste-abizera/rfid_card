const TransactionModel = require("../Models/Transaction.model");

module.exports.loadTransactions = async () => {
  let transactions = await TransactionModel.find();
  if (transactions) {
    return { success: true, transactions };
  }
  return { success: false };
};
