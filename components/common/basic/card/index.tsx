import "./style.scss";
import React from "react";

type Props = {
    className?: string;
    title?: string;
    titleIcon?: string;
};

const Card: React.FC<Props> = ({ children, title, titleIcon, className = "" }) => {
    return (
        <div className={`card ${className}`}>
            {title && (
                <div className="card-title">
                    {titleIcon&& <span className={titleIcon}></span>}
                    {title}
                </div>)
            }
            <div className="card-body">{children}</div>
        </div>
    );
};

export default Card;