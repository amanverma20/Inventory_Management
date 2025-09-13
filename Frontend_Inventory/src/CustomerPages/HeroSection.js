import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CustomerPages_css/HeroSection.scss';
import { useUser } from '../Login _signup_pages/UserContext';

const HeroSection = () => {
    const { userData } = useUser(); 
    const navigate = useNavigate();
    const [currentText, setCurrentText] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    const texts = [
        "INVENTORY MANAGEMENT",
        "SMART SHOPPING",
        "EFFICIENT TRACKING",
        "SEAMLESS EXPERIENCE"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTyping(false);
            setTimeout(() => {
                setCurrentText((prev) => (prev + 1) % texts.length);
                setIsTyping(true);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, [texts.length]);

    const clickHandler = () => {
        navigate(`/customer/${userData.id}/product`);
    }

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="container-home-new">
            <div className="left-container-new">
                <p className='intro-data-new'>Welcome to</p>
                <h1 className={`heading-new ${isTyping ? 'typing' : 'erasing'}`}>
                    {texts[currentText]}
                </h1>
                <p className='main-content-new'>
                    Experience refined elegance with our minimalist brand. We embody sophistication 
                    in every aspect of your shopping, be it groceries or any other necessity. 
                    Elevate your style and shopping experience with timeless minimalism.
                </p>
                <div className="cta-buttons">
                    <button className='button primary-btn' onClick={clickHandler}>
                        <span>Shop Now</span>
                        <i className="arrow">→</i>
                    </button>
                    <button className='button secondary-btn' onClick={() => scrollToSection('featured')}>
                        <span>Explore</span>
                    </button>
                </div>
                <div className="hero-features">
                    <div className="feature-item">
                        <span className="feature-icon">🚚</span>
                        <span>Free Shipping</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">🔒</span>
                        <span>Secure Payment</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">⚡</span>
                        <span>Fast Delivery</span>
                    </div>
                </div>
            </div>
            <div className="right-container-new" data-aos="zoom-in-up" data-aos-duration="1000">
                <div className="image-container">
                    <img 
                        src="/newlogo.svg" 
                        alt="shopping" 
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="fallback-hero-icon" style={{ display: 'none' }}>
                        <div className="hero-icon-large">🛍️</div>
                        <div className="hero-text">Smart Shopping</div>
                    </div>
                    <div className="floating-elements">
                        <div className="floating-element element-1">📦</div>
                        <div className="floating-element element-2">🛒</div>
                        <div className="floating-element element-3">💳</div>
                        <div className="floating-element element-4">🎯</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection