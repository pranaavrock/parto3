import React from "react";
import { FaChalkboardTeacher, FaUserGraduate, FaLightbulb, FaAward } from "react-icons/fa";
import "./about.css";

const About = () => {
  const stats = [
    { number: "10,000+", label: "Students Enrolled", icon: <FaUserGraduate /> },
    { number: "200+", label: "Expert Instructors", icon: <FaChalkboardTeacher /> },
    { number: "500+", label: "Courses Available", icon: <FaLightbulb /> },
    { number: "95%", label: "Satisfaction Rate", icon: <FaAward /> }
  ];

  const team = [
    { name: "Sarah Johnson", role: "Founder & CEO", bio: "Education specialist with 15+ years experience in curriculum development." },
    { name: "Michael Chen", role: "CTO", bio: "Tech innovator focused on creating immersive learning experiences." },
    { name: "David Rodriguez", role: "Head Instructor", bio: "Industry veteran with a passion for mentoring new talent." },
    { name: "Emily Wilson", role: "Student Success", bio: "Dedicated to ensuring every learner achieves their goals." }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>Our Story</h1>
          <p className="hero-text">
            Empowering learners worldwide through accessible, high-quality education since 2015.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              We're transforming education by breaking down barriers to learning. Our platform 
              combines cutting-edge technology with proven teaching methodologies to deliver 
              exceptional online learning experiences.
            </p>
            <div className="mission-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Excellence</h3>
              <p>
                We maintain the highest standards in course quality, instructor 
                selection, and learning outcomes.
              </p>
            </div>
            <div className="value-card">
              <h3>Accessibility</h3>
              <p>
                Education should be available to everyone, regardless of location 
                or financial circumstances.
              </p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>
                We continuously evolve our platform to incorporate the latest 
                educational technologies.
              </p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>
                Learning thrives in collaborative environments where students 
                support each other's growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-photo-placeholder"></div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Learning?</h2>
          <p>
            Join thousands of students who are advancing their careers with our courses.
          </p>
          <button className="cta-button">Explore Courses</button>
        </div>
      </section>
    </div>
  );
};

export default About;