import "./style.scss";
import React from "react";

type Props = {
    className?: string;
    title?: string;
    titleIcon?: string;
};

const Card: React.FC<Props> = ({ children, className = "", title = "", titleIcon = null }) => {
    return (
        <div className={`card ${className}`}>
            <div className="card-title">
                {titleIcon && <span className={titleIcon}></span>}
                {title}
            </div>
            <div className="card-body">{children}</div>
        </div>
    );
};

export default Card;