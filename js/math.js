function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function round(x) {
  return Math.floor(x + 0.5)
}

function dtr(n) {
  return THREE.MathUtils.degToRad(n);
}

function tick() {
   return new Date().getTime();
}