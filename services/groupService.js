const { v4: uuid } = require("uuid");
const { groups } = require("../data/store");

function createGroup(name, memberIds) {
  const groupId = uuid();

  groups[groupId] = {
    groupId,
    name,
    members: memberIds
  };

  return groups[groupId];
}

module.exports = { createGroup };
