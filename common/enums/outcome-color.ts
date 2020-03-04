enum OutcomeLevelColorClass {
  Possitive1 = "outcome possitive-1",
  Possitive2 = "outcome possitive-2",
  Possitive3 = "outcome possitive-3",
  Possitive4 = "outcome possitive-4",
  Possitive5 = "outcome possitive-5",
  Negative1 = "outcome negative-1",
  Negative2 = "outcome negative-2"
}

interface IOutcomeColor {
  [key: number]: OutcomeLevelColorClass;
}

const outcomeColor: IOutcomeColor = {
  1: OutcomeLevelColorClass.Possitive1,
  2: OutcomeLevelColorClass.Possitive1,
  3: OutcomeLevelColorClass.Possitive1,
  4: OutcomeLevelColorClass.Possitive1,
  5: OutcomeLevelColorClass.Possitive2,
  6: OutcomeLevelColorClass.Possitive4,
  7: OutcomeLevelColorClass.Possitive4,
  8: OutcomeLevelColorClass.Possitive2,
  9: OutcomeLevelColorClass.Possitive1,
  10: OutcomeLevelColorClass.Possitive2,
  11: OutcomeLevelColorClass.Possitive3,
  12: OutcomeLevelColorClass.Possitive1,
  13: OutcomeLevelColorClass.Negative1,
  14: OutcomeLevelColorClass.Possitive3,
  15: OutcomeLevelColorClass.Possitive4,
  16: OutcomeLevelColorClass.Possitive1,
  17: OutcomeLevelColorClass.Possitive1,
  18: OutcomeLevelColorClass.Possitive1,
  19: OutcomeLevelColorClass.Possitive1,
  20: OutcomeLevelColorClass.Possitive1,
  21: OutcomeLevelColorClass.Possitive4,
  22: OutcomeLevelColorClass.Possitive4,
  23: OutcomeLevelColorClass.Possitive5,
  24: OutcomeLevelColorClass.Possitive4,
  25: OutcomeLevelColorClass.Possitive2,
  26: OutcomeLevelColorClass.Possitive3,
  27: OutcomeLevelColorClass.Possitive1,
  28: OutcomeLevelColorClass.Possitive2,
  29: OutcomeLevelColorClass.Possitive2,
  30: OutcomeLevelColorClass.Possitive2,
  31: OutcomeLevelColorClass.Possitive3,
  32: OutcomeLevelColorClass.Possitive1,
  33: OutcomeLevelColorClass.Possitive2,
  34: OutcomeLevelColorClass.Negative1,
  35: OutcomeLevelColorClass.Negative2,
  36: OutcomeLevelColorClass.Negative2,
  37: OutcomeLevelColorClass.Negative2,
  38: OutcomeLevelColorClass.Possitive1,
  39: OutcomeLevelColorClass.Possitive1,
  40: OutcomeLevelColorClass.Possitive1,
  41: OutcomeLevelColorClass.Possitive2,
  42: OutcomeLevelColorClass.Possitive1
};

export default outcomeColor;
