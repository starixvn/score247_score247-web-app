import React from "react";

type Props = {
    homeScore: number;
    awayScore: number;
};

const ScoreCell: React.FC<Props> = (props: Props) =>
    <div>
        <span className="score-cell">{`${props.homeScore} - ${props.awayScore}`}</span>
    </div>

export default ScoreCell;