
const { addTransaction } = require("../services/transaction.service");

const transactionController = {
  async addTransaction(req, res, next) {
    try {
        const data = await addTransaction(req)
        res.json(data)

    } catch (error) {
      next(error);
    }
  },
};

module.exports = transactionController;
