import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { AnimatePresence, motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

interface PhysicsSphere {
  mesh: THREE.Mesh;
  body: CANNON.Body;
}

const LOGO_URL = 'https://kelechieze.wordpress.com/wp-content/uploads/2026/08/yyu-1.png';
const TOTAL_SPHERES = 25;
const SPHERE_RADIUS = 0.18;

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
      window.setTimeout(onComplete, 800);
    }, 5000);

    return () => window.clearTimeout(hideTimer);
  }, [onComplete]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff');
    const isMobile = window.matchMedia('(max-width: 639px)').matches;
    const stageWidth = isMobile ? 5.8 : 8.2;
    const wallPosition = isMobile ? 4.1 : 5.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 1.5, isMobile ? 13.5 : 11);
    camera.lookAt(0, 0.1, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xe5e7eb, 1.25));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
    keyLight.position.set(5, 10, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -8;
    keyLight.shadow.camera.right = 8;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0002;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfff8f2, 0.75);
    fillLight.position.set(-7, 5, 5);
    scene.add(fillLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.14 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.35;
    ground.receiveShadow = true;
    scene.add(ground);

    const world = new CANNON.World();
    world.gravity.set(0, -18, 0);
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.solver.iterations = 12;

    const groundMaterial = new CANNON.Material('ground');
    const sphereMaterial = new CANNON.Material('logo-sphere');
    world.addContactMaterial(new CANNON.ContactMaterial(groundMaterial, sphereMaterial, {
      friction: 0.2,
      restitution: 0.78,
    }));
    world.defaultContactMaterial.restitution = 0.78;
    world.defaultContactMaterial.friction = 0.2;

    const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
    groundBody.addShape(new CANNON.Plane());
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    groundBody.position.set(0, -2.35, 0);
    world.addBody(groundBody);

    const addWall = (x: number, angle: number) => {
      const wall = new CANNON.Body({ mass: 0, material: groundMaterial });
      wall.addShape(new CANNON.Plane());
      wall.position.set(x, 0, 0);
      wall.quaternion.setFromEuler(0, angle, 0);
      world.addBody(wall);
    };
    addWall(-wallPosition, Math.PI / 2);
    addWall(wallPosition, -Math.PI / 2);

    const sphereGeometry = new THREE.SphereGeometry(SPHERE_RADIUS, 28, 22);
    const spheres: PhysicsSphere[] = [];
    const materials: THREE.MeshStandardMaterial[] = [];
    const fallbackMaterial = new THREE.MeshStandardMaterial({
      color: '#dbfa07',
      roughness: 0.25,
      metalness: 0.06,
    });

    for (let index = 0; index < TOTAL_SPHERES; index += 1) {
      const material = fallbackMaterial.clone();
      materials.push(material);

      const mesh = new THREE.Mesh(sphereGeometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      const body = new CANNON.Body({
        mass: 1.2,
        material: sphereMaterial,
        linearDamping: 0.018,
        angularDamping: 0.05,
      });
      body.addShape(new CANNON.Sphere(SPHERE_RADIUS));
      body.position.set((Math.random() - 0.5) * stageWidth, 3.3 + Math.random() * 4.8, (Math.random() - 0.5) * 2.3);
      body.velocity.set((Math.random() - 0.5) * 1.4, -1.5 - Math.random() * 2, (Math.random() - 0.5) * 1.2);
      body.angularVelocity.set(Math.random() * 4, Math.random() * 4, Math.random() * 4);
      world.addBody(body);
      spheres.push({ mesh, body });
    }

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');
    textureLoader.load(
      LOGO_URL,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        materials.forEach((material) => {
          material.map = texture;
          material.needsUpdate = true;
        });
      },
      undefined,
      () => {
        textureLoader.load('/favicon.ico', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          materials.forEach((material) => {
            material.map = texture;
            material.needsUpdate = true;
          });
        });
      }
    );

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    window.addEventListener('resize', resize);

    let animationFrame = 0;
    let lastTime = performance.now();
    const animate = (time: number) => {
      animationFrame = window.requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      world.step(1 / 60, delta, 4);

      spheres.forEach(({ mesh, body }) => {
        mesh.position.set(body.position.x, body.position.y, body.position.z);
        mesh.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
        if (body.position.y < -5 || Math.abs(body.position.x) > 8) {
          body.position.set((Math.random() - 0.5) * stageWidth, 5.5, 0);
          body.velocity.set(0, -2, 0);
        }
      });

      renderer.render(scene, camera);
    };
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrame);
      spheres.forEach(({ body, mesh }) => {
        world.removeBody(body);
        mesh.removeFromParent();
      });
      sphereGeometry.dispose();
      materials.forEach((material) => material.dispose());
      fallbackMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] overflow-hidden bg-white"
          aria-label="Loading BIZZJUMP"
          role="status"
        >
          <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <motion.img
              src={LOGO_URL}
              onError={(event) => {
                event.currentTarget.src = '/favicon.ico';
              }}
              alt="BIZZJUMP"
              animate={{
                y: [0, -38, 4, -8, 0],
                scale: [1, 0.96, 1.05, 0.98, 1],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: [0.33, 1, 0.68, 1],
                times: [0, 0.36, 0.7, 0.86, 1],
              }}
              className="h-28 w-28 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)] will-change-transform"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
