import React from "react";
import { connect } from "react-redux";
import player_walk from "./player_walk.png";
import handleMovement from "./movement";

function Player(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${player_walk}')`,
        backgroundPosition: props.spriteLocation,
        width: "40px",
        height: "40px",
      }}
    />
  );
}

function mapStateToProps(state) {
  return {
    ...state.player,
  };
}

export default connect(mapStateToProps)(handleMovement(Player));
