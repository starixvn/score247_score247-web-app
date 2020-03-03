enum OutcomeLevelColor {
  Possitive1 = "#007E34",
  Possitive2 = "#0099CB",
  Possitive3 = "#2ABBAC",
  Possitive4 = "#0E47A1",
  Possitive5 = "#4F0EA1",
  Negative1 = "#E30000",
  Negative2 = "#E77676"
}

interface IOutcomeColor {
  [key: number]: OutcomeLevelColor;
}

const outcomeColor: IOutcomeColor = {
  1: OutcomeLevelColor.Possitive1,
  2: OutcomeLevelColor.Possitive1,
  3: OutcomeLevelColor.Possitive1,
  4: OutcomeLevelColor.Possitive1,
  5: OutcomeLevelColor.Possitive2,
  6: OutcomeLevelColor.Possitive4,
  7: OutcomeLevelColor.Possitive4,
  8: OutcomeLevelColor.Possitive2,
  9: OutcomeLevelColor.Possitive1,
  10: OutcomeLevelColor.Possitive2,
  11: OutcomeLevelColor.Possitive3,
  12: OutcomeLevelColor.Possitive1,
  13: OutcomeLevelColor.Negative1,
  14: OutcomeLevelColor.Possitive3,
  15: OutcomeLevelColor.Possitive4,
  16: OutcomeLevelColor.Possitive1,
  17: OutcomeLevelColor.Possitive1,
  18: OutcomeLevelColor.Possitive1,
  19: OutcomeLevelColor.Possitive1,
  20: OutcomeLevelColor.Possitive1,
  21: OutcomeLevelColor.Possitive4,
  22: OutcomeLevelColor.Possitive4,
  23: OutcomeLevelColor.Possitive5,
  24: OutcomeLevelColor.Possitive4,
  25: OutcomeLevelColor.Possitive2,
  26: OutcomeLevelColor.Possitive3,
  27: OutcomeLevelColor.Possitive1,
  28: OutcomeLevelColor.Possitive2,
  29: OutcomeLevelColor.Possitive2,
  30: OutcomeLevelColor.Possitive2,
  31: OutcomeLevelColor.Possitive3,
  32: OutcomeLevelColor.Possitive1,
  33: OutcomeLevelColor.Possitive2,
  34: OutcomeLevelColor.Negative1,
  35: OutcomeLevelColor.Negative2,
  36: OutcomeLevelColor.Negative2,
  37: OutcomeLevelColor.Negative2,
  38: OutcomeLevelColor.Possitive1,
  39: OutcomeLevelColor.Possitive1,
  40: OutcomeLevelColor.Possitive1,
  41: OutcomeLevelColor.Possitive2,
  42: OutcomeLevelColor.Possitive1
};

export default outcomeColor;
