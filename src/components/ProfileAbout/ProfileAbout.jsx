import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../../assets/image2.jpg'; // Update the image path as needed
import cvFile from '../../assets/CV.pdf'; // Add the path to your CV file

const ProfileAbout = () => (
  <section className="min-h-screen bg-gray-800 flex items-center justify-center p-8">
    {/* Container */}
    <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full space-y-8 md:space-y-0">
      {/* Left Side (Image) */}
      <motion.div
        className="relative flex justify-center items-center w-full md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
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
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <h1 className="text-white text-5xl font-bold mb-4">About Me</h1>
        <motion.p
          className="text-gray-400 text-lg leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
        >
          I'm Dilshan Prasanna Allepola, a web developer skilled in Angular, React.js, Node.js, and Django. I create responsive, user-friendly websites and applications, including B2B invoice systems and ad management platforms. My focus is on clean design and efficient functionality.
        </motion.p>
        {/* Buttons */}
        <div className="flex space-x-4">
          <motion.button
            className="bg-[#33FF66] hover:bg-[#2EDD5C] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.button>
          <motion.a
            href={cvFile}
            download="Dilshan_Prasanna_CV.pdf"
            className="border-2 border-[#33FF66] hover:bg-[#2EDD5C] hover:text-white text-[#33FF66] font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ProfileAbout;
