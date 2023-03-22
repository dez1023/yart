let rendcanv = document.getElementById("render")

const renderer = new THREE.WebGLRenderer({canvas: rendcanv, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

let gameScene = new THREE.Scene();
let gameCam = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

let currentScene = gameScene;
let currentCam = gameCam;
let renderFunc = function() {};

let tload = new THREE.TextureLoader;
let ctload = new THREE.CubeTextureLoader();
let gltfload = new THREE.GLTFLoader();

let currentFunc = null

function setScene(scene,cam,f) {
  currentScene = scene;
  currentCam = cam;
  renderFunc = f
}

let FPSbefore = Date.now()/1000

function render() {
  gs.FPS = (1/((Date.now()/1000)-FPSbefore)).toFixed(0)
  FPSbefore = Date.now() /1000
  window.requestAnimationFrame(render)
  if ((!gs.paused && gs.inGame)||(gs.paused && !gs.inGame)) {
    gs.rendering = true
    renderer.render(currentScene, currentCam)
    renderFunc()
  }else{
    gs.rendering = false
  }
}

render()