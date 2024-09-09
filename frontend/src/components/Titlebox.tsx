import React from "react";
import { useNavigate } from "react-router-dom";

import "./Titlebox.scss";

interface BoxProps {
  title: string;
}

const TitleBox: React.FC<BoxProps> = ({ title }) => {
    const navigate = useNavigate();
    const logoRedirect = () => {
        navigate("/");
    };

    return (
        <div className="custom-box">
            <div className="custom-box-content">
                <h2 className="custom-box-title">{title}</h2>
                <img onClick={logoRedirect} className="title-soul" src="/assets/soul-connection-title-logo.png" alt="soul-title" />
            </div>
        </div>
    );
};

export default TitleBox;
