import './style.css'

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/Addons.js';

// Store Mouse Position
const mouse = {
  isDragging: false,
  delta_X: 0,
  prev: {x: 0}
};

const defaultOrientation = -Math.PI / 2;
const pack = {
  sensitivity: 0.0032,
  target_rotation: defaultOrientation,
  current_rotation: defaultOrientation,
  lerp: 0.1
};

const pixelRatio = window.devicePixelRatio || 1;

// Mouse Tracking
function handleStart(x) {
  mouse.isDragging = true;
  mouse.prev.x = x;
}

function rotatePack(x) {
  if (mouse.isDragging) {
    mouse.delta_X = (x - mouse.prev.x) / pixelRatio;
    pack.target_rotation += mouse.delta_X * pack.sensitivity;
    mouse.prev.x = x;
  } else {
    return;
  }
}

function handleMovement(e) {
  rotatePack(e.clientX);
}
window.addEventListener('pointerdown', (e) => {
  if (e.button === 0) handleStart(e.clientX);
});

window.addEventListener('pointermove', handleMovement, {passive: false});

window.addEventListener('pointerup', () => {
  mouse.isDragging = false;
});

// Initialize Buttons
const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector('#close');
let openPressed = false;

// Initialize Slider
const flash = document.getElementById('flash');
const slider = document.querySelector('.slider-container');
var value = document.getElementById('range');

// Button Listeners
openBtn.addEventListener('click', () => {
  openBtn.style.display = 'none';
  openPressed = true;

  // reset original slider value
  value.value = 50;
  closeBtn.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  closeBtn.style.display = 'none';
  slider.style.display = 'none';
  openPressed = false;

  openBtn.style.display = 'block';
  window.addEventListener('pointermove', handleMovement, {passive: false});
  camera.position.setZ(30);  // reset camera position
})

// ------------------------Scene Setup------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    90, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.setZ(30);  // initial position

renderer.render(scene, camera);

// Update Canvas Size Based on Window Changes
window.addEventListener('resize', () => {
  // Update Camera Size
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix;

  // Update Render Size
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Load Pack
let packModel;
const loader = new GLTFLoader();
loader.load('/TCGP.glb', function(glb) {
  packModel = glb.scene;
  packModel.scale.set(6, 6, 6);
  packModel.rotation.y = defaultOrientation;

  scene.add(packModel);
});

// Add Light
const light = new THREE.DirectionalLight(0xffffff, 2.5);
light.position.set(2, 3, 5);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  // Change Pack State if Open Button is Pressed
  if (openPressed) {
    // Zoom in On Pack
    camera.position.setZ(20);
    window.removeEventListener('pointermove', handleMovement);

    // Rotate Pack Back To Default Position
    const diff = defaultOrientation - packModel.rotation.y;

    if (Math.abs(diff) > 0.0001) {
      packModel.rotation.y += diff * 0.1;
    } else {
      packModel.rotation.y = defaultOrientation;
      pack.current_rotation = defaultOrientation;
      pack.target_rotation = defaultOrientation;
      slider.style.display = 'block';  // display slider after pack resets

      
    }
  } else {
    // If We Haven't Slowed Down Enough
    if (Math.abs(mouse.delta_X) > 0.0001) {
      // Movement Physics
      mouse.delta_X *= 0.985;
      pack.target_rotation += mouse.delta_X * pack.sensitivity;
      pack.current_rotation +=
          (pack.target_rotation - pack.current_rotation) * pack.lerp;
      packModel.rotation.y = pack.current_rotation;

    } else {
      mouse.delta_X = 0;
    }
  }
  renderer.render(scene, camera);
}

// Call Animation
animate()
