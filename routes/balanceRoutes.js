const express = require("express");
const router = express.Router();
const { getUserBalance } = require("../services/balanceService");

/**
 * GET /balances/:groupId/:userId
 */
router.get("/:groupId/:userId", async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const balance = await getUserBalance(groupId, userId);
    res.json(balance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
