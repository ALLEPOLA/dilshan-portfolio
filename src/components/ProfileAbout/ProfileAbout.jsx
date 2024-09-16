import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FaTimes } from 'react-icons/fa';
import profileImage from '../../assets/image2.jpg';
import cvFile from '../../assets/CV.pdf';

const ProfileAbout = () => {
  // eslint-disable-next-line no-unused-vars
  const [, setVisible] = useState(false); // State for animation trigger
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const controls = useAnimation(); // Framer motion animation controls
  const threeContainerRef = useRef(null); // Ref for Three.js container

  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true); // Triggers animation visibility
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
        observer.disconnect();
      }
    };
  }, [controls]);

  // Three.js scene setup
  useEffect(() => {
    if (!threeContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainerRef.current.appendChild(renderer.domElement);

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
      requestAnimationFrame(animate);
      orbitControls.update();
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (threeContainerRef.current) {
        threeContainerRef.current.removeChild(renderer.domElement);
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
              className="w-full md:w-1/2 text-gray-300"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold mb-4">Dilshan Prasanna</h3>
              <p className="mb-4">
                I'm a web developer skilled in Angular, React.js, Node.js, and Django. I create responsive, user-friendly websites and applications, including B2B invoice systems and ad management platforms. My focus is on clean design and efficient functionality.
              </p>
              <motion.div className="flex space-x-4 mb-6">
                <motion.button
                  className="bg-[#33FF66] hover:bg-[#2EDD5C] text-gray-900 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                >
                  Contact Me
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
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-lg max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-[#33FF66]">Contact Me</h3>
                <button onClick={() => setShowModal(false)}>
                  <FaTimes className="text-gray-400 hover:text-white" />
                </button>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#33FF66] hover:bg-[#2EDD5C] text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProfileAbout;
