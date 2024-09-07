import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import profileImage from '../../assets/profile.png';

const About = () => {
  return (
    <section className="min-h-screen flex flex-col relative">
      <div className="flex-grow grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        {/* Left side with text (dark background) */}
        <motion.div
          className="bg-gray-900 text-white flex flex-col justify-center items-start p-8 md:p-12 space-y-4 md:space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-light tracking-wide text-[#33FF66]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Hello Everyone.
          </motion.h2>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
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

          <motion.div
            className="text-lg md:text-xl font-medium text-gray-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
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

        {/* Right side with gradient background (increased size) */}
        <div className="bg-gradient-to-r from-[#33FF66] to-[#33FF66] relative">
          {/* Contact Icons */}
          <motion.div
            className="absolute top-8 right-8 flex flex-col space-y-6 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {[
              { href: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit", icon: FaLinkedin },
              { href: "https://github.com/", icon: FaGithub },
              { href: "mailto:prasannaellepola2000@gmail.com", icon: FaEnvelope },
              { href: "tel:+94757358093", icon: FaPhone }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                <item.icon className="text-2xl md:text-3xl cursor-pointer hover:text-gray-200 transition-colors duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Profile Image - Adjusted position */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform translate-x-[50cm] translate-y-1/2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <img
          src={profileImage}
          alt="Dilshan Prasanna Allepola"
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover shadow-2xl"
        />
      </motion.div>

    </section>
  );
};

export default About;