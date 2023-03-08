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
  xr: 0,
  yr: 0,
}

window.onkeydown = function(e) {
    if (e.which == 65) {
      ctrls.a = true;
    }
    if (e.which == 87) {
      ctrls.w = true;
    }
    if (e.which == 68) {
      ctrls.d = true;
    }
    if (e.which == 83) {
      ctrls.s = true;
    }
    if (e.which == 69) {
      ctrls.e = true;
    }
    if (e.which == 81) {
      ctrls.q = true;
    }
    if (e.which == 37) {
      ctrls.left = true;
    }
    if (e.which == 39) {
      ctrls.right = true;
    }
    if (e.which == 38) {
      ctrls.up = true;
    }
    if (e.which == 40) {
      ctrls.down = true;
    }
  };
  window.onkeyup = function(e) {
    if (e.which == 65) {
      ctrls.a = false;
    }
    if (e.which == 87) {
      ctrls.w = false;
    }
    if (e.which == 68) {
      ctrls.d = false;
    }
    if (e.which == 83) {
      ctrls.s = false;
    }
    if (e.which == 69) {
      ctrls.e = false;
    }
    if (e.which == 81) {
      ctrls.q = false;
    }
    if (e.which == 37) {
      ctrls.left = false;
    }
    if (e.which == 39) {
      ctrls.right = false;
    }
    if (e.which == 38) {
      ctrls.up = false;
    }
    if (e.which == 40) {
      ctrls.down = false;
    }
  };

function update() {
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
  if (ctrls.left) {
    ctrls.yr += 1;
  }
  if (ctrls.right) {
    ctrls.yr -= 1;
  }
  if (ctrls.up) {
    ctrls.xr += 3;
  }
  if (ctrls.down) {
    ctrls.xr -= 3;
  }
  gameCam.rotation.x = dtr(ctrls.xr)
  gameCam.rotation.y = dtr(ctrls.yr)
  window.requestAnimationFrame(update)
}

update()