import React from "react";
import "./testimonials.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Mark McRoberts",
      location: "New York",
      title: "VOLUNTEER FIREFIGHTER THREATENED BY TONGUE TUMOR",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.",
      image: "https://via.placeholder.com/300x200", // Replace with actual images
    },
    {
      id: 2,
      name: "Mark McRoberts",
      location: "New York",
      title: "VOLUNTEER FIREFIGHTER THREATENED BY TONGUE TUMOR",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Mark McRoberts",
      location: "New York",
      title: "VOLUNTEER FIREFIGHTER THREATENED BY TONGUE TUMOR",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      name: "Mark McRoberts",
      location: "New York",
      title: "VOLUNTEER FIREFIGHTER THREATENED BY TONGUE TUMOR",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">
          SUCCESSFUL <span>STORIES</span>
        </h2>
        <div className="testimonials-grid">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
              <div className="testimonial-content">
                <h3 className="testimonial-title">{testimonial.title}</h3>
                <p className="testimonial-message">{testimonial.message}</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
