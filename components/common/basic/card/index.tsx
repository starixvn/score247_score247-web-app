import "./style.scss";
import React from "react";

type Props = {
    className?: string;
    title?: string;
    titleIcon?: string | string[];
};

const Card: React.FC<Props> = ({ children, title, titleIcon, className = "" }) => {
    const renderIcons = (icons: string | string[]) => {
        if (typeof icons === "string") {
            return (<span className={icons}></span>);
        }

        return (icons.map((icon, index) => <span className={icon} key={index}></span>));
    };

    return (
        <div className={`card ${className}`}>
            {title && (
                <div className="card-title">
                    {titleIcon && renderIcons(titleIcon)}
                    {title}
                </div>)
            }
            <div className="card-body">{children}</div>
        </div>
    );
};

export default Card;