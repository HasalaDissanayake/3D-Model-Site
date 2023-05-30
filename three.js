import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const pmremGenerator = new THREE.PMREMGenerator( renderer );

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set( 0.005, 0.005, 1.5 );

const loader = new GLTFLoader();
loader.load( 'wizard.glb', function ( gltf ) {

    const model = gltf.scene;
	scene.add( model);

}, undefined, function ( error ) {

	console.error( error );

});

window.onresize = function () {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};

const light1 = new THREE.PointLight( 0xffffff, 20, 100 );
light1.position.set( 50, 30, 50 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0xffffff, 10, 100 );
light2.position.set( -50, 30, 50 );
scene.add(light2);

const light3 = new THREE.PointLight( 0xffffff, 2, 100 );
light3.position.set( 0, 30, -5 );
scene.add(light3);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    requestAnimationFrame(animate);
    controls.update();

	renderer.render( scene, camera );
}

animate();