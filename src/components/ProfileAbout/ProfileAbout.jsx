import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import profileImage from '../../assets/image2.jpg';
import cvFile from '../../assets/CV.pdf';

const ProfileAbout = () => {
  const controls = useAnimation();
  const threeContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    const profileAboutElement = document.getElementById('profile-about');
    if (profileAboutElement) {
      observer.observe(profileAboutElement);
    }

    return () => {
      if (profileAboutElement) {
        observer.unobserve(profileAboutElement);
      }
    };
  }, [controls]);

  useEffect(() => {
    if (!threeContainerRef.current) return;

    const currentThreeContainer = threeContainerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentThreeContainer.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    orbitControls.enableZoom = false;

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
      orbitControls.update();
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    let animationFrameId;

    const renderScene = () => {
      animationFrameId = requestAnimationFrame(renderScene);
      animate();
    };

    renderScene();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (currentThreeContainer) {
        currentThreeContainer.removeChild(renderer.domElement);
      }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      id="profile-about"
      className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      variants={backgroundVariants}
      animate="animate"
    >
      <div ref={threeContainerRef} className="absolute inset-0" />
      <div className="relative z-10 p-8 flex items-center justify-center min-h-screen">
        <motion.div
          className="max-w-6xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2
            className="text-4xl font-bold text-[#33FF66] mb-6 text-center"
            variants={itemVariants}
          >
            About Me
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              variants={itemVariants}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#33FF66] rounded-lg transform -translate-x-4 -translate-y-4"></div>
                <img
                  src={profileImage}
                  alt="Profile"
                  className="relative w-[300px] h-[300px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 text-white"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold mb-4">Dilshan Prasanna</h3>
              <p className="mb-4">
              I am an IT professional with a passion for developing innovative and efficient solutions, specializing in web development, software engineering, and system integration.
              </p>
              <motion.div className="flex space-x-4 mb-6">
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
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProfileAbout;