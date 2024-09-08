import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../../assets/image2.jpg'; // Update the image path as needed
import cvFile from '../../assets/CV.pdf'; // Add the path to your CV file

const ProfileAbout = () => {
  const [visible, setVisible] = useState(false);

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
      className="min-h-screen bg-gray-900 flex items-center justify-center p-8"
      variants={backgroundVariants}
      animate="animate"
      style={{
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgb(21, 21, 21) 0%, rgb(64, 64, 64) 90.2%)',
        backgroundSize: '400% 400%'
      }}
    >
      {/* Container */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full space-y-8 md:space-y-0 md:space-x-12">
        {/* Left Side (Image) */}
        <motion.div
          className="relative flex justify-center items-center w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#33FF66] rounded-lg transform -translate-x-8 -translate-y-8"></div>
          <img
            src={profileImage}
            alt="Profile"
            className="relative w-[300px] h-[300px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
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
            transition={{ duration: 0.6, delay: 0.6 }}
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