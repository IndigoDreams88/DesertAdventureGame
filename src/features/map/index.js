import React from "react";
import { connect } from "react-redux";
import { SPRITE_SIZE } from "../../config/constants";
import "./styles.css";

function getTileSprite(type) {
  switch (type) {
    case 0:
      return "sand";
    case 1:
      return "tumbleweed";
    case 2:
      return "grasses";
    case 2.5:
      return "snorkel";
    case 3:
      return "oasis";
    case 3.5:
      return "vase";
    case 4:
      return "treasureChest";
    case 4.5:
      return "coins";
    case 5:
      return "tropicalPalm";
    case 5.5:
      return "cobraGif";
    case 6:
      return "skull";
    case 6.6:
      return "quickSand";
    case 7:
      return "rock";
    case 7.5:
      return "whirlwind";
    case 8:
      return "cacti";
    case 8.5:
      return "scorpion";
    case 9:
      return "rockyCliff";
    case 9.5:
      return "crocodile";
    case 10:
      return "cactus";
    case 10.5:
      return "skullCrossbones";
    case 11:
      return "fireworks";
  }
}

function loseALife(props) {
  let lives = 3;
  let deathTraps = [
    props.tiles[6][2],
    props.tiles[4][3],
    props.tiles[2][6],
    props.tiles[5][10],
    props.tiles[8][15],
    props.tiles[7][18],
  ];

  if (lives > 0) {
    deathTraps.forEach((deathTrap) => {
      if (deathTrap === 10.5) {
        return lives--;
      }
    });
  }

  if (lives === 0) {
    return "Game Over!";
  } else {
    return lives;
  }
}

function pickups(props) {
  let totalScore = [];
  let pickups = [
    props.tiles[0][9],
    props.tiles[0][19],
    props.tiles[1][17],
    props.tiles[2][0],
    props.tiles[8][2],
    props.tiles[8][9],
    props.tiles[9][12],
  ];

  pickups.filter((pickup) => {
    if (pickup === 0) {
      totalScore.push(10);
    }
  });
  let playerScore = totalScore.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return playerScore;
}

function MapTile(props) {
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}
    ></div>
  );
}

function MapRow(props) {
  let number = 1;
  return (
    <div className="row">
      {props.tiles.map((tile) => (
        <MapTile tile={tile} key={number++} />
      ))}
    </div>
  );
}

