import { useState } from 'react';
import '../CustomerPages_css/TestimonialsSection.css';

const TestimonialsSection = ({ isVisible }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      avatar: '👩‍💼',
      rating: 5,
      text: 'Amazing inventory management system! The interface is clean and everything is so easy to find. My shopping experience has never been better.',
      color: '#4f46e5'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      avatar: '👨‍💻',
      rating: 5,
      text: 'This platform has revolutionized how I manage my inventory. The real-time updates and user-friendly interface make it a pleasure to use.',
      color: '#10b981'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Frequent Shopper',
      avatar: '👩‍🎓',
      rating: 5,
      text: 'I love the categorization and how quickly I can find what I need. The ordering process is seamless and the customer service is exceptional.',
      color: '#f59e0b'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Tech Enthusiast',
      avatar: '👨‍🔬',
      rating: 5,
      text: 'The system is incredibly responsive and well-designed. I appreciate the attention to detail in every aspect of the user experience.',
      color: '#ef4444'
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setActiveTestimonial(index);
  };

  return (
    <section className={`testimonials-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Real feedback from our valued customers</p>
        </div>
        
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                {testimonials[activeTestimonial].text}
              </p>
              <div className="rating">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
            </div>
            <div className="testimonial-author">
              <div 
                className="author-avatar"
                style={{ backgroundColor: testimonials[activeTestimonial].color }}
              >
                <span>{testimonials[activeTestimonial].avatar}</span>
              </div>
              <div className="author-info">
                <h4>{testimonials[activeTestimonial].name}</h4>
                <p>{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
          </div>

          <div className="testimonial-controls">
            <button 
              className="control-btn prev-btn" 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className="control-btn next-btn" 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-mini ${index === activeTestimonial ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="mini-avatar"
                style={{ backgroundColor: testimonial.color }}
              >
                <span>{testimonial.avatar}</span>
              </div>
              <div className="mini-content">
                <h5>{testimonial.name}</h5>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
