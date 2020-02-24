import React from "react";
import { MatchSummary } from "../../../../../apis/soccer/models";
import { MatchStatusType } from "../../../../../common/enums/match-status-type";
import { useTranslation } from "../../../../../common/helpers/Localizer";
import { SoccerResourceKey, ResourceType } from "../../../../../common/resources";

type Props = {
    match: MatchSummary;
}

export default function AggregateScore(props: Props){
    const {match} = props;
    const {t} = useTranslation(ResourceType.SOCCER);
    if(match.AggregateWinnerId && match.EventStatus?.Value === MatchStatusType.CLOSED.value){
        return <div className="arrg-text">{t(SoccerResourceKey.AGGREGATE_SCORE, { score: `${match.AggregateHomeScore} - ${match.AggregateAwayScore}`})}</div>;
    }

    return null;
}