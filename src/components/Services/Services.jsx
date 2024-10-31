import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaGlobe, FaMobileAlt, FaComments, FaTimes, FaArrowRight } from 'react-icons/fa';
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
      title: 'Software Development',
      description: 'Building enterprise-grade applications with cutting-edge technologies',
      category: 'technical',
      details: 'Expertise in full-stack development using React, Node.js, and cloud technologies. Specializing in scalable architectures, microservices, and high-performance applications.',
      technologies: ['React', 'Node.js', 'Python', 'AWS', 'Docker']
    },
    {
      icon: FaGlobe,
      title: 'Web Solutions',
      description: 'Creating stunning, responsive websites that drive results',
      category: 'creative',
      details: 'Delivering modern web experiences with focus on performance, accessibility, and SEO. Expert in progressive web apps and modern frontend frameworks.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Next.js', 'Tailwind']
    },
    {
      icon: FaMobileAlt,
      title: 'UI/UX Design',
      description: 'Crafting intuitive digital experiences that users love',
      category: 'creative',
      details: 'Creating user-centered designs through research, prototyping, and iterative testing. Expertise in design systems and accessibility standards.',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']
    },
    {
      icon: FaComments,
      title: 'Technical Consultation',
      description: 'Strategic guidance for digital transformation initiatives',
      category: 'business',
      details: 'Providing expert advice on technology adoption, architecture decisions, and digital strategy. Experience with startups and enterprise clients.',
      technologies: ['Architecture Design', 'Tech Strategy', 'Team Leadership', 'Agile', 'DevOps']
    }
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
      { threshold: 0.2 }
    );

    allServices.forEach((_, index) => {
      const element = document.getElementById(`service-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [allServices]);

  useEffect(() => {
    if (!threeContainerRef.current) return;

    const container = threeContainerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x33FF66, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x33FF66,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      controls.update();
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
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const filteredServices = allServices.filter(service =>
    filter === 'all' || service.category === filter
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <div ref={threeContainerRef} className="absolute inset-0" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-[#33FF66] mb-6">
            Professional Services
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Delivering exceptional digital solutions with cutting-edge technology and innovative design
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {['all', 'technical', 'creative', 'business'].map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === category 
                ? 'bg-[#33FF66] text-gray-900'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={index}
              id={`service-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={visible[`service-${index}`] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="h-full bg-gray-800 bg-opacity-80 border border-gray-700 hover:border-[#33FF66] transition-all duration-300 rounded-xl">
                <div className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="mb-4 p-3 rounded-full bg-[#33FF66] bg-opacity-20">
                      <service.icon className="w-8 h-8 text-[#33FF66]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-center mb-4">{service.description}</p>
                    <motion.button
                      onClick={() => setSelectedService(service)}
                      className="flex items-center gap-2 text-[#33FF66] hover:text-[#33FF66]/80 transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      Learn More <FaArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-800 rounded-xl max-w-lg w-full shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#33FF66] bg-opacity-20">
                        <selectedService.icon className="w-6 h-6 text-[#33FF66]" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-200">{selectedService.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
                    >
                      <FaTimes className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">{selectedService.details}</p>
                  
                  <div className="h-px bg-gray-700 mb-6" />
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Technologies & Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-gray-700 text-[#33FF66] hover:bg-gray-600 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Services;