import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function CircleXZAnimation() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const VISUAL_SCALE = 1.8;

    const scene = new THREE.Scene();
    scene.background = null;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 220, 300);
    camera.lookAt(0, 50, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 0.4);
    dir.position.set(50, 120, 80);
    scene.add(dir);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const R = 50;
    const Y_MIN = 0;
    const Y_MAX = 100;
    const segments = 256;
    const NUM_CIRCLES = 20;

    const circles = [];

    const circleMaterial = new THREE.LineBasicMaterial({
      color: 0x7be495,
      transparent: true,
      opacity: 0.6
    });

    function createCircle() {
      const positions = new Float32Array((segments + 1) * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setDrawRange(0, segments + 1);
      const line = new THREE.Line(geometry, circleMaterial);
      sphereGroup.add(line);
      return { line, geometry, positions };
    }

    function updateCircleGeometry(circle, radius) {
      const positions = circle.positions;
      for (let i = 0; i <= segments; i++) {
        const t = (i / segments) * Math.PI * 2;
        positions[i * 3] = radius * Math.cos(t);
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = radius * Math.sin(t);
      }
      circle.geometry.attributes.position.needsUpdate = true;
    }

    function sphereRadiusAtY(yPos) {
      const val = R * R - (yPos - R) * (yPos - R);
      return val > 0 ? Math.sqrt(val) : 0;
    }

    const range = Y_MAX - Y_MIN;
    for (let i = 0; i < NUM_CIRCLES; i++) {
      const c = createCircle();
      c.initialOffset = (i / NUM_CIRCLES) * range;
      circles.push(c);
    }

    sphereGroup.scale.set(VISUAL_SCALE, VISUAL_SCALE, VISUAL_SCALE);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 50, 0);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.rotateSpeed = 1.0;
    controls.dampingFactor = 0.1;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: null
    };
    controls.update();

    const startTime = performance.now();
    const speed = 6;

    let rafId = null;

    function animate() {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      for (let i = 0; i < NUM_CIRCLES; i++) {
        const c = circles[i];
        const posInRange = (c.initialOffset + elapsed * speed) % range;
        const yPos = Y_MIN + posInRange;
        updateCircleGeometry(c, sphereRadiusAtY(yPos));
        c.line.position.y = yPos;
      }

      controls.update();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    function handleResize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener("resize", handleResize);

    const preventContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    renderer.domElement.addEventListener('contextmenu', preventContextMenu);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("contextmenu", preventContextMenu);
      if (rafId) cancelAnimationFrame(rafId);

      sphereGroup.traverse((child) => {
        if (child.isLine && child.geometry) child.geometry.dispose();
      });
      scene.remove(sphereGroup);
      circleMaterial.dispose();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="canvas-container" />;
}
