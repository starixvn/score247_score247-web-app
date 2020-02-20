import { MatchSummary, TimelineEvent } from "../../apis/soccer/models";
import { MatchResult } from "../../apis/soccer/models/match-result";
import { EventTypes } from "../enums/event-type";

export function updateMatchFromEvent(
  match: MatchSummary,
  timeline: TimelineEvent,
  matchResult: MatchResult
) {
  match.HomeScore = matchResult.HomeScore;
  match.AwayScore = matchResult.AwayScore;
  match.WinnerId = matchResult.WinnerId;
  match.AggregateHomeScore = matchResult.AggregateHomeScore;
  match.AggregateAwayScore = matchResult.AggregateAwayScore;
  match.AggregateWinnerId = matchResult.AggregateWinnerId;
  match.MatchPeriods = matchResult.MatchPeriods;
  match.EventStatus = matchResult.EventStatus;
  match.MatchStatus = matchResult.MatchStatus;
  match.MatchTime = matchResult.MatchTime;

  if (timeline.Type.Value === EventTypes.PERIOD_START.value) {
    match.CurrentPeriodStartTime[0] = timeline.Time;
    match.InjuryTimeAnnounced = 0;
  }

  updateCards(timeline, match);
  updateInjuryTime(timeline, match);
}

function updateCards(timeline: TimelineEvent, match: MatchSummary) {
  if (timeline != null) {
    switch (timeline.Type.Value) {
      case EventTypes.YELLOW_CARD.value:
        if (timeline.IsHome) {
          match.HomeYellowCards++;
        } else {
          match.AwayYellowCards++;
        }
        break;
      case EventTypes.YELLOW_RED_CARD.value:
        if (timeline.IsHome) {
          match.HomeYellowRedCards++;
        } else {
          match.AwayYellowRedCards++;
        }
        break;
      case EventTypes.RED_CARD.value:
        if (timeline.IsHome) {
          match.HomeRedCards++;
        } else {
          match.AwayRedCards++;
        }
        break;
    }
  }
}

function updateInjuryTime(timeline: TimelineEvent, match: MatchSummary) {
  if (
    timeline.Type.Value === EventTypes.INJURY_TIME_SHOWN.value &&
    timeline.InjuryTimeAnnounced > 0
  ) {
    match.InjuryTimeAnnounced = timeline.InjuryTimeAnnounced;
  }
}

export const BuildEventTime = (timelineEvent: TimelineEvent) =>
  !timelineEvent.StoppageTime
    ? `${timelineEvent.MatchTime}'`
    : `${timelineEvent.MatchTime}'+${timelineEvent.StoppageTime}'`;