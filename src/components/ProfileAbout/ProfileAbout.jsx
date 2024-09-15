import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import profileImage from '../../assets/image2.jpg';
import cvFile from '../../assets/CV.pdf';

const ProfileAbout = () => {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(document.getElementById('profile-about'));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

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

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);

    // Position camera
    camera.position.z = 5;

    // Add OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    orbitControls.enableZoom = false;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      orbitControls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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

  return (
    <motion.section 
      id="profile-about"
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8"
      variants={backgroundVariants}
      animate="animate"
    >
      {/* Container */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full space-y-8 md:space-y-0 md:space-x-12">
        {/* Left Side (Image and 3D particles) */}
        <motion.div
          className="relative flex justify-center items-center w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
          <div className="relative z-10">
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#33FF66] rounded-lg transform -translate-x-8 -translate-y-8"></div>
            <img
              src={profileImage}
              alt="Profile"
              className="relative w-[300px] h-[300px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </motion.div>

        {/* Right Side (Text and Buttons) */}
        <motion.div
          className="text-left w-full md:w-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.h1 
            className="text-[#33FF66] text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            About Me
          </motion.h1>
          <motion.p
            className="text-gray-300 text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I'm Dilshan Prasanna, a web developer skilled in Angular, React.js, Node.js, and Django. I create responsive, user-friendly websites and applications, including B2B invoice systems and ad management platforms. My focus is on clean design and efficient functionality.
          </motion.p>
          
          {/* Buttons */}
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              className="bg-[#33FF66] hover:bg-[#2EDD5C] text-gray-900 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>
            <motion.a
              href={cvFile}
              download="Dilshan_Prasanna_CV.pdf"
              className="border-2 border-[#33FF66] hover:bg-[#2EDD5C] hover:text-gray-900 text-[#33FF66] font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProfileAbout;
