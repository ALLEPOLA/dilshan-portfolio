import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaAngular, FaNodeJs, FaDatabase, FaReact, FaComments, FaUsers, FaBrain } from 'react-icons/fa';
import SkillsImg from '../../assets/skils.jpg';

const Skills = () => {
  const technicalSkills = [
    { name: 'HTML', icon: FaHtml5 },
    { name: 'CSS', icon: FaCss3Alt },
    { name: 'JavaScript', icon: FaJs },
    { name: 'Angular', icon: FaAngular },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'MySQL', icon: FaDatabase },
    { name: 'React.js', icon: FaReact },
  ];

  const personalSkills = [
    { name: 'Communication', icon: FaComments },
    { name: 'Leadership', icon: FaUsers },
    { name: 'Logical Thinking', icon: FaBrain },
  ];

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
        {/* Skills Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#33FF66]">Technical Skills</h3>
            <ul className="space-y-3">
              {technicalSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2 text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered delay
                >
                  <skill.icon className="w-6 h-6 text-[#33FF66]" />
                  <span>{skill.name}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          {/* Personal Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#33FF66]">Personal Skills</h3>
            <ul className="space-y-3">
              {personalSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2 text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered delay
                >
                  <skill.icon className="w-6 h-6 text-[#33FF66]" />
                  <span>{skill.name}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Right Side with Image */}
      <div className="relative flex justify-center mt-10 md:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#33FF66] z-0 rounded-lg" style={{ margin: '20px' }} />
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
