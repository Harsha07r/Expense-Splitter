const Expense = require("../models/Expense");
const Group = require("../models/Group");
const { equalSplit } = require("./splitService");
const { addBalance } = require("./balanceService");

async function addExpense({ groupId, paidBy, participants, amount }) {
  if (!groupId || !paidBy || !participants || !amount) {
    throw new Error("Missing required fields");
  }

  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error("Group not found");
  }

  // Ensure all participants + payer belong to group
  const allUsers = new Set([...participants, paidBy]);
  const groupMemberIds = group.members.map((id) => id.toString());

  for (let uid of allUsers) {
    if (!groupMemberIds.includes(uid.toString())) {
      throw new Error("User not part of the group");
    }
  }

  const splits = equalSplit(amount, participants);

  for (let userId of participants) {
    if (userId.toString() !== paidBy.toString()) {
      await addBalance(groupId, userId, paidBy, splits[userId]);
    }
  }

  const expense = await Expense.create({
    groupId,
    paidBy,
    participants,
    amount,
    splits
  });

  return expense;
}

module.exports = { addExpense };
