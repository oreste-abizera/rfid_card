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
    let cardFound = await TransactionModel.find({ cardId: req.body.cardId });
    let transaction;
    if (cardFound.length > 0) {
      cardFound = cardFound[cardFound.length - 1];
      let newTransactionData = {
        cardId: cardFound.cardId,
        initial_balance: cardFound.new_balance,
        transaction_fare: req.body.transaction_fare,
        new_balance:
          cardFound.new_balance - parseInt(req.body.transaction_fare),
      };
      transaction = await TransactionModel.create(newTransactionData);
    } else {
      transaction = await TransactionModel.create({
        ...req.body,
        new_balance:
          parseInt(req.body.initial_balance) -
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
