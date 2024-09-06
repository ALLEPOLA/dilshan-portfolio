import React from 'react';

const Header = () => (
  <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-6 shadow-xl">
    <div className="container mx-auto flex justify-between items-center px-6">
      <h1 className="text-5xl font-extrabold tracking-tighter drop-shadow-md hover:scale-105 transition-transform duration-300">
        Dilshan Prasanna
      </h1>
      <nav>
        <ul className="flex space-x-8 text-xl font-medium">
          <li>
            <a
              href="#about"
              className="hover:text-yellow-400 transition-colors duration-300 relative group"
            >
              About
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-yellow-400"></span>
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="hover:text-yellow-400 transition-colors duration-300 relative group"
            >
              Services
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-yellow-400"></span>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-yellow-400 transition-colors duration-300 relative group"
            >
              Contact
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-yellow-400"></span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
