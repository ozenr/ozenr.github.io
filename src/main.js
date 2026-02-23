import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// Track Mouse Position
const mouse = {
  x: 0,
  y: 0
};
window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
});

// Mobile Touch Tracking
window.addEventListener('touchmove', (event) => {
  const touch = event.touches[0]; 

  mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
}, { passive: false }); 

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
  torus.rotation.y = -mouse.x
  torus.rotation.x = mouse.y
  // torus.rotation.z = (mouse.x + mouse.y) * 0.5
  renderer.render(scene, camera);
}

// Call Animation
animate()