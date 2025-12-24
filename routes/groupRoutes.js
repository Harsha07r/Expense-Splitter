
console.log("✅ groupRoutes loaded");

const express = require("express");
const router = express.Router();

console.log("✅ groupRoutes loaded");

const Group = require("../models/Group");
const User = require("../models/User");

/**
 * POST /groups
 * Create a new group
 * Body: { name, members: [userId1, userId2] }
 */
router.post("/", async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name || !members || members.length === 0) {
      return res
        .status(400)
        .json({ error: "Group name and members are required" });
    }

    // Validate all users exist
    const users = await User.find({ _id: { $in: members } });
    if (users.length !== members.length) {
      return res
        .status(400)
        .json({ error: "One or more users are invalid" });
    }

    const group = await Group.create({
      name,
      members
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /groups
 * Get all groups
 */
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find().populate("members", "name");
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /groups/:groupId
 * Get single group with members
 */
router.get("/:groupId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate(
      "members",
      "name"
    );

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
