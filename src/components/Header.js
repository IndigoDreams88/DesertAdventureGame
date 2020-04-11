import React from "react";

function Header(props) {
  return (
    <div>
      <center>
        <h1
          style={{
            fontFamily: "IM Fell French Canon SC",
            fontSize: "60px",
            color: "#493a24",
            margin: "10px",
          }}
        >
          Desert Adventure
        </h1>
        <h2
          style={{
            fontFamily: "IM Fell French Canon SC",
            fontSize: "20px",
            color: "#493a24",
            marginBottom: "50px",
          }}
        >
          Safely navigate your way through the desert,to the hidden oasis
        </h2>
      </center>
    </div>
  );
}

export default Header;
