enum OutcomeLevelColorClass {
  Positive1 = "outcome positive-1",
  Positive2 = "outcome positive-2",
  Positive3 = "outcome positive-3",
  Positive4 = "outcome positive-4",
  Positive5 = "outcome positive-5",
  Negative1 = "outcome negative-1",
  Negative2 = "outcome negative-2"
}

interface IOutcomeColor {
  [key: number]: OutcomeLevelColorClass;
}

const outcomeColor: IOutcomeColor = {
  1: OutcomeLevelColorClass.Positive1,
  2: OutcomeLevelColorClass.Positive1,
  3: OutcomeLevelColorClass.Positive1,
  4: OutcomeLevelColorClass.Positive1,
  5: OutcomeLevelColorClass.Positive2,
  6: OutcomeLevelColorClass.Positive4,
  7: OutcomeLevelColorClass.Positive4,
  8: OutcomeLevelColorClass.Positive2,
  9: OutcomeLevelColorClass.Positive1,
  10: OutcomeLevelColorClass.Positive2,
  11: OutcomeLevelColorClass.Positive3,
  12: OutcomeLevelColorClass.Positive1,
  13: OutcomeLevelColorClass.Negative1,
  14: OutcomeLevelColorClass.Positive3,
  15: OutcomeLevelColorClass.Positive4,
  16: OutcomeLevelColorClass.Positive1,
  17: OutcomeLevelColorClass.Positive1,
  18: OutcomeLevelColorClass.Positive1,
  19: OutcomeLevelColorClass.Positive1,
  20: OutcomeLevelColorClass.Positive1,
  21: OutcomeLevelColorClass.Positive4,
  22: OutcomeLevelColorClass.Positive4,
  23: OutcomeLevelColorClass.Positive5,
  24: OutcomeLevelColorClass.Positive4,
  25: OutcomeLevelColorClass.Positive2,
  26: OutcomeLevelColorClass.Positive3,
  27: OutcomeLevelColorClass.Positive1,
  28: OutcomeLevelColorClass.Positive2,
  29: OutcomeLevelColorClass.Positive2,
  30: OutcomeLevelColorClass.Positive2,
  31: OutcomeLevelColorClass.Positive3,
  32: OutcomeLevelColorClass.Positive1,
  33: OutcomeLevelColorClass.Positive2,
  34: OutcomeLevelColorClass.Negative1,
  35: OutcomeLevelColorClass.Negative2,
  36: OutcomeLevelColorClass.Negative2,
  37: OutcomeLevelColorClass.Negative2,
  38: OutcomeLevelColorClass.Positive1,
  39: OutcomeLevelColorClass.Positive1,
  40: OutcomeLevelColorClass.Positive1,
  41: OutcomeLevelColorClass.Positive2,
  42: OutcomeLevelColorClass.Positive1
};

export default outcomeColor;
