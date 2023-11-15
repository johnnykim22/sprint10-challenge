import React from "react";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";
import { connect } from "react-redux";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Wheel(props) {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.wheel);

  const handleClockwiseClick = () => {
    dispatch(moveClockwise());
  };

  const handleCounterClockwiseClick = () => {
    dispatch(moveCounterClockwise());
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        <div
          className={"cog " + (active == 0 ? "active" : "")}
          style={{ "--i": 0 }}
        >
          {active == 0 ? "B" : ""}
        </div>
        <div
          className={"cog " + (active == 1 ? "active" : "")}
          style={{ "--i": 1 }}
        >
          {active == 1 ? "B" : ""}
        </div>
        <div
          className={"cog " + (active == 2 ? "active" : "")}
          style={{ "--i": 2 }}
        >
          {active == 2 ? "B" : ""}
        </div>
        <div
          className={"cog " + (active == 3 ? "active" : "")}
          style={{ "--i": 3 }}
        >
          {active == 3 ? "B" : ""}
        </div>
        <div
          className={"cog " + (active == 4 ? "active" : "")}
          style={{ "--i": 4 }}
        >
          {active == 4 ? "B" : ""}
        </div>
        <div
          className={"cog " + (active == 5 ? "active" : "")}
          style={{ "--i": 5 }}
        >
          {active == 5 ? "B" : ""}
        </div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwiseClick}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleClockwiseClick}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
};

export default connect(null)(Wheel);
