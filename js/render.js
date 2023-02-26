const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("render")});
renderer.setSize(window.innerWidth, window.innerHeight);

let tload = new THREE.TextureLoader;
let ctload = new THREE.CubeTextureLoader();