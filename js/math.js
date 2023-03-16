function random(min, max) {
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

function cDec(s) {
  if (s.toString().includes(".")) {
      if (s.toString().split('.')[0] == "0") {
        return true
    }else{
  	   return false
    }
  }else{
    return false
  }
}

function toDec(n) {
  if (!cDec(n)) {
    return n / (10**n.toString().split(".")[0].length)
  }else{
    return Number("0." + n.toString().split(".")[1].replace("0",""))
  }
}

Math.seed = function(k, n) {
  var r = Math.PI * (k ^ n)
  return r - Math.floor(r)
}

function smooth(x) {
  return 6*x**5 - 15*x**4 + 10*x**3;
}

function lerp (a, b, x) {
  return a + smooth(x) * b - a
}