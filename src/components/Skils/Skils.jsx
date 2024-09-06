import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white p-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center">
      {/* Left Side with Skills */}
      <div className="space-y-6">
        <motion.h2
          className="text-4xl font-bold text-[#33FF66]"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Technical & Personal Skills
        </motion.h2>
        <motion.p
          className="text-gray-300 leading-relaxed"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Here are the skills I've developed over the years in both technical and personal areas.
        </motion.p>

        {/* Skills List */}
        <motion.ul
          className="list-disc list-inside space-y-2 text-gray-300"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Technical Skills */}
          <motion.li
            className="text-lg font-semibold"
            variants={item}
          >
            HTML, CSS, JavaScript, Angular, Node.js, MySQL, React.js
          </motion.li>

          {/* Personal Skills */}
          <motion.li
            className="text-lg font-semibold"
            variants={item}
          >
            Communication, Leadership, Logical Thinking
          </motion.li>
        </motion.ul>
      </div>

      {/* Right Side with Image */}
      <div className="relative flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#33FF66] z-0 rounded-lg" style={{ margin: '20px' }} />
          <motion.img
            src="/path/to/your/image.jpg" // Replace with the actual path to your image
            alt="Profile"
            className="relative z-10 w-80 h-80 object-cover rounded-lg shadow-xl"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

// Stagger Container for Skill Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

// Item variant for list animation
const item = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export default Skills;
