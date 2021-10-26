import React from "react";

export default function Loader() {
  return (
    <div className="ui segment" style={{ height: "25vh" }}>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    </div>
  );
}
