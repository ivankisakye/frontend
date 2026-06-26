// ScrollToTop.jsx - Debug version
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY;
      console.log('Scroll position:', scrollY); // 👈 Debug log
      
      if (scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Check initial scroll position
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    console.log('Scrolling to top!'); // 👈 Debug log
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Debug info */}
      {isVisible && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded z-50 text-sm">
          ScrollY: {Math.round(window.scrollY)}
        </div>
      )}
      
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </>
  );
};

export default ScrollToTop;