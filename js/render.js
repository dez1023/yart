const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("render"), antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

let gameScene = new THREE.Scene();
let gameCam = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

let currentScene = gameScene;
let currentCam = gameCam;
let renderFunc = function() {};

const iload = new THREE.ImageLoader();
let tload = new THREE.TextureLoader;
let ctload = new THREE.CubeTextureLoader();
let gltfload = new THREE.GLTFLoader();

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