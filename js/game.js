let blocks
function getBlock(id) {
  let block = blocks[1];
  for (let i = 0; i < blocks.length; i++) {
    let obj = blocks[i];
    if (obj.id == id) {
      block = obj
    }
  }
  return block;
}

fetch(assets + 'blocks.json')
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    blocks = json;
    preLoad()
  });

let e = null

function runGame() {
  gameCam.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
  gameCam.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};

let textures = []
let models = [
  "blocks/plant.gltf"
]

function preLoad() {
  for (let i = 0; i < blocks.length; i++) {
    let load = null
    let b = blocks[i]
    function add(t) {
      let tex = tload.load(assets + "blocks/" + t)
      tex.magFilter = THREE.NearestFilter;
      textures.push([t, tex])
    }
    if (b.tx) {
      add(b.tx)
    }
    if (b.toptx) {
      add(b.toptx)
    }
    if (b.btmtx) {
      add(b.btmtx)
    }
    if (b.sidetx) {
      add(b.sidetx)
    }
  }
  function load(e) {
    gltfload.load(assets + models[e], function(gltf) {
      models.splice(e, 1)
      models.push(gltf)
    })
  }
  for (let i = 0; i < models.length; i++) {
    load(i)
  }
}

function initSP() {
  setScreen(null)
  setScene(gameScene, gameCam, runGame)

  let lastblock = blocks[blocks.length - 1].id


  for (let i = 0; i < lastblock; i++) {
    createBlock(i + 1, i - (lastblock * 0.472), 0, 0)
  }

  /*
  for (let z = 0; z < 16; z++) {
    for (let x = 0; x < 16; x++) {
      createBlock(2,x,0,z)
    }
  }*/

  createBlockFrom(2, -8, -2, -8, 8, -1, 8)
  createBlockFrom(3, -8, -4, -8, 8, -2, 8)
  createBlockFrom(1, -8, -14, -8, 8, -4, 8)

  createBlock(-2, 1, 0, 5)
  createBlock(-2, -1, 0, 5)
  createBlockFrom(-2, -0.5, 0.5, 4.5, 0.5, 3.5, 5.5)

  gameScene.background = new THREE.Color(0xbef0ff);
  gameCam.rotation.order = "YXZ"
}

function createBlockFrom(id, x1, y1, z1, x2, y2, z2) {
  let block = createBlock(id, (x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2)
  block.scale.x = x2 - x1;
  block.scale.y = y2 - y1;
  block.scale.z = z2 - z1;
  let mat = [null, null, null, null, null, null]
  function fixTx(e, xr, yr) {
    if (e != null) {
      let ntx = block.material[e].map.clone()
      ntx.wrapS = THREE.RepeatWrapping;
      ntx.wrapT = THREE.RepeatWrapping;
      ntx.repeat.set(xr, yr)
      ntx.needsUpdate = true
      mat[e] = new THREE.MeshMatcapMaterial({ map: ntx });
      mat[e].color.set(block.material[e].color)
    } else {
      console.log("null")
    }
  }
  let x = x2 - x1
  let y = y2 - y1
  let z = z2 - z1
  fixTx(0, z, y)
  fixTx(1, z, y)
  fixTx(2, x, z)
  fixTx(3, x, z)
  fixTx(4, x, y)
  fixTx(5, x, y)
  block.material = mat
  //console.log(block.material)
}

function createBlock(id, x, y, z) {
  let b = getBlock(id)
  let tx = [null, null, null, null, null, null]
  function add(i, t, single) {
    let tex = null
    textures.forEach((e) => {
      if (e[0] == t) {
        tex = e[1]
      }
    })
    if (t != null && tex != null) {
      let mat = new THREE.MeshMatcapMaterial({ map: tex })
      if (b.display == "plant") {
        mat.transparent = true;
        mat.side = THREE.DoubleSide
      }
      if (b.transparent == true) {
        mat.transparent = true;
      }
      if (!single) {
        tx[i] = mat;
      } else {
        tx = mat;
      }
      return tex, mat;
    } else {
      if (!single) {
        tx[i] = null;
      } else {
        tx = null;
      }
    }
  }
  if (b.tx) {
    if (b.display == "block" || b.display == null) {
      for (let i = 0; i < 6; i++) {
        let tex, mat = add(i, b.tx)
        if (b.bc) {
          mat.color.set(0x6eff00)
        }
      }
    } else {
      if (b.display == "plant") {
        let tex, mat = add(0, b.tx, true)
        if (b.bc) {
          mat.color.set(0x6eff00)
        }
      }
    }
  }
  if (b.sidetx) {
    add(0, b.sidetx)
    add(1, b.sidetx)
    add(2, null)
    add(3, null)
    add(4, b.sidetx)
    add(5, b.sidetx)
  }
  if (b.toptx) {
    let tex, mat = add(2, b.toptx)
    if (b.bcTop) {
      mat.color.set(0x06eff00)
    }
  }
  if (b.btmtx) {
    add(3, b.btmtx)
  }
  let block = null;
  if (b.display == "block") {
    block = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), tx);
  }
  if (b.display == "plant") {
    block = null
    models[0].scene.traverse(function(child) {
      if (child.name == "Plant") {
        block = child.clone()
        block.material = tx;
      }
    })
  }
  if (b.display == null) {
    block = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), tx);
  }
  if (block) {
    block.position.x = x
    block.position.y = y
    block.position.z = z
    gameScene.add(block)
    return block;
  } else {
    console.log("failed block id: " + id)
  }
}