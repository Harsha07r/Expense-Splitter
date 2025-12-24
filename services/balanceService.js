const Balance = require("../models/Balance");

async function addBalance(groupId, fromUser, toUser, amount) {
  if (fromUser.toString() === toUser.toString()) return;

  await Balance.findOneAndUpdate(
    { groupId, fromUser, toUser },
    { $inc: { amount } },
    { upsert: true, new: true }
  );
}

async function getUserBalance(groupId, userId) {
  const youOwe = await Balance.find({
    groupId,
    fromUser: userId,
    amount: { $gt: 0 }
  }).populate("toUser", "name");

  const owedToYou = await Balance.find({
    groupId,
    toUser: userId,
    amount: { $gt: 0 }
  }).populate("fromUser", "name");

  return { youOwe, owedToYou };
}

module.exports = { addBalance, getUserBalance };
