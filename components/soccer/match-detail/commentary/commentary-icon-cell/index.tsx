import React from "react"

type Props = {
  icon: string
};

const CommentaryIconCell: React.FC<Props> = (props: Props) => {
  return (
    <div className="commentary-icon-cell">
      <span className={props.icon}></span>
    </div>
  );
};

export default CommentaryIconCell;
