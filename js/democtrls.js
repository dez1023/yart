let ctrls = {
  w: false,
  a: false,
  s: false,
  d: false,
  e: false,
  q: false,
  left: false,
  right: false,
  up: false,
  down: false,
  mx: 0,
  my: 0,
  xr: 0,
  yr: 0,
}

document.addEventListener("keydown", function(e) {
  e.preventDefault()
  const k = e.key
  switch (event.key) {
    case "w":
      ctrls.w = true;
      break;
    case "a":
      ctrls.a = true;
      break;
    case "s":
      ctrls.s = true;
      break;
    case "d":
      ctrls.d = true;
      break;
    case "q":
      ctrls.q = true;
      break;
    case "e":
      ctrls.e = true;
      break;
    case "\`":
      pointerLock(false)
      setScreen(3);
      gs.paused = true;
      break;
  }
})

document.addEventListener("keyup", function(e) {
  const k = e.key
  switch (event.key) {
    case "w":
      ctrls.w = false;
      break;
    case "a":
      ctrls.a = false;
      break;
    case "s":
      ctrls.s = false;
      break;
    case "d":
      ctrls.d = false;
      break;
    case "q":
      ctrls.q = false;
      break;
    case "e":
      ctrls.e = false;
      break;
  }
})

db.addEventListener("mousemove",(e) => {
  const {
    movementX,
    movementY
  } = e;
  if (!gs.paused && gs.inGame) {
    ctrls.mx-=movementY*(gs.sens/100)*0.2
    ctrls.my-=movementX*(gs.sens/100)*0.2
  }
})

function update() {
  window.requestAnimationFrame(update)
  if (!gs.paused && gs.inGame) {
          if (ctrls.a) {
      gameCam.position.x -= 0.1 * Math.sin(((ctrls.yr + 90) * Math.PI) / 180);
      gameCam.position.z -= 0.1 * Math.cos(((ctrls.yr + 90) * Math.PI) / 180);
    }
    if (ctrls.d) {
      gameCam.position.x += 0.1 * Math.sin(((ctrls.yr + 90) * Math.PI) / 180);
      gameCam.position.z += 0.1 * Math.cos(((ctrls.yr + 90) * Math.PI) / 180);
    }
    if (ctrls.w) {
      gameCam.position.x -= 0.1 * Math.sin((ctrls.yr * Math.PI) / 180);
      gameCam.position.z -= 0.1 * Math.cos((ctrls.yr * Math.PI) / 180);
    }
    if (ctrls.s) {
      gameCam.position.x += 0.1 * Math.sin((ctrls.yr * Math.PI) / 180);
      gameCam.position.z += 0.1 * Math.cos((ctrls.yr * Math.PI) / 180);
    }
    if (ctrls.e) {
      gameCam.position.y += 0.1
    }
    if (ctrls.q) {
      gameCam.position.y -= 0.1
    }
    ctrls.xr = ctrls.mx
    ctrls.yr = ctrls.my
    gameCam.rotation.x = dtr(ctrls.xr)
    gameCam.rotation.y = dtr(ctrls.yr)
  }
}

db.addEventListener("click", (e) => {
  pointerLock(true)
});

update()