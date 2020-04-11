import React from "react";
import Map from "../map";
import Player from "../player";
import { tiles } from "../../data/maps/1";
import store from "../../config/store";

function World(props) {
  store.dispatch({ type: "ADD_TILES", payload: { tiles } });

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "430px",
        backgroundColor: "#e4a55e",
        margin: "40px auto",
        border: "10px solid #493a24",
      }}
    >
      <Map />
      <Player />
    </div>
  );
}

export default World;
