import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaGlobe, FaMobileAlt, FaComments, FaTimes } from 'react-icons/fa';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Services = () => {
  const [filter, setFilter] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [visible, setVisible] = useState({});
  const threeContainerRef = useRef(null);

  const allServices = useMemo(() => [
    {
      icon: FaCode,
      title: 'Programming',
      description: 'Developing robust and scalable applications using modern technologies.',
      category: 'technical',
      details: 'Expertise in various programming languages including JavaScript, C, and Java. Proficient in developing web applications, mobile apps, and backend systems.'
    },
    {
      icon: FaGlobe,
      title: 'Web Design',
      description: 'Creating visually appealing and user-friendly website designs.',
      category: 'creative',
      details: 'Skilled in creating responsive and accessible web designs. Proficient with HTML, CSS, and modern design tools. Focus on creating intuitive and engaging user interfaces.'
    },
    {
      icon: FaMobileAlt,
      title: 'UI/UX',
      description: 'Designing intuitive user interfaces and enhancing user experiences.',
      category: 'creative',
      details: 'Expert in user-centered design principles. Experienced in creating wireframes, prototypes, and conducting user research to optimize digital experiences.'
    },
    {
      icon: FaComments,
      title: 'Consultation',
      description: 'Providing expert advice and strategies for your digital projects.',
      category: 'business',
      details: 'Offering strategic guidance on technology choices, project management, and digital transformation. Experienced in working with startups and established businesses alike.'
    }
  ], []);

  // Intersection Observer for service visibility animations
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

    allServices.forEach((_, index) => {
      const element = document.getElementById(`service-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [allServices]);

  // 3D Particle Effect using Three.js
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
      if (currentThreeContainer) {
        currentThreeContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  const filteredServices = allServices.filter(service =>
    filter === 'all' || service.category === filter
  );

  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      variants={backgroundVariants}
      animate="animate"
    >
      <div ref={threeContainerRef} className="absolute inset-0" />
      <div className="relative z-10 p-8">
        <motion.h2
          className="text-4xl font-bold text-[#33FF66] mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          My Services
        </motion.h2>
        <motion.p
          className="text-gray-300 leading-relaxed text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Explore my range of services that cater to your digital needs.
        </motion.p>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center space-x-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {['all', 'technical', 'creative', 'business'].map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full ${filter === category ? 'bg-[#33FF66] text-gray-900' : 'bg-gray-700 text-white'}`}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={index}
              id={`service-${index}`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={visible[`service-${index}`] ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedService(service)}
              whileHover={{ scale: 1.05, boxShadow: '0px 18px 30px rgba(0, 0, 0, 0.2)' }}
            >
              <div className="flex flex-col items-center mb-4">
                <service.icon className="w-16 h-16 mb-3 text-[#33FF66]" />
                <h3 className="text-xl font-semibold text-center">{service.title}</h3>
              </div>
              <p className="text-sm text-gray-400 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Service Details Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-800 p-6 rounded-lg max-w-md w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-[#33FF66]">{selectedService.title}</h3>
                  <button onClick={() => setSelectedService(null)}>
                    <FaTimes className="text-gray-400 hover:text-white" />
                  </button>
                </div>
                <selectedService.icon className="w-16 h-16 mb-4 text-[#33FF66]" />
                <p className="text-gray-300 mt-4">{selectedService.details}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Services;