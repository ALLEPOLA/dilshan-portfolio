import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaAngular, FaNodeJs, FaDatabase, FaReact, FaComments, FaUsers, FaBrain, FaTimes } from 'react-icons/fa';
import SkillsImg from '../../assets/skils.jpg';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [visible, setVisible] = useState({});

  const allSkills = [
    { name: 'HTML', icon: FaHtml5, color: '#E34F26', level: 5, category: 'technical', description: 'Proficient in creating semantic and accessible HTML structures.' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6', level: 5, category: 'technical', description: 'Expert in responsive design, CSS animations, and modern layout techniques.' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', level: 5, category: 'technical', description: 'Strong command of ES6+, asynchronous programming, and DOM manipulation.' },
    { name: 'Angular', icon: FaAngular, color: '#DD0031', level: 3, category: 'technical', description: 'Experience with component-based architecture and TypeScript.' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933', level: 3, category: 'technical', description: 'Familiar with server-side JavaScript and RESTful API development.' },
    { name: 'MySQL', icon: FaDatabase, color: '#4479A1', level: 5, category: 'technical', description: 'Proficient in database design, complex queries, and optimization.' },
    { name: 'React.js', icon: FaReact, color: '#61DAFB', level: 3, category: 'technical', description: 'Experience with hooks, context API, and state management libraries.' },
    { name: 'Communication', icon: FaComments, color: '#FF6B6B', level: 4, category: 'personal', description: 'Excellent verbal and written communication skills, adept at explaining complex concepts.' },
    { name: 'Leadership', icon: FaUsers, color: '#4ECDC4', level: 4, category: 'personal', description: 'Proven ability to lead teams and manage projects effectively.' },
    { name: 'Logical Thinking', icon: FaBrain, color: '#45B7D1', level: 5, category: 'personal', description: 'Strong problem-solving skills and analytical approach to challenges.' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    allSkills.forEach((skill, index) => {
      const element = document.getElementById(`skill-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const filteredSkills = allSkills.filter(skill => 
    filter === 'all' || skill.category === filter
  );

  const SkillLevel = ({ level, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 relative overflow-hidden">
      <motion.div 
        className="h-2.5 rounded-full" 
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${level * 20}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );

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
      className="min-h-screen bg-gray-900 text-white p-10 overflow-hidden"
      variants={backgroundVariants}
      animate="animate"
      style={{
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgb(21, 21, 21) 0%, rgb(64, 64, 64) 90.2%)',
        backgroundSize: '400% 400%'
      }}
    >
      <motion.h2
        className="text-4xl font-bold text-[#33FF66] mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Technical & Personal Skills
      </motion.h2>
      <motion.p
        className="text-gray-300 leading-relaxed text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Explore my diverse skill set that combines technical expertise with strong personal attributes.
      </motion.p>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {['all', 'technical', 'personal'].map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full ${filter === category ? 'bg-[#33FF66] text-gray-900' : 'bg-gray-700 text-white'}`}
            onClick={() => setFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={index}
            id={`skill-${index}`}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={visible[`skill-${index}`] ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            onClick={() => setSelectedSkill(skill)}
          >
            <div className="flex items-center mb-4">
              <skill.icon className="w-8 h-8 mr-3" style={{ color: skill.color }} />
              <h3 className="text-xl font-semibold">{skill.name}</h3>
            </div>
            <SkillLevel level={skill.level} color={skill.color} />
            <p className="text-sm text-gray-400 mt-2">{skill.description.substring(0, 100)}...</p>
          </motion.div>
        ))}
      </div>

      {/* Skill Details Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-lg max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{selectedSkill.name}</h3>
                <button onClick={() => setSelectedSkill(null)}>
                  <FaTimes className="text-gray-400 hover:text-white" />
                </button>
              </div>
              <SkillLevel level={selectedSkill.level} color={selectedSkill.color} />
              <p className="text-gray-300 mt-4">{selectedSkill.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Skills;