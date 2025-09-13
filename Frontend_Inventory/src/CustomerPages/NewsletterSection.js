import { useState } from 'react';
import '../CustomerPages_css/NewsletterSection.css';

const NewsletterSection = ({ isVisible }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section className={`newsletter-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>Stay Updated!</h2>
            <p>Subscribe to our newsletter and never miss out on exclusive deals, new products, and special offers.</p>
          </div>
          <div className="newsletter-form-container">
            {isSubscribed ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <p>Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="subscribe-btn"
                  >
                    {isLoading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
                <p className="newsletter-disclaimer">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
        <div className="newsletter-features">
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <span>Exclusive Deals</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📦</span>
            <span>New Products</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎁</span>
            <span>Special Offers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
