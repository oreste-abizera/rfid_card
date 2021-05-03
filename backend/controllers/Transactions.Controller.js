const TransactionModel = require("../Models/Transaction.model");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.loadTransactions = async () => {
  let transactions = await TransactionModel.find();
  if (transactions) {
    return { success: true, transactions };
  }
  return { success: false };
};

module.exports.createTransaction = async (req, res, next) => {
  try {
    let transaction = await TransactionModel.create(req.body);
    if (transaction) {
      return res.json({
        success: true,
        transaction,
      });
    }
    return next(new ErrorResponse("Saving transaction failed."));
  } catch (error) {
    return next(new ErrorResponse("Saving transaction failed."));
  }
};
