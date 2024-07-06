import React from "react";

const HeaderContainer = ({ title, subtext, user }: HeaderContainerProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        <span className="text-success-600">
          &nbsp;{user}
          
          </span>{" "}
      </h1>
      <p className="header-box-subtext" >{subtext} </p>
    </div>
  );
};

export default HeaderContainer;
