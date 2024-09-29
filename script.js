const startPerm = confirm("Do you want to start the puzzle?");

if (!startPerm) {
       alert("Okay then...");
       window.stop()
}

const tiles = document.querySelectorAll(".puzzle .tile");
const emptyTile = document.querySelector(".puzzle .empty");
const emptyStyle = getComputedStyle(emptyTile);
const positions = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];
const correctPos = {}

for (let tile of tiles) {
       const tileStyle = getComputedStyle(tile);
       correctPos[tile.classList[1]] = tileStyle.getPropertyValue("grid-row") + tileStyle.getPropertyValue("grid-column");
}

function checkWin() {
       for (let tile of tiles) {
              const tileStyle = getComputedStyle(tile);
              if (correctPos[tile.classList[1]] != tileStyle.getPropertyValue("grid-row") + tileStyle.getPropertyValue("grid-column")) {
                     return false
              }
       } 

       return true
}

function randomizePuzzle(_positions) {
       for (let i = 0; i < _positions.length; i++) { //generating random positions
              const randomIndex = Math.floor(Math.random() * _positions.length);
              const currentElem = _positions[i];

              _positions[i] = _positions[randomIndex];
              _positions[randomIndex] = currentElem;
       }

       for (let i = 0; i < _positions.length; i++) {
              tiles[i].style.gridColumn = _positions[i][1];
              tiles[i].style.gridRow = _positions[i][0];
       }
}

function swapTile(tile) {
       const tileStyle = getComputedStyle(tile);
       const emptyTileRow = emptyStyle.getPropertyValue("grid-row");
       const emptyTileCol = emptyStyle.getPropertyValue("grid-column");
       const tileRow = tileStyle.getPropertyValue("grid-row");
       const tileCol = tileStyle.getPropertyValue("grid-column");

       if (((emptyTileCol-1 == tileCol || +emptyTileCol+1 == tileCol) && emptyTileRow == tileRow) || ((emptyTileRow-1 == tileRow || +emptyTileRow+1 == tileRow) && emptyTileCol == tileCol)) {
              emptyTile.style.gridRow = tileRow;
              emptyTile.style.gridColumn = tileCol;
       
              tile.style.gridRow = emptyTileRow;
              tile.style.gridColumn = emptyTileCol;
       }
}

tiles.forEach(tile => {
       tile.addEventListener("click", () => {
              swapTile(tile);
              if (checkWin()) {
                     alert("Eyyyyyy, you did it!\n\nNow do it again....");
                     randomizePuzzle(positions);
              }
       });
});

document.addEventListener("DOMContentLoaded", () => {
       randomizePuzzle(positions);
})
