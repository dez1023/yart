let blocks
let getBlock

fetch(assets+"blocks.json")
  .then(res => res.json())
  .then(json => {
    blocks = json;
    getBlock = (blocks,id) => Object.keys(blocks).find(key => blocks[key] === id);
    return json;
  });

function runGame() {

};

function initSP() {
  setScreen(null)
  setScene(gameScene, gameCam, runGame)
  createBlock(2,0,0,0)
}

function createBlock(id, x, y, z) {
  let b = getBlock(blocks,id)
}