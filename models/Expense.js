const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  splits: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Expense", expenseSchema);
