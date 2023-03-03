let blocks
let getBlock

/*

fetch(assets+'blocks.json')
  .then((res) => {
        return res.json();
      })
      .then((json) => {
         console.log(json);
      });

*/

async function loadBlocks() {
  const response = await fetch(assets+'blocks.json');
  const names = await response.json();
  console.log(names); 
}

loadBlocks()

function runGame() {

};

function initSP() {
  setScreen(null)
  setScene(gameScene, gameCam, runGame)
  createBlock(2, 0, 0, 0)
}

function createBlock(id, x, y, z) {
  let b = getBlock(blocks, id)
}