import {
  MatchStatus,
  MatchStatusType,
  MatchStatusTypeDic,
  MatchStatusHelper
} from "../enums/match-status-type";
import { MatchSummary } from "../../apis/soccer/models";
import { differenceInMinutes } from "date-fns";

class PeriodTime {
  constructor(
    public startTime: number,
    public endTime: number,
    public matchStatus: MatchStatus
  ) {}
}

interface IPeriodTimes {
  [key: number]: PeriodTime;
}

const periodTimes: IPeriodTimes = {
  6: new PeriodTime(1, 45, MatchStatusType.FIRST_HALF), //NOSONAR
  7: new PeriodTime(46, 90, MatchStatusType.SECOND_HALF), //NOSONAR
  9: new PeriodTime(91, 105, MatchStatusType.FIRST_HALF_EXTRA), //NOSONAR
  10: new PeriodTime(106, 120, MatchStatusType.SECOND_HALF_EXTRA) //NOSONAR
};

function buildMatchMinuteWithInjuryTime(
  match: MatchSummary,
  matchMinute: number,
  periodTime: PeriodTime
) {
  const announcementInjuryTime = match.InjuryTimeAnnounced;
  const currentInjuryTime = matchMinute - periodTime.endTime;
  let displayInjuryTime = currentInjuryTime <= 0 ? 1 : currentInjuryTime;
  if (currentInjuryTime > announcementInjuryTime) {
    displayInjuryTime = announcementInjuryTime;
  }

  return `${periodTime.endTime}'+${displayInjuryTime}`;
}

function buildMatchMinute(match: MatchSummary): string {
  const periodTime = periodTimes[match.MatchStatus.Value];

  if (periodTime == null) {
    return "";
  }

  const today = new Date();
  const periodStartTime = new Date(match.CurrentPeriodStartTime[0]);
  const matchMinute =
    periodTime.startTime + differenceInMinutes(today, periodStartTime);

  if (match.InjuryTimeAnnounced > 0) {
    return buildMatchMinuteWithInjuryTime(match, matchMinute, periodTime);
  }

  return buildMatchMinuteText(matchMinute, periodTime);
}

function buildMatchMinuteText(matchMinute: number, periodTime: PeriodTime) {
  if (matchMinute >= periodTime.endTime) {
    matchMinute = periodTime.endTime;
  }

  if (matchMinute < periodTime.startTime) {
    matchMinute = periodTime.startTime;
  }

  return `${matchMinute}'`;
}

export function buildMatchStatus(match: MatchSummary): string {
  if (match?.MatchStatus == null) {
    return "";
  }

  if (MatchStatusHelper.isEventNeedBeShownMinute(match.MatchStatus)) {
    return buildMatchMinute(match);
  }

  return MatchStatusTypeDic[match.MatchStatus.Value]?.displayName;
}
