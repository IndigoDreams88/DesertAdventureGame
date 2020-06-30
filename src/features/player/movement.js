import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

export default function handleMovement(player) {
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];

      case "EAST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];

      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];

      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }
  }

  function handleWin(tiles, y, x, nextTile) {
    const newTiles = tiles.map((tile, index) => {
      if (y === index) {
        tile.splice(x, 1, 11);
        return tile;
      } else {
        return tile;
      }
    });

    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles: newTiles,
      },
    });
  }

  function handlePickup(tiles, y, x, nextTile) {
    const newTiles = tiles.map((tile, index) => {
      if (y === index) {
        tile.splice(x, 1, 0);
        return tile;
      } else {
        return tile;
      }
    });

    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles: newTiles,
      },
    });
  }

  function handleObstacle(tiles, y, x, nextTile) {
    const newTiles = tiles.map((tile, index) => {
      if (y === index) {
        tile.splice(x, 1, 0);
        return tile;
      } else {
        return tile;
      }
    });
    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles: newTiles,
      },
    });
  }

  function handleDeath(tiles, y, x, nextTile) {
    let noOfDeaths = 0;

    const newTiles = tiles.map((tile, index) => {
      if (y === index) {
        tile.splice(x, 1, 10.5);
        noOfDeaths++;

        return tile;
      } else {
        return tile;
      }

      if (noOfDeaths === 3) {
        tile.splice(x, 1, 10.5);
      }
    });

    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles: newTiles,
      },
    });
  }

  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case "SOUTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
      case "EAST":
        return ` ${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case "WEST":
        return ` ${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
      case "NORTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 7 ? 0 : walkIndex + 1;
  }

  function observeBoundaries(oldPos, newPos) {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      newPos[1] >= 0 &&
      newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
    );
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    if (
      nextTile === 2.5 ||
      nextTile === 3.5 ||
      nextTile === 4 ||
      nextTile === 4.5
    ) {
      handlePickup(tiles, y, x, nextTile);
    } else if (
      (nextTile === 5.5 && tiles[3][14] === 0) ||
      (nextTile === 6.6 && tiles[5][11] === 0)
    ) {
      handleObstacle(tiles, y, x, nextTile);
    } else if (nextTile === 7.5 || nextTile === 8.5 || nextTile === 9.5) {
      handleDeath(tiles, y, x, nextTile);
    } else if (nextTile === 3) {
      handleWin(tiles, y, x, nextTile);
    }
    return nextTile < 5;
  }

  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex();
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
      },
    });
  }

  function attemptMove(direction) {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);

    if (
      observeBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos)
    ) {
      dispatchMove(direction, newPos);
    }
  }

  function handleKeyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 37:
        return attemptMove("WEST");

      case 38:
        return attemptMove("NORTH");

      case 39:
        return attemptMove("EAST");

      case 40:
        return attemptMove("SOUTH");

      default:
    }
  }

  window.addEventListener("keydown", (e) => {
    handleKeyDown(e);
  });

  return player;
}
