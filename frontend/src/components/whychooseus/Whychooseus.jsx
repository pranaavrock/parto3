import React from "react";
import { motion } from "framer-motion";
import { 
  FaBookOpen, 
  FaUserGraduate, 
  FaLaptopCode, 
  FaHeadset, 
  FaMoneyBillWave, 
  FaGlobeAmericas 
} from "react-icons/fa";
import "./whychooseus.css";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaBookOpen className="feature-icon" />,
      title: "Comprehensive Curriculum",
      description: "Structured courses covering the latest industry trends and technologies with regularly updated content.",
      color: "#4e79a7"
    },
    {
      icon: <FaUserGraduate className="feature-icon" />,
      title: "Personalized Learning",
      description: "Adaptive learning paths designed to suit individual learning styles and pace with AI-powered recommendations.",
      color: "#e15759"
    },
    {
      icon: <FaLaptopCode className="feature-icon" />,
      title: "Hands-on Projects",
      description: "Gain practical experience with real-world projects and case studies that build your portfolio.",
      color: "#76b7b2"
    },
    {
      icon: <FaHeadset className="feature-icon" />,
      title: "24/7 Support",
      description: "Get assistance anytime with our dedicated support team and mentors through multiple channels.",
      color: "#f28e2b"
    },
    {
      icon: <FaMoneyBillWave className="feature-icon" />,
      title: "Affordable Pricing",
      description: "Quality education at accessible prices with flexible payment options and scholarships available.",
      color: "#59a14f"
    },
    {
      icon: <FaGlobeAmericas className="feature-icon" />,
      title: "Global Community",
      description: "Join a worldwide network of learners, mentors, and industry experts for collaboration.",
      color: "#edc948"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="why-choose-us">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="title">Why Choose Us?</h2>
          <p className="subtitle">Discover the unique benefits of learning with us</p>
          <div className="divider"></div>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }}
            >
              <div 
                className="feature-icon-container"
                style={{ backgroundColor: `${feature.color}20`, borderColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div 
                className="feature-hover-bar"
                style={{ backgroundColor: feature.color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;