import { GLTFLoader } from "./GLTFLoader.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new GLTFLoader();

var obj;
loader.load('assets/room.gltf', function(gltf) {
	obj = gltf.scene;
	scene.add(gltf.scene);
});
var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(light);
camera.position.set(0,0,10);
function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
// Jank - event proccess delay (throttle? lodash?)
window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	setCanvasDimensions(renderer.domElement, width, height);
});
animate();