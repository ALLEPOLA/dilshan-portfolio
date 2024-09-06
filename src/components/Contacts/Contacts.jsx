import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import profileImage from '../../assets/table.jpg'; // Importing the image

const Contacts = () => (
  <motion.section
    id="contact"
    className="min-h-screen flex items-center bg-gray-900"
    initial={{ opacity: 0, y: 50 }}  // Fade in from below
    animate={{ opacity: 1, y: 0 }}   // Final state of animation
    transition={{ duration: 1, ease: 'easeInOut' }}  // Smooth animation
  >
    <motion.div
      className="container mx-auto flex flex-col lg:flex-row items-center px-6 py-16 bg-gray-900 rounded-lg shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
    >
      {/* Left Section: Image */}
      <motion.div
        className="lg:w-1/2 w-full mb-12 lg:mb-0 flex justify-center"
        whileHover={{ scale: 1.05 }} // Zoom-in effect on hover
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={profileImage} // Using the imported image here
          alt="Portfolio design"
          className="w-full h-full object-cover rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}  // Animate image entry
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Right Section: Contact Details */}
      <motion.div
        className="lg:w-1/2 w-full lg:pl-12 text-white"
        initial={{ opacity: 0, x: 50 }} // Shift from the right
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
      >
        <motion.h2
          className="text-4xl font-bold mb-4"
        >
          Contact Details
        </motion.h2>

        <motion.div
          className="text-lg space-y-6 mb-8"
        >
          <p className="flex items-center">
            <FaPhone className="text-green-400 mr-2" />
            <a
              href="tel:+94757358093"
              className="text-green-400 hover:underline"
            >
              +94757358093
            </a>
          </p>
          <p className="flex items-center">
            <FaEnvelope className="text-green-400 mr-2" />
            <a
              href="mailto:prasannaellepola2000@gmail.com"
              className="text-green-400 hover:underline"
            >
              prasannaellepola2000@gmail.com
            </a>
          </p>
          <p>Address: 184 Vijitha Mawatha, Muruthalawa, Kandy.</p>
        </motion.div>

        {/* Contact Form with Animation */}
        <motion.form
          className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }} // Slide-up animation for form
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeInOut' }}
        >
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block text-gray-300 font-semibold mb-2 text-sm">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-300 font-semibold mb-2 text-sm">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold mb-2 text-sm">Message</label>
            <textarea
              name="message"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:border-green-500"
              rows="4"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)' }}  // Button hover effect
          >
            Send Message
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default Contacts;
