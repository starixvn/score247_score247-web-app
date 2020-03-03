import React from "react"

type Props = {
  icon: string
};

const CommentaryIconCell: React.FC<Props> = (props: Props) => {
  let icon;

  switch (props.icon) {
    case "yellow-red-card":
      icon = (
        <div className="commentary-icon-cell">
          <span className="icon-yellow-card"></span>
          <span className="icon-red-card"></span>
        </div>
      );
    break;
    case "icon-substitute-player":
      icon = (
        <div className="commentary-icon-cell">
          <span className="icon-goal"></span>
          <span></span>
        </div>
      );
    break;
    default:
      icon = (
        <div className="commentary-icon-cell">
          <span className={props.icon}></span>
        </div>
      );
  }

  return icon;
};

export default CommentaryIconCell;