function Map(props) {
  let numberKey = 1;
  return (
    <>
      <div
        style={{
          backgroundColor: "#c2b280",
        }}
      >
        {props.tiles.map((row) => (
          <MapRow tiles={row} key={numberKey++} />
        ))}
      </div>
      <div>
        {props.tiles[8][18] === 11 ? (
          <div
            style={{
              position: "absolute",
              zIndex: 200,
              top: "-50px",
              left: "-20px",
              width: "800px",
              height: "400px",
              backgroundColor: "#c2b280",
              border: "2px solid #493a24",
              marginTop: "60px",
              marginBottom: "20px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <center>
              <h1
                style={{
                  marginBottom: "50px",
                  fontFamily: "IM Fell French Canon SC",
                  fontSize: "60px",
                  color: "#493a24",
                  margin: "10px",
                }}
              >
                Congratulations you've reached the oasis!
              </h1>
              <img
                src="/tiles/fireworks.gif"
                alt="fireworks"
                height="150"
                width="150"
              />
              <h3
                style={{
                  fontFamily: "IM Fell French Canon SC",
                  fontSize: "50px",
                  color: "#493a24",
                  margin: "10px",
                }}
              >
                Total Score: {pickups(props)};
              </h3>
            </center>
          </div>
        ) : null}

        {loseALife(props) === "Game Over!" ? (
          <div
            style={{
              position: "absolute",
              zIndex: 200,
              top: "-50px",
              left: "-20px",
              width: "800px",
              height: "400px",
              backgroundColor: "#c2b280",
              border: "2px solid #493a24",
              marginTop: "60px",
              marginBottom: "20px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <center>
              <h1
                style={{
                  marginBottom: "50px",
                  fontFamily: "IM Fell French Canon SC",
                  fontSize: "60px",
                  color: "#493a24",
                  margin: "10px",
                }}
              >
                GAME OVER!
              </h1>
              <h2
                style={{
                  marginBottom: "50px",
                  fontFamily: "IM Fell French Canon SC",
                  fontSize: "40px",
                  color: "#493a24",
                  margin: "10px",
                }}
              >
                Please reset your browser.
              </h2>
            </center>
          </div>
        ) : null}
        <center>
          <div
            style={{
              position: "absolute",
              top: "-70px",
              left: "-250px",
              width: "150px",
              height: "430px",
              backgroundColor: "#c2b280",
              border: "10px solid #493a24",
              marginTop: "60px",
              marginBottom: "20px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <h1
              style={{
                fontFamily: "IM Fell French Canon SC",
                fontSize: "20px",
                color: "#493a24",
                margin: "10px",
              }}
            >
              Instructions
            </h1>
            <p
              style={{
                fontFamily: "Noto Sans SC",
                fontSize: "13.5px",
                color: "#493a24",
                margin: "10px",
              }}
            >
              Use the arrow keys on your keyboard to navigate yourself to the
              safety of the hidden oasis. Take heed, dangerous traps await you,
              and you'll have to use whatever resources you can find to solve
              the challenges that lay ahead of you, but the rewards are worth
              their weight in gold. Use the reset button in your browser to
              reset the game.
            </p>
          </div>
        </center>
        <center>
          <div
            style={{
              position: "absolute",
              top: "-70px",
              right: "-250px",
              width: "150px",
              height: "100px",
              backgroundColor: "#c2b280",
              border: "10px solid #493a24",
              marginTop: "60px",
              marginBottom: "-20px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <h3
              style={{
                fontFamily: "IM Fell French Canon SC",
                fontSize: "20px",
                color: "#493a24",
                margin: "10px",
                marginBottom: "20px",
              }}
            >
              Lives left: {loseALife(props)}
            </h3>
            <h3
              style={{
                fontFamily: "IM Fell French Canon SC",
                fontSize: "20px",
                color: "#493a24",
                margin: "10px",
              }}
            >
              Score: {pickups(props)};
            </h3>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              right: "-250px",
              width: "150px",
              height: "300px",
              backgroundColor: "#c2b280",
              border: "10px solid #493a24",
              marginTop: "-60px",
              marginBottom: "20px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <h1
              style={{
                fontFamily: "IM Fell French Canon SC",
                fontSize: "20px",
                color: "#493a24",
                margin: "10px",
              }}
            >
              Inventory
            </h1>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {props.tiles[0][9] ? null : (
                <img
                  src="/tiles/coins.png"
                  alt="coins1"
                  height="20"
                  width="20"
                />
              )}

              {props.tiles[0][19] ? null : (
                <img
                  src="/tiles/coins.png"
                  alt="coins2"
                  height="20"
                  width="20"
                />
              )}
              {props.tiles[1][17] ? null : (
                <img
                  src="/tiles/treasureChest.png"
                  alt="treasure1"
                  height="30"
                  width="20"
                />
              )}
              {props.tiles[2][0] ? null : (
                <img
                  src="/tiles/coins.png"
                  alt="coins3"
                  height="20"
                  width="20"
                />
              )}

              {props.tiles[3][14] ? null : (
                <img src="/tiles/vase.png" alt="vase" height="25" width="15" />
              )}
              {props.tiles[5][11] ? null : (
                <img
                  src="/tiles/snorkel.png"
                  alt="snorkel"
                  height="30"
                  width="20"
                />
              )}
              {props.tiles[8][2] ? null : (
                <img
                  src="/tiles/treasureChest.png"
                  alt="treasure2"
                  height="30"
                  width="20"
                />
              )}
              {props.tiles[8][9] ? null : (
                <img
                  src="/tiles/treasureChest.png"
                  alt="treasure3"
                  height="30"
                  width="20"
                />
              )}
              {props.tiles[9][12] ? null : (
                <img
                  src="/tiles/coins.png"
                  alt="coins4"
                  height="20"
                  width="20"
                />
              )}
            </div>
          </div>
        </center>
        <div />
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    tiles: state.map.tiles,
  };
}

export default connect(mapStateToProps)(Map);
