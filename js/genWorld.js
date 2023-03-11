function genDemo() {
    let lastblock = blocks[blocks.length - 1].id
    for (let i = 0; i < lastblock; i++) {
      createBlock(i + 1, round(i - (lastblock * 0.472)), 0, 0)
      //p(round(i - (lastblock * 0.472)))
    }

    createBlockFrom(2, -8, -2, -8, 8, -1, 8)
    createBlockFrom(3, -8, -4, -8, 8, -2, 8)
    createBlockFrom(1, -8, -14, -8, 8, -4, 8)
  
    createBlockFrom(-2, -1, 0, 4, 0, 3, 5)

    gameScene.background = new THREE.Color(0xbef0ff);
    gameCam.rotation.order = "YXZ"
}

function genWorld() {
  p("deez nuts")
}