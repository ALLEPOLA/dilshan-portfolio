import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaAngular, FaNodeJs, FaDatabase, FaReact, FaComments, FaUsers, FaBrain, FaTimes } from 'react-icons/fa';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Skills = () => {
  const [filter, setFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [visible, setVisible] = useState({});

  const allSkills = useMemo(() => [
    { name: 'HTML', icon: FaHtml5, color: '#E34F26', category: 'technical', description: 'Proficient in creating semantic and accessible HTML structures.' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6', category: 'technical', description: 'Expert in responsive design, CSS animations, and modern layout techniques.' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', category: 'technical', description: 'Strong command of ES6+, asynchronous programming, and DOM manipulation.' },
    { name: 'Angular', icon: FaAngular, color: '#DD0031', category: 'technical', description: 'Experience with component-based architecture and TypeScript.' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933', category: 'technical', description: 'Familiar with server-side JavaScript and RESTful API development.' },
    { name: 'MySQL', icon: FaDatabase, color: '#4479A1', category: 'technical', description: 'Proficient in database design, complex queries, and optimization.' },
    { name: 'React.js', icon: FaReact, color: '#61DAFB', category: 'technical', description: 'Experience with hooks, context API, and state management libraries.' },
    { name: 'Communication', icon: FaComments, color: '#FF6B6B', category: 'personal', description: 'Excellent verbal and written communication skills, adept at explaining complex concepts.' },
    { name: 'Leadership', icon: FaUsers, color: '#4ECDC4', category: 'personal', description: 'Proven ability to lead teams and manage projects effectively.' },
    { name: 'Logical Thinking', icon: FaBrain, color: '#45B7D1', category: 'personal', description: 'Strong problem-solving skills and analytical approach to challenges.' },
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    allSkills.forEach((skill, index) => {
      const element = document.getElementById(`skill-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [allSkills]);

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-background').appendChild(renderer.domElement);

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
      document.getElementById('three-background').removeChild(renderer.domElement);
    };
  }, []);

  const filteredSkills = allSkills.filter(skill => 
    filter === 'all' || skill.category === filter
  );

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
      className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      variants={backgroundVariants}
      animate="animate"
    >
      <div id="three-background" className="absolute inset-0" />
      <div className="relative z-10 p-8">
        <motion.h2
          className="text-5xl font-bold text-[#33FF66] mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Skills & Expertise
        </motion.h2>
        <motion.p
          className="text-gray-300 leading-relaxed text-center mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Explore my diverse skill set that combines technical expertise with strong personal attributes, honed through years of experience and continuous learning.
        </motion.p>

        {/* Filter Buttons */}
        <motion.div 
          className="flex justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {['all', 'technical', 'personal'].map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${filter === category ? 'bg-[#33FF66] text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              id={`skill-${index}`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate={visible[`skill-${index}`] ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-center aspect-square"
              onClick={() => setSelectedSkill(skill)}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
            >
              <skill.icon className="w-16 h-16 mb-4" style={{ color: skill.color }} />
              <h3 className="text-lg font-semibold text-center" style={{ color: skill.color }}>{skill.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Skill Details Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-800 p-8 rounded-xl max-w-md w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-3xl font-bold" style={{ color: selectedSkill.color }}>{selectedSkill.name}</h3>
                  <button onClick={() => setSelectedSkill(null)} className="text-gray-400 hover:text-white transition-colors duration-300">
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <selectedSkill.icon className="w-24 h-24" style={{ color: selectedSkill.color }} />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{selectedSkill.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Skills;