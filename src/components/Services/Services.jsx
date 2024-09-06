import React from 'react';
import { FaCode, FaGlobe, FaMobileAlt, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <FaCode className="text-6xl mb-4" />,
    title: 'Programming',
    description: 'Developing robust and scalable applications using modern technologies.'
  },
  {
    icon: <FaGlobe className="text-6xl mb-4" />,
    title: 'Web Design',
    description: 'Creating visually appealing and user-friendly website designs.'
  },
  {
    icon: <FaMobileAlt className="text-6xl mb-4" />,
    title: 'UI/UX',
    description: 'Designing intuitive user interfaces and enhancing user experiences.'
  },
  {
    icon: <FaComments className="text-6xl mb-4" />,
    title: 'Consultation',
    description: 'Providing expert advice and strategies for your digital projects.'
  }
];

const Services = () => (
  <section id="services" className="min-h-screen py-20 bg-gray-800">
    <div className="container mx-auto px-6 flex flex-col items-center">
      <motion.h2
        className="text-5xl font-extrabold mb-12 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        My Services
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-[#33FF66] p-8 rounded-lg shadow-xl text-gray-800 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)' }}
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-800 text-center">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
