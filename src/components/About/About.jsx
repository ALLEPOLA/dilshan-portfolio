import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import profileImage from '../../assets/profileimage.png'; // Updated image path

const About = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-[2fr_1fr]">
      {/* Left side with text */}
      <motion.div
        className="bg-gray-900 text-white flex flex-col justify-center items-start p-12 space-y-6"
        initial={{ opacity: 0, x: -100 }} // Slide-in from the left
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <motion.h2
          className="text-3xl font-light tracking-wide text-[#33FF66]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          Hello Everyone.
        </motion.h2>

        <motion.h1
          className="text-6xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, scale: 0.85 }} // Starts smaller and grows in
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
        >
          I'M{' '}
          <span className="text-[#33FF66]">
            <Typewriter
              options={{
                strings: ['DILSHAN PRASANNA'],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                pauseFor: 1500,
                delay: 75,
              }}
            />
          </span>
        </motion.h1>

        {/* Animated roles line */}
        <motion.div
          className="text-xl font-medium text-gray-300 space-y-4"
          initial={{ opacity: 0, scale: 0.8 }} // Scale effect
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
        >
          <Typewriter
            options={{
              strings: ['WEB DEVELOPER', 'UI/UX DESIGNER', 'FULL STACK ENGINEER'],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              pauseFor: 1500,
              delay: 75,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Right side with image */}
      <div className="bg-gradient-to-r from-[#33FF66] to-[#33FF66] relative flex justify-center items-center p-6">
        <img
          src={profileImage} // Using updated profileimage.png
          alt="Dilshan Prasanna Allepola"
          className="w-80 h-80 object-cover rounded-full shadow-2xl"
        />

        {/* Contact Icons */}
        <motion.div
          className="absolute top-8 right-8 flex space-x-6 text-white"
          initial={{ opacity: 0, y: -20 }} // Drop-in effect for icons
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.a
            href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }} // Rotation on hover
            transition={{ duration: 0.4 }}
          >
            <FaLinkedin className="text-2xl cursor-pointer hover:text-gray-200 transition-colors duration-300" />
          </motion.a>

          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }} // Rotation on hover
            transition={{ duration: 0.4 }}
          >
            <FaGithub className="text-2xl cursor-pointer hover:text-gray-200 transition-colors duration-300" />
          </motion.a>

          <motion.a
            href="mailto:prasannaellepola2000@gmail.com"
            whileHover={{ scale: 1.2, rotate: 360 }} // Rotation on hover
            transition={{ duration: 0.4 }}
          >
            <FaEnvelope className="text-2xl cursor-pointer hover:text-gray-200 transition-colors duration-300" />
          </motion.a>

          <motion.a
            href="tel:+94757358093"
            whileHover={{ scale: 1.2, rotate: 360 }} // Rotation on hover
            transition={{ duration: 0.4 }}
          >
            <FaPhone className="text-2xl cursor-pointer hover:text-gray-200 transition-colors duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
