import './style.css'

import * as THREE from 'three';

// Store Mouse Position
const mouse = {
  isDragging: false,
  delta_X: 0,
  prev: {x: 0}
};

const pack = {
  sensitivity: 0.0032,
  target_rotation: 0,
  current_rotation: 0,
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

// Button Listeners
openBtn.addEventListener('click', () => {
  openBtn.style.display = 'none';
  openPressed = true;

  closeBtn.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  closeBtn.style.display = 'none';
  openPressed = false;

  openBtn.style.display = 'block';
  window.addEventListener('pointermove', handleMovement, {passive: false});
  camera.position.setZ(30); // reset camera position
})

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    90, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
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

// Render Object
const geometry = new THREE.BoxGeometry(3, 10, 2, 100);
const material =
    new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

function animate() {
  requestAnimationFrame(animate);

  // Change Pack State if Open Button is Pressed
  if (openPressed) {
    console.log('Current Rotation: ', torus.rotation.y);

    // Zoom in On Pack
    camera.position.setZ(15);
    window.removeEventListener('pointermove', handleMovement);

    // Rotate Pack Back To Default Position
    torus.rotation.y *= 0.9;
    if (Math.abs(torus.rotation.y) < 0.001) {
      torus.rotation.y = 0;
      pack.current_rotation = 0;
      pack.target_rotation = 0;
    }
  } else {
    // If We Haven't Slowed Down Enough
    if (Math.abs(mouse.delta_X) > 0.0001) {
      // Movement Physics
      mouse.delta_X *= 0.985;
      pack.target_rotation += mouse.delta_X * pack.sensitivity;
      pack.current_rotation +=
          (pack.target_rotation - pack.current_rotation) * pack.lerp;
      torus.rotation.y = pack.current_rotation;

    } else {
      mouse.delta_X = 0;
    }
  }
  renderer.render(scene, camera);
}

// Call Animation
animate()