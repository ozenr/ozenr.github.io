import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// Store Mouse Position
const mouse = {
  isDragging: false,
  delta_X: 0,
  prev: {x: 0}
};

const pack = {
  sensitivity: 0.0005,
  target_rotation: 0,
  current_rotation: 0,
  lerp: 0.1
};

// Mouse Tracking
function handleStart(x) {
  mouse.isDragging = true;
  mouse.prev.x = x;
}

function rotatePack(x) {
  if (mouse.isDragging) {
    mouse.delta_X = x - mouse.prev.x;
    pack.target_rotation += delta_X * pack.sensitivity;
    mouse.prev.x = x;
  } else {
    return;
  }
}

window.addEventListener('pointerdown', (e) => {
  if (e.button === 0) handleStart(e.clientX);
});

window.addEventListener('pointermove', (e) => {
  rotatePack(e.clientX);
});

window.addEventListener('pointerup', () => {
  mouse.isDragging = false;
});

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    90, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

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

  // If We Haven't Slowed Down Enough
  if (Math.abs(mouse.delta_X) > 0.0001) {
    mouse.delta_X *= 0.95;
    pack.target_rotation += mouse.delta_X * pack.sensitivity;
    pack.current_rotation += (pack.target_rotation - pack.current_rotation) * pack.lerp;
    torus.rotation.y = pack.current_rotation;
  } else {
    mouse.delta_X = 0;
  }
  renderer.render(scene, camera);
}

// Call Animation
animate()