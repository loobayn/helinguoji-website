import React from 'react';
import { useScrollAnimation, getAnimationStyles } from '@/hooks/useScrollAnimation';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animationType?: 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({ 
  children, 
  delay = 0, 
  className = '',
  animationType = 'slideUp'
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  });

  const getStyles = () => {
    switch (animationType) {
      case 'slideLeft':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
          transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
        };
      case 'slideRight':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
          transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
        };
      case 'scale':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
        };
      default: // slideUp
        return getAnimationStyles(isVisible, delay);
    }
  };

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>} 
      className={className}
      style={getStyles()}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper; 