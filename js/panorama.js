const panScene = new THREE.Scene();
const panCam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let blur = ui.div(db);
blur.classList.add("blur")
addToScreen(blur,0)

panScene.background = ctload.load([
  assets+"title/bg/pan2.png",
  assets+"title/bg/pan4.png",
  assets+"title/bg/pan5.png",
  assets+"title/bg/pan6.png",
  assets+"title/bg/pan1.png",
  assets+"title/bg/pan3.png",
])

function updatePanCam() {
  panCam.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
  panCam.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
}

panCam.rotation.order = "YXZ"

function renderPan() {
  updatePanCam()
  requestAnimationFrame(renderPan);
  //panCam.rotation.x = dtr(-30);
  panCam.rotation.y = dtr(tick()/500)
  panCam.rotation.x = dtr((Math.sin(tick()/10000)*15)-30)
  renderer.render(panScene, panCam);
}

renderPan();
