import React, { useState } from "react";
import { MatchCommentary } from '../../../../apis/soccer/models';
import CommentaryRow from './commentary-row';
import { useTranslation } from "../../../../common/helpers/Localizer";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
import { useDeviceContext } from "../../../../contexts/device-context";
import Card from "../../../common/basic/card";

type Props = {
  comments: MatchCommentary[] | null;
};

const Commentary: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation(ResourceType.SOCCER);
  const comments = props.comments || []

  const commentaryBody = (
    <div className="commantary">
      {[...comments].reverse().map(x => <CommentaryRow comment={x} key={x.TimelineId} />)}
    </div>
  );

  console.log(comments)

  return (
    <Card title={t(SoccerResourceKey.COMMENTARY)} className="commentary">
      {commentaryBody}
    </Card>
  );
};

export default Commentary;