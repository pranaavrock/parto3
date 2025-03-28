import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiQuestionLine } from "react-icons/ri";
import "./faq.css";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What courses do you offer?",
      answer: "We offer a comprehensive range of courses across technology, business, and personal development fields. Our catalog includes programming, data science, digital marketing, leadership, and more - all designed by industry experts.",
      category: "General"
    },
    {
      question: "Are the courses self-paced or scheduled?",
      answer: "We provide both options! Most courses are self-paced with lifetime access, but we also offer cohort-based programs with set schedules for those who prefer structured learning with peer interaction.",
      category: "Learning Format"
    },
    {
      question: "What kind of certification will I receive?",
      answer: "You'll receive a professional, verifiable certificate upon completing any course. Our certificates are recognized by employers worldwide and can be shared directly on LinkedIn.",
      category: "Certification"
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 14-day no-questions-asked money-back guarantee for all courses. If you're not completely satisfied, simply contact our support team for a full refund.",
      category: "Payments"
    },
    {
      question: "How do I access course materials?",
      answer: "All materials are available instantly after enrollment through our learning platform. You can access them anytime on any device - desktop, tablet, or mobile.",
      category: "Access"
    },
    {
      question: "Do you offer team or enterprise plans?",
      answer: "Yes! We provide special pricing and features for teams. Our enterprise plan includes admin dashboards, progress tracking, and custom learning paths for organizations.",
      category: "Business"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find quick answers to common questions about our platform</p>
          <div className="divider"></div>
        </div>

        <div className="faq-container">
          <div className="faq-graphic">
            <div className="graphic-circle"></div>
            <RiQuestionLine className="question-icon" />
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-header">
                  <div className="faq-category">{faq.category}</div>
                  <h3 className="faq-question">{faq.question}</h3>
                  <div className="faq-toggle">
                    {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>
                <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;