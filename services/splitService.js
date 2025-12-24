function round2(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function equalSplit(amount, participants) {
  const share = round2(amount / participants.length);
  const splits = {};

  participants.forEach((id) => {
    splits[id] = share;
  });

  return splits;
}

function exactSplit(amount, splitDetails) {
  const total = Object.values(splitDetails).reduce((a, b) => a + b, 0);

  if (roundTo2(total) !== roundTo2(amount)) {
    throw new Error("Split details do not sum up to total amount");
  }

  const splits = {};
  for (let userId in splitDetails) {
    splits[userId] = roundTo2(splitDetails[userId]);
  }

  return splits;
}

function percentageSplit(amount, splitDetails) {
  const totalPercent = Object.values(splitDetails).reduce((a, b) => a + b, 0);

  if (totalPercent !== 100) {
    throw new Error("Total percentage must be 100");
  }

  const splits = {};
  for (let userId in splitDetails) {
    const raw = (splitDetails[userId] / 100) * amount;
    splits[userId] = roundTo2(raw);
  }

  return splits;
}

module.exports = {
  equalSplit,
  exactSplit,
  percentageSplit
};
