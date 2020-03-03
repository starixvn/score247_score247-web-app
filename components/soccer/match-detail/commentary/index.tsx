import React, { useState } from "react";
import { MatchCommentary } from '../../../../apis/soccer/models';
import CommentaryRow from './commentary-row';
import { useTranslation } from "../../../../common/helpers/Localizer";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
import { useDeviceContext } from "../../../../contexts/device-context";

type Props = {
  comments: MatchCommentary[] | null;
};

const Commentary: React.FC<Props> = (props: Props) => {
  const { isMobile } = useDeviceContext();
  const { t } = useTranslation(ResourceType.SOCCER);
  const [isCollapsed, setCollapse] = useState(false);

  const comments = props.comments || []
  const collapseContentOnMobile = (isMobile && isCollapsed) ? "display-none" : ""
  const collapseHeaderClassOnMobile = isCollapsed ? "collapse" : "expand"; 

  const commentaryHeader = (
    <div className="commantary-header">
      <span className="text">{t(SoccerResourceKey.COMMENTARY)}</span>
      {isMobile && <span
        className={collapseHeaderClassOnMobile}
        onClick={() => setCollapse(!isCollapsed)}
      >
          <span className="icon-arrow-down"></span>
        </span>}
    </div>
  );

  const commentaryBody = (
    <div className={`commantary-body ${collapseContentOnMobile}`}>
      {[...comments].reverse().map(x => <CommentaryRow comment={x} key={x.TimelineId} />)}
    </div>
  );

  return (
    <div className="commantary">
      {commentaryHeader}
      {commentaryBody}
    </div>
  );
};

export default Commentary;