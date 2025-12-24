const express = require("express");
const router = express.Router();
const { addExpense } = require("../services/expenseService");

/**
 * POST /expenses
 * Body: { groupId, paidBy, participants, amount }
 */
router.post("/", async (req, res) => {
  try {
    const expense = await addExpense(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
