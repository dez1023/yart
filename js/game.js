let blocks
function getBlock(id) {
  let block = blocks[2];
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
  gameCam.fov = gs.fov
  renderer.setSize(innerWidth, innerHeight);
};

let textures = []
let models = [
  "blocks/plant.gltf"
]

function preLoad() {
  function add(t) {
    let tex = tload.load(assets + "blocks/" + t)
    tex.magFilter = THREE.NearestFilter;
    textures.push([t, tex])
  }
  for (let i = 0; i < blocks.length; i++) {
    let load = null
    let b = blocks[i]
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

let createdWorld = false

function pointerLock(t) {
  if (t && gs.inGame && !gs.paused) {
    db.requestPointerLock();
  }else{
    document.exitPointerLock()
  }
}

document.addEventListener("pointerlockchange", function(e) {
  if (document.pointerLockElement == db) {
    gs.pointerLock = true;
  }else{
    pointerLock(false)
    setScreen(3);
    gs.paused = true;
    gs.pointerLock = true;
  }
})

function initSP() {
  setScreen(null)
  setScene(gameScene, gameCam, runGame)
  gs.inGame = true;
  gs.paused = false;
  pointerLock(true)

  if (!createdWorld) {
    createdWorld = true;
    genDemo()
  }
}

function leaveSP() {
  setScreen(0);
  setScene(panScene, panCam, renderPan);
  gs.inGame = false;
  gs.paused = true;
  pointerLock(false);
}

function createBlockFrom(id, x1, y1, z1, x2, y2, z2) {
  let block = createBlock(id, (x1 + x2)/2, (y1 + y2)/2, (z1 + z2)/2)
  //p((x1 + x2)/2, (y1 + y2)/2, (z1 + z2)/2)
  let sx = round(x2 - x1)
  let sy = round(y2 - y1)
  let sz = round(z2 - z1)
  block.position.x+=0.5
  block.position.y+=0.5
  block.position.z+=0.5
  block.scale.x = sx
  block.scale.y = sy
  block.scale.z = sz
  let mat = [null, null, null, null, null, null]
  function fixTx(e, xr, yr) {
    if (e != null) {
      let ntx = block.material[e].map.clone()
      ntx.wrapS = THREE.RepeatWrapping;
      ntx.wrapT = THREE.RepeatWrapping;
      ntx.repeat.set(xr, yr)
      ntx.needsUpdate = true
      mat[e] = new THREE.MeshMatcapMaterial({ map: ntx, matcap: tload.load(assets+"matcap.png") });
      mat[e].color.set(block.material[e].color)
    } else {
      console.log("null")
    }
  }
  fixTx(0, sz, sy)
  fixTx(1, sz, sy)
  fixTx(2, sx, sz)
  fixTx(3, sx, sz)
  fixTx(4, sx, sy)
  fixTx(5, sx, sy)
  block.material = mat
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
      let mat = new THREE.MeshMatcapMaterial({ map: tex, matcap: tload.load(assets+"matcap.png")  })
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