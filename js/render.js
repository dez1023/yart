const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("render")});
renderer.setSize(window.innerWidth, window.innerHeight);

let gameScene = new THREE.Scene();
let gameCam = new THREE.Camera();

let currentScene = gameScene;
let currentCam = gameCam;
let renderFunc = function() {};

let tload = new THREE.TextureLoader;
let ctload = new THREE.CubeTextureLoader();

function setScene(scene,cam,f) {
  currentScene = scene;
  currentCam = cam;
  renderFunc = f;
}

function render() {
  window.requestAnimationFrame(render)
  renderer.render(currentScene, currentCam)
  renderFunc()
}

render()