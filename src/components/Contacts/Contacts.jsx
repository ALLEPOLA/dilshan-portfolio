import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLinkedin, FaGithub } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sceneRef = useRef();

  useEffect(() => {
    const currentSceneRef = sceneRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentSceneRef.appendChild(renderer.domElement);

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
      if (currentSceneRef) {
        currentSceneRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailParams = {
      to_email: 'your-email@example.com', // Replace with your email
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message
    };

    emailjs
      .send(
        'service_v00vnam',
        'template_boziy3a',
        emailParams,
        'QOQuRU-v_0cF_qi-PqNJ2'
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setSubmitStatus('success');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        },
        (error) => {
          console.log('Error sending email:', error.text);
          setSubmitStatus('error');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 3000);
      });
  };

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

  const contactInfo = [
    { icon: FaPhone, text: '+94757358093', href: 'tel:+94757358093' },
    { icon: FaEnvelope, text: 'prasannaellepola2000@gmail.com', href: 'mailto:prasannaellepola2000@gmail.com' },
    { icon: FaMapMarkerAlt, text: '184 Vijitha Mawatha, Muruthalawa, Kandy', href: null }
  ];

  const socialLinks = [
    { href: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit", icon: FaLinkedin },
    { href: "https://github.com/", icon: FaGithub },
    { href: "mailto:prasannaellepola2000@gmail.com", icon: FaEnvelope },
    { href: "tel:+94757358093", icon: FaPhone }
  ];

  return (
    <motion.section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative"
      variants={backgroundVariants}
      animate="animate"
    >
      <div ref={sceneRef} className="absolute inset-0" />
      <div className="container mx-auto px-6 py-16 z-10">
        <motion.h2
          className="text-4xl font-bold text-[#33FF66] mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="text-gray-300 leading-relaxed text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Feel free to reach out for collaborations or just a friendly hello
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
          <motion.div
            className="md:w-1/2 w-full mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="flex flex-col space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  variants={itemVariants}
                >
                  <item.icon className="text-[#33FF66] mr-4 text-2xl" />
                  {item.href ? (
                    <a href={item.href} className="text-white hover:text-[#33FF66] transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-white">{item.text}</span>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex space-x-4 mt-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {socialLinks.map((item, index) => (
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

          <motion.div
            className="md:w-1/2 w-full md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <form onSubmit={sendEmail} className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg">
              {['name', 'email'].map((field) => (
                <motion.div key={field} className="mb-4" variants={itemVariants}>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33FF66]"
                    required
                  />
                </motion.div>
              ))}
              <motion.div className="mb-4" variants={itemVariants}>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33FF66]"
                  rows="4"
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full py-2 bg-[#33FF66] text-gray-900 font-bold rounded-lg hover:bg-[#2be559] transition duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <AnimatePresence>
          {submitStatus && (
            <motion.div
              className={`fixed bottom-4 right-4 p-4 rounded-lg ${
                submitStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white`}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
            >
              {submitStatus === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Contacts;