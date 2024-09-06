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
        initial={{ opacity: 0, x: -50 }} // Slide in from the left
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <motion.h2
          className="text-3xl font-light tracking-wide text-[#33FF66]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          Hello Everyone.hello
        </motion.h2>

        <motion.h1
          className="text-6xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
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

        <motion.p
          className="text-xl font-medium text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          WEB DEVELOPER
        </motion.p>

        <motion.button
          className="mt-6 bg-[#33FF66] text-black font-bold py-3 px-6 rounded-lg flex items-center hover:bg-green-600 transition-colors duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
        >
          Web Developer
          <span className="ml-2">&rarr;</span> {/* Use HTML entity for right arrow */}
        </motion.button>
      </motion.div>

      {/* Right side with image */}
      <motion.div
        className="bg-gradient-to-r from-[#33FF66] to-[#33FF66] relative flex justify-center items-center p-6"
        initial={{ opacity: 0, x: 50 }} // Slide in from the right
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <motion.img
          src={profileImage} // Using updated profileimage.png
          alt="Dilshan Prasanna Allepola"
          className="w-80 h-80 object-cover rounded-full shadow-2xl"
          whileHover={{ scale: 1.1 }} // Zoom effect on hover
          transition={{ duration: 0.4 }}
        />

        {/* Contact Icons */}
        <motion.div
          className="absolute top-8 right-8 flex space-x-6 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.a
            href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FaLinkedin className="text-2xl cursor-pointer hover:text-gray-200 transition-colors duration-300" />
          </motion.a>

          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FaGithub className="text-2xl cursor-pointer hover:text-gray-200 transition-colors duration-300" />
          </motion.a>

          <motion.a
            href="mailto:prasannaellepola2000@gmail.com"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FaEnvelope className="text-2xl cursor-pointer hover:text-gray-200 transition-colors duration-300" />
          </motion.a>

          <motion.a
            href="tel:+94757358093"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FaPhone className="text-2xl cursor-pointer hover:text-gray-200 transition-colors duration-300" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
