import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const About = () => {
  const modelRef = useRef();
  const [loading, setLoading] = useState(true);
  const [hoveredRole, setHoveredRole] = useState(null);

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400);
    modelRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Add orbit controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    orbitControls.enableZoom = false;

    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      '/path/to/your/3d-model.glb', // Replace with your 3D model path
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
        scene.add(model);
        setLoading(false);

        // Animate model
        const mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
        if (clips && clips.length > 0) {
          const action = mixer.clipAction(clips[0]);
          action.play();
        }

        const animate = () => {
          requestAnimationFrame(animate);
          mixer.update(0.016); // Update animation
          orbitControls.update();
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => console.error('Error loading 3D model:', error)
    );

    // Add particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x33FF66,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      orbitControls.update();
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      modelRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const roles = [
    "UI/UX DEVELOPER",
    "WEB DEVELOPER",
    "FULL STACK ENGINEER"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section 
      className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      variants={backgroundVariants}
      animate="animate"
    >
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Left side with text */}
        <motion.div
          className="flex flex-col justify-center items-start space-y-6 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-light tracking-wide text-[#33FF66]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Hello Everyone.
          </motion.h2>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
          >
            I'M{' '}
            <motion.span 
              className="text-[#33FF66] relative inline-block"
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                textShadow: [
                  "0 0 5px rgba(51,255,102,0)",
                  "0 0 20px rgba(51,255,102,0.8)",
                  "0 0 5px rgba(51,255,102,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              DILSHAN PRASANNA
            </motion.span>
          </motion.h1>

          <motion.ul
            className="text-xl md:text-2xl font-medium text-gray-300 list-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {roles.map((role, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="mb-2"
                onMouseEnter={() => setHoveredRole(role)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <motion.span
                  className="inline-block cursor-pointer"
                  whileHover={{ scale: 1.1, color: "#33FF66" }}
                >
                  {role}
                </motion.span>
              </motion.li>
            ))}
          </motion.ul>

          {hoveredRole && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-white bg-gray-800 bg-opacity-50 p-4 rounded-lg"
            >
              <p>{getRoleDescription(hoveredRole)}</p>
            </motion.div>
          )}

          {/* Contact Icons */}
          <motion.div
            className="flex space-x-4 mt-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { href: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit", icon: FaLinkedin },
              { href: "https://github.com/", icon: FaGithub },
              { href: "mailto:prasannaellepola2000@gmail.com", icon: FaEnvelope },
              { href: "tel:+94757358093", icon: FaPhone }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.2, rotate: 360, backgroundColor: "#33FF66" }}
                transition={{ duration: 0.4 }}
              >
                <item.icon className="text-2xl text-gray-800" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side with 3D model */}
        <motion.div 
          className="relative flex flex-col justify-center items-center overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <motion.div
            ref={modelRef}
            className="w-full h-[400px] mb-8 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#33FF66]"></div>
              </div>
            )}
          </motion.div>

          {/* Motivational Tagline */}
          <motion.div
            className="text-white text-center mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg"
              animate={{ 
                color: ["#FFFFFF", "#33FF66", "#FFFFFF"],
                textShadow: [
                  "0 0 5px rgba(51,255,102,0)",
                  "0 0 20px rgba(51,255,102,0.8)",
                  "0 0 5px rgba(51,255,102,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Innovate. Create. Inspire.
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl font-light drop-shadow"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Turning ideas into digital realities, one line of code at a time.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

function getRoleDescription(role) {
  switch (role) {
    case 'UI/UX DEVELOPER':
      return "Creating intuitive and visually appealing user interfaces";
    case 'WEB DEVELOPER':
      return "Building responsive and dynamic web applications";
    case 'FULL STACK ENGINEER':
      return "Developing end-to-end solutions from front-end to back-end";
    default:
      return "";
  }
}

export default About;