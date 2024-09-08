import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaAngular, FaNodeJs, FaDatabase, FaReact, FaComments, FaUsers, FaBrain } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import SkillsImg from '../../assets/skils.jpg';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const technicalSkills = [
    { name: 'HTML', icon: FaHtml5, color: '#E34F26', level: 5 },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6', level: 5 },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', level: 5 },
    { name: 'Angular', icon: FaAngular, color: '#DD0031', level: 3 },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933', level: 3 },
    { name: 'MySQL', icon: FaDatabase, color: '#4479A1', level: 5 },
    { name: 'React.js', icon: FaReact, color: '#61DAFB', level: 3 },
  ];

  const personalSkills = [
    { name: 'Communication', icon: FaComments, color: '#FF6B6B', level: 4 },
    { name: 'Leadership', icon: FaUsers, color: '#4ECDC4', level: 4 },
    { name: 'Logical Thinking', icon: FaBrain, color: '#45B7D1', level: 5 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const SkillLevel = ({ level, color }) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`w-4 h-4 ${index < level ? 'text-yellow-400' : 'text-gray-400'}`}
          style={{ color: index < level ? color : '#4B5563' }}
        />
      ))}
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-900 text-white p-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center overflow-hidden">
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
          Here are the skills I've developed over the years, with their proficiency levels.
        </motion.p>
        {/* Skills Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technical Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#33FF66]">Technical Skills</h3>
            <ul className="space-y-3">
              {technicalSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="relative flex items-center space-x-2 text-gray-300 p-2 rounded-lg transition-colors duration-300"
                  style={{
                    backgroundColor: hoveredSkill === skill.name ? skill.color + '33' : 'transparent',
                  }}
                >
                  <skill.icon className="w-6 h-6" style={{ color: skill.color }} />
                  <span className="w-24">{skill.name}</span>
                  <SkillLevel level={skill.level} color={skill.color} />
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="absolute right-2 text-sm font-semibold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {skill.level >= 4 ? 'Expert' : skill.level >= 3 ? 'Proficient' : 'Familiar'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          {/* Personal Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#33FF66]">Personal Skills</h3>
            <ul className="space-y-3">
              {personalSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="relative flex items-center text-gray-300 p-2 rounded-lg transition-colors duration-300"
                  style={{
                    backgroundColor: hoveredSkill === skill.name ? skill.color + '33' : 'transparent',
                  }}
                >
                  <skill.icon className="w-6 h-6 mr-2" style={{ color: skill.color }} />
                  <span className="w-36">{skill.name}</span>
                  <SkillLevel level={skill.level} color={skill.color} />
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="absolute right-2 text-sm font-semibold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        Strong
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      {/* Right Side with Image */}
      <div className="relative flex justify-center mt-10 md:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-[#33FF66] z-0 rounded-lg"
            style={{ margin: '20px' }}
            animate={{
              boxShadow: [
                '0px 0px 0px 0px rgba(51, 255, 102, 0.3)',
                '0px 0px 20px 10px rgba(51, 255, 102, 0.3)',
                '0px 0px 0px 0px rgba(51, 255, 102, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.img
            src={SkillsImg}
            alt="Skills representation"
            className="relative z-10 w-80 h-80 object-cover rounded-lg shadow-xl"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;