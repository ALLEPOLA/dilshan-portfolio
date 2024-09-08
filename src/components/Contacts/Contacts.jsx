import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import profileImage from '../../assets/table.jpg';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailParams = {
      to_email: formData.email,
      user_name: formData.name,
      user_email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    emailjs
      .send(
        'service_v00vnam',
        'template_boziy3a',
        emailParams,
        'QOQuRU-v_0cF_qi-PqNJ2'
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setSubmitStatus('success');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        },
        (error) => {
          console.log('Error sending email:', error.text);
          setSubmitStatus('error');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 3000);
      });
  };

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

  const contactInfo = [
    { icon: FaPhone, text: '+94757358093', href: 'tel:+94757358093' },
    { icon: FaEnvelope, text: 'prasannaellepola2000@gmail.com', href: 'mailto:prasannaellepola2000@gmail.com' },
    { icon: FaMapMarkerAlt, text: '184 Vijitha Mawatha, Muruthalawa, Kandy', href: null }
  ];

  return (
    <motion.section
      id="contact"
      className="min-h-screen flex items-center bg-gray-900 overflow-hidden"
      variants={backgroundVariants}
      animate="animate"
      style={{
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgb(21, 21, 21) 0%, rgb(64, 64, 64) 90.2%)',
        backgroundSize: '400% 400%'
      }}
    >
      <div className="container mx-auto px-6 py-16">
        <motion.h2
          className="text-4xl font-bold text-[#33FF66] mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="text-gray-300 leading-relaxed text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Feel free to reach out for collaborations or just a friendly hello */}
        </motion.p>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Section: Contact Info */}
          <motion.div
            className="lg:w-1/2 w-full mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src={profileImage}
              alt="Portfolio design"
              className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
            />
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <item.icon className="text-[#33FF66] mr-4 text-2xl" />
                {item.href ? (
                  <a href={item.href} className="text-white hover:text-[#33FF66] transition-colors">
                    {item.text}
                  </a>
                ) : (
                  <span className="text-white">{item.text}</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right Section: Contact Form */}
          <motion.div
            className="lg:w-1/2 w-full lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <form onSubmit={sendEmail} className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <label className="block text-gray-300 font-semibold mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33FF66]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 font-semibold mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33FF66]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 font-semibold mb-2" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33FF66]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 font-semibold mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33FF66]"
                  rows="4"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 bg-[#33FF66] text-gray-900 font-bold rounded-lg hover:bg-[#2be559] transition duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Status Message */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              className={`fixed bottom-4 right-4 p-4 rounded-lg ${
                submitStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              {submitStatus === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Contacts;