let w = {
  positions: [],
  normals: [],
  indices: [],
}

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
  gameScene.background = new THREE.Color(0xbef0ff);
  gameCam.rotation.order = "YXZ"
  noise.seed(69)
  let chunk = []
  for (let x = 0; x < 16; x++) {
    for (let z = 0; z < 16; z++) {
      let n = round(noise.simplex2(x / 50, z / 50) * 5)
      chunk.push([2, x, n, z])
    }
  }
  genGeometry(chunk)
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshLambertMaterial({
    color: 'green'
  });
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(w.positions), 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(w.normals), 3));
  geometry.setIndex(w.indices);
  const mesh = new THREE.Mesh(geometry, material);
  gameScene.add(mesh);
}

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------


function delWorld() {
  gameScene.remove.apply(gameScene, gameScene.children);
  w.positions = []
  w.normals = []
  w.indices = []
}

function genGeometry(c) {
  const positions = [];
  const normals = [];
  const indices = [];
  c.forEach((e) => {
    for (const {
        dir,
        corners
      } of faces) {
      let neighbor = getBlock(c,e[1]+dir[0], e[2]+dir[1], e[3]+dir[2])
      if (!neighbor) {
        const ndx = positions.length / 3
        for (const pos of corners) {
          positions.push(pos[0]+x, pos[1]+e[2], pos[2]+e[3]);
          normals.push(...dir);
        }
        indices.push(ndx, ndx+1, ndx+2, ndx+2, ndx+1, ndx+3, );
      }
    }
  })
  w.positions = positions
  w.normals = normals
  w.indices = indices
}

function getBlock(c, x, y, z) {
  let block = false
  c.forEach((e) => {
    p(e[1],e[2],e[3])
    if (e[1] == x && e[2] == y && e[3] == z) {
      block = true
    }
  })
  return block;
}

faces = [{ // left
    dir: [-1, 0, 0, ],
    corners: [
      [0, 1, 0],
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
  },
  { // right
    dir: [1, 0, 0, ],
    corners: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
      [1, 0, 0],
    ],
  },
  { // bottom
    dir: [0, -1, 0, ],
    corners: [
      [1, 0, 1],
      [0, 0, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  },
  { // top
    dir: [0, 1, 0, ],
    corners: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 0],
      [1, 1, 0],
    ],
  },
  { // back
    dir: [0, 0, -1, ],
    corners: [
      [1, 0, 0],
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  },
  { // front
    dir: [0, 0, 1, ],
    corners: [
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
      [1, 1, 1],
    ],
  },
];
