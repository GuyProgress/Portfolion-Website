import { useCallback, useEffect, useState } from 'react';
import './LogoLoop.css';

interface LogoLoopProps {
  logos: any[];
  speed?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  useCustomRender?: boolean;
}

export default function LogoLoop({
  logos = [],
  speed = 100,
  direction = 'left',
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = '#000000',
  ariaLabel = 'Technology logos',
  useCustomRender = false,
}: LogoLoopProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  
  const isHorizontal = direction === 'left' || direction === 'right';
  const fadeOutGradient = fadeOut 
    ? `linear-gradient(${isHorizontal ? 'to right' : 'to bottom'}, transparent, ${fadeOutColor} 20%, ${fadeOutColor} 80%, transparent)`
    : 'none';

  const getAnimationKeyframes = useCallback(() => {
    switch (direction) {
      case 'left': return 'scroll-left';
      case 'right': return 'scroll-right';
      case 'top': return 'scroll-up';
      case 'bottom': return 'scroll-down';
      default: return 'scroll-left';
    }
  }, [direction]);

  return (
    <div 
      className={`logo-loop-container ${isHorizontal ? 'horizontal' : 'vertical'}`}
      style={{
        maskImage: fadeOutGradient,
        WebkitMaskImage: fadeOutGradient,
      }}
      aria-label={ariaLabel}
    >
      <div 
        className={`logo-loop-track ${scaleOnHover ? 'scale-on-hover' : ''}`}
        style={{
          animationName: getAnimationKeyframes(),
          animationDuration: `${10000 / currentSpeed}s`,
          gap: `${gap}px`,
        }}
        onMouseEnter={() => setCurrentSpeed(hoverSpeed)}
        onMouseLeave={() => setCurrentSpeed(speed)}
      >
        {/* Render twice for seamless loop */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div 
            key={index} 
            className="logo-item"
            style={{ 
              height: isHorizontal ? `${logoHeight}px` : 'auto',
              minWidth: isHorizontal ? 'auto' : '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {useCustomRender ? (
               <div className="custom-logo">{logo.node}</div>
            ) : (
               logo.src ? (
                 <img src={logo.src} alt={logo.alt || `Logo ${index}`} style={{ height: '100%' }} />
               ) : (
                 <div className="custom-logo flex flex-col items-center justify-center text-zinc-400 hover:text-white transition-colors">
                   <div style={{ fontSize: `${logoHeight * 0.5}px` }}>{logo.node}</div>
                   {logo.title && <span className="text-xs mt-2 font-mono">{logo.title}</span>}
                 </div>
               )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
