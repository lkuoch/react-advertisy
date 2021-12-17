import React from "react";

const Loader = () => {
  return (
    <div className="ui segment" style={{ padding: "50px" }}>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    </div>
  );
};

export default Loader;
