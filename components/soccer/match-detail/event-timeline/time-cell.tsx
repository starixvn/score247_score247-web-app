import React from "react";
import { TimelineEvent } from "../../../../apis/soccer/models";
import { BuildEventTime } from '../../../../common/helpers/soccer-match-helper';

type Props = {
    event: TimelineEvent
};

const TimeCell: React.FC<Props> = (props: Props) =>
    <div className="time-cell">
        <span>{BuildEventTime(props.event)}</span>
    </div>;

export default TimeCell;