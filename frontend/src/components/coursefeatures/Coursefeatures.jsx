import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaHandsHelping, FaCertificate, FaUserTie, FaUsers, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./coursefeatures.css";

const CourseFeatures = () => {
  const features = [
    {
      icon: <FaChalkboardTeacher className="feature-icon" />,
      title: "Expert Instructors",
      description: "Learn from industry-leading professionals with years of experience."
    },
    {
      icon: <FaHandsHelping className="feature-icon" />,
      title: "Interactive Learning",
      description: "Engage in hands-on projects, quizzes, and live sessions."
    },
    {
      icon: <FaClock className="feature-icon" />,
      title: "Flexible Schedules",
      description: "Access courses anytime, anywhere, and learn at your own pace."
    },
    {
      icon: <FaCertificate className="feature-icon" />,
      title: "Certification",
      description: "Earn industry-recognized certificates to boost your career."
    },
    {
      icon: <FaUserTie className="feature-icon" />,
      title: "Career Guidance",
      description: "Get mentorship and support to excel in your professional journey."
    },
    {
      icon: <FaUsers className="feature-icon" />,
      title: "Community Support",
      description: "Join a vibrant learning community and collaborate with peers."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setTransition(true);
    setCurrentIndex(prev => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setTransition(true);
    setCurrentIndex(prev => (prev === features.length - 1 ? 0 : prev + 1));
  };

  // Calculate which cards to display
  const getVisibleCards = () => {
    const cards = [];
    const totalCards = features.length;
    
    // Previous card
    const prevIndex = currentIndex === 0 ? totalCards - 1 : currentIndex - 1;
    cards.push({ ...features[prevIndex], position: 'left' });
    
    // Current card
    cards.push({ ...features[currentIndex], position: 'center' });
    
    // Next card
    const nextIndex = currentIndex === totalCards - 1 ? 0 : currentIndex + 1;
    cards.push({ ...features[nextIndex], position: 'right' });
    
    return cards;
  };

  return (
    <section className="course-features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Our Courses</h2>
          <p className="section-subtitle">Designed to help you achieve your learning goals effectively</p>
          <div className="divider"></div>
        </div>
        
        <div className="carousel-container">
          <button className="nav-button prev" onClick={handlePrev}>
            <FaChevronLeft />
          </button>
          
          <div className={`carousel-slider ${transition ? 'transition-active' : ''}`}>
            {getVisibleCards().map((card, index) => (
              <div 
                key={`${card.title}-${index}`}
                className={`feature-card ${card.position}`}
              >
                <div className="feature-icon-container">
                  {card.icon}
                </div>
                <h3 className="feature-title">{card.title}</h3>
                <p className="feature-description">{card.description}</p>
              </div>
            ))}
          </div>
          
          <button className="nav-button next" onClick={handleNext}>
            <FaChevronRight />
          </button>
        </div>
        
        <div className="carousel-dots">
          {features.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setTransition(true);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFeatures;