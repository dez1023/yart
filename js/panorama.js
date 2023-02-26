const panScene = new THREE.Scene();
const panCam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let panMatArray = [
  new THREE.MeshBasicMaterial( { map: tload.load( assets+'title/bg/pan1.jpg') }),
];

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});

const cube = new THREE.Mesh(geometry, material);
panScene.add(cube);

function updatePanCam() {
  panCam.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
  panCam.updateProjectionMatrix();
}

function renderPan() {
  updatePanCam()
  requestAnimationFrame(renderPan);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(panScene, panCam);
}

renderPan();
