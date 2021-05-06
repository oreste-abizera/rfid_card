const TransactionModel = require("../Models/Transaction.model");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.loadTransactions = async () => {
  let transactions = await TransactionModel.find();
  if (transactions) {
    return { success: true, count: transactions.length, transactions };
  }
  return { success: false };
};

module.exports.getTransactions = async (req, res, next) => {
  let transactions = await TransactionModel.find();
  if (transactions) {
    return res.json({
      success: true,
      count: transactions.length,
      transactions,
    });
  }
  return next(new ErrorResponse("Failed to get transactions", 404));
};

module.exports.createTransaction = async (req, res, next) => {
  try {
    let cardFound = await TransactionModel.find({ cardId: req.body.cardId });
    let transaction;
    let addingTransaction = req.body.transaction_type === "add";
    if (cardFound.length > 0) {
      let error;
      if (!req.body.transaction_fare) error = "transaction_fare is required.";
      if (error) return next(new ErrorResponse(error, 400));
      cardFound = cardFound[cardFound.length - 1];
      let newTransactionData = {
        cardId: cardFound.cardId,
        initial_balance: cardFound.new_balance,
        transaction_fare: req.body.transaction_fare,
        new_balance: addingTransaction
          ? cardFound.new_balance + parseInt(req.body.transaction_fare)
          : cardFound.new_balance - parseInt(req.body.transaction_fare),
      };
      transaction = await TransactionModel.create(newTransactionData);
    } else {
      let error;
      if (!req.body.initial_balance) error = "initial_balance is required.";
      if (!req.body.transaction_fare) error = "transaction_fare is required.";
      if (!req.body.cardId) error = "cardId is required.";
      if (error) return next(new ErrorResponse(error, 400));
      transaction = await TransactionModel.create({
        ...req.body,
        new_balance: addingTransaction
          ? parseInt(req.body.initial_balance) +
            parseInt(req.body.transaction_fare)
          : parseInt(req.body.initial_balance) -
            parseInt(req.body.transaction_fare),
      });
    }
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
