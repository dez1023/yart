const chunksize = 16
const worldsize = 5

let w = {
  chunkSize: chunksize,
  sliceSize: chunksize * chunksize,
  chunks: Array.from(new Uint8Array(worldsize*worldsize)),
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
  createBlock(-3,0,4,5)

  gameScene.background = new THREE.Color(0xbef0ff);
  gameCam.rotation.order = "YXZ"
}

function genWorld() {
  gameScene.background = new THREE.Color(0xbef0ff);
  gameCam.rotation.order = "YXZ"
  
  for (i=0;i<worldsize*worldsize;i++) {
    genChunk(i)
  }

  /*
  genChunk(0)
  genChunk(1)
  */
}

function genChunk(i) {
  // i = 12
  noise.seed(69)
  const {cx,cz} = indexPos(i)
  let chunk = new Uint8Array(chunksize * chunksize * chunksize)
  createBlockFrom(-2, -1, -1, 0, 0, 0, 16)
  createBlockFrom(-2,-1,-1,-1,0,16,0)
  w.chunks.splice(i,1,chunk)
  for (let x = 0; x < w.chunkSize; x++) {
    for (let y = 0; y < 16; y++) {
      for (let z = 0; z < w.chunkSize; z++) {
        let n = (noise.simplex2((x + cx*w.chunkSize) / 50, (z + cz*w.chunkSize) / 50) * 8)+7
        if (y < n) {
          queueBlock((x + cx*w.chunkSize), y, (z + cz*w.chunkSize), 1, [cx,cz,i])
        }
        queueBlock((x + cx*w.chunkSize), 0, (z + cz*w.chunkSize), 1, [cx,cz,i])
      }
    }
  }
  const {positions, normals, indices} = genGeometry(cx,cz,i)
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshMatcapMaterial({color: 'green', matcap: textures[0][1]});
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
  geometry.setIndex(indices);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (cx-worldsize/2)*w.chunkSize
  mesh.position.z = (cz-worldsize/2)*w.chunkSize
  gameScene.add(mesh);
  //mesh.visible = false
}

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------


function delWorld() {
  gameScene.remove.apply(gameScene, gameScene.children);
  w.chunks = []
}

function blockOffset(x, y, z) {
  const voxelX = THREE.MathUtils.euclideanModulo(x, w.chunkSize) | 0;
  const voxelY = THREE.MathUtils.euclideanModulo(y, w.chunkSize) | 0;
  const voxelZ = THREE.MathUtils.euclideanModulo(z, w.chunkSize) | 0;
  return voxelY*w.sliceSize+voxelZ*w.chunkSize+voxelX;
}

function indexPos(i) {
  const cz = Math.floor(i/worldsize)
  const cx = i-(cz*worldsize)
  return {cz, cx}
}

function inChunk(x,z,c) {
  const cx = x-c[0]*w.chunkSize
  const cz = z-c[1]*w.chunkSize
  if (cx>-1 && cx<w.chunkSize && cz>-1 && cz<w.chunkSize) {
    return true
  }else{
    return false
  }
}

function queueBlock(x, y, z, id, c) {
  if (!inChunk(x,z,c)) {
    return
  }
  let off = blockOffset(x,y,z,c)
  let ind = c[2]
  w.chunks[ind][off] = id
}

function findBlock(x, y, z, c) {
  if (!inChunk(x,z,c)) {
    return 0;
  }
  let off = blockOffset(x,y,z, c)
  let ind = c[2]
  return w.chunks[ind][off]
}

function genGeometry(cx,cz,c) {
  // credit to threejs fundamentals
  const positions = [];
  const normals = [];
  const indices = [];
  const startX = cx * w.chunkSize
  const startZ = cz * w.chunkSize
  for (let x = 0; x < w.chunkSize; x++) {
    const vX = x + startX
    for (let y = 0; y < w.chunkSize; y++) {
      for (let z = 0; z < w.chunkSize; z++) {
        const vZ = z + startZ
        let bl = findBlock(vX,y,vZ,[cx,cz,c])
        if (bl) {
          for (const {dir, corners} of faces) {
            const neighbor = findBlock(vX + dir[0], y + dir[1], vZ + dir[2],[cx,cz,c])
            if (!neighbor) {
              const ndx = positions.length / 3;
                for (const pos of corners) {
                  positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
                  normals.push(...dir);
                }
                indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3,);
              }
            }
          }
        }
      }
    }
  return {positions,normals,indices}
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
