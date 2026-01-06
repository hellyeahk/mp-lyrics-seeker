
import React from 'react';

const FlowerDecoration: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {/* Top left flowers - with floating animation */}
      <div className="absolute top-8 left-8 opacity-8 animate-float-slow">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="6" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="20" cy="10" r="5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="30" cy="20" r="5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="20" cy="30" r="5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="10" cy="20" r="5" stroke="#94a3b8" strokeWidth="2.5"/>
        </svg>
      </div>

      {/* Top right flowers */}
      <div className="absolute top-4 right-12 opacity-6 animate-float-delay-1">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="7" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="25" cy="12" r="6" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="38" cy="25" r="6" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="25" cy="38" r="6" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="12" cy="25" r="6" stroke="#94a3b8" strokeWidth="2.5"/>
        </svg>
      </div>

      {/* Middle right small */}
      <div className="absolute top-1/3 right-6 opacity-5 animate-float-delay-2">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="4" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx="15" cy="7" r="4" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx="23" cy="15" r="4" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx="15" cy="23" r="4" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx="7" cy="15" r="4" stroke="#94a3b8" strokeWidth="2"/>
        </svg>
      </div>

      {/* Bottom left flowers */}
      <div className="absolute bottom-20 left-6 opacity-6 animate-float-delay-3">
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
          <circle cx="22.5" cy="22.5" r="6" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="22.5" cy="11" r="5.5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="34" cy="22.5" r="5.5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="22.5" cy="34" r="5.5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="11" cy="22.5" r="5.5" stroke="#94a3b8" strokeWidth="2.5"/>
        </svg>
      </div>

      {/* Bottom right flowers */}
      <div className="absolute bottom-32 right-8 opacity-5 animate-float-slow">
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
          <circle cx="17.5" cy="17.5" r="5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="17.5" cy="8" r="4.5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="27" cy="17.5" r="4.5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="17.5" cy="27" r="4.5" stroke="#94a3b8" strokeWidth="2.5"/>
          <circle cx="8" cy="17.5" r="4.5" stroke="#94a3b8" strokeWidth="2.5"/>
        </svg>
      </div>

      {/* Small accent flowers */}
      <div className="absolute top-1/2 left-4 opacity-4 animate-float-delay-1">
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <circle cx="12.5" cy="12.5" r="3.5" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx="12.5" cy="6" r="3" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx="19" cy="12.5" r="3" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx="12.5" cy="19" r="3" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx="6" cy="12.5" r="3" stroke="#94a3b8" strokeWidth="2"/>
        </svg>
      </div>

      {/* Stars accent - top - with twinkle */}
      <div className="absolute top-20 right-1/4 opacity-5 animate-twinkle">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0L11.5 7.5L10 10L8.5 7.5L10 0Z" fill="#94a3b8"/>
          <path d="M20 10L12.5 11.5L10 10L12.5 8.5L20 10Z" fill="#94a3b8"/>
          <path d="M10 20L8.5 12.5L10 10L11.5 12.5L10 20Z" fill="#94a3b8"/>
          <path d="M0 10L7.5 8.5L10 10L7.5 11.5L0 10Z" fill="#94a3b8"/>
        </svg>
      </div>

      {/* Stars accent - middle left - with twinkle */}
      <div className="absolute top-2/3 left-12 opacity-4 animate-twinkle-delay">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9 6L8 8L7 6L8 0Z" fill="#94a3b8"/>
          <path d="M16 8L10 9L8 8L10 7L16 8Z" fill="#94a3b8"/>
          <path d="M8 16L7 10L8 8L9 10L8 16Z" fill="#94a3b8"/>
          <path d="M0 8L6 7L8 8L6 9L0 8Z" fill="#94a3b8"/>
        </svg>
      </div>

      {/* Small dots accent */}
      <div className="absolute top-1/4 left-1/4 opacity-6 animate-pulse-slow">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="5" cy="5" r="1.5" fill="#94a3b8"/>
          <circle cx="15" cy="8" r="1" fill="#94a3b8"/>
          <circle cx="25" cy="12" r="1.5" fill="#94a3b8"/>
          <circle cx="8" cy="20" r="1" fill="#94a3b8"/>
          <circle cx="20" cy="25" r="1.5" fill="#94a3b8"/>
        </svg>
      </div>

      {/* Small dots accent - bottom right */}
      <div className="absolute bottom-1/4 right-1/4 opacity-5 animate-pulse-slow">
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <circle cx="3" cy="5" r="1" fill="#94a3b8"/>
          <circle cx="12" cy="3" r="1.5" fill="#94a3b8"/>
          <circle cx="20" cy="8" r="1" fill="#94a3b8"/>
          <circle cx="6" cy="18" r="1.5" fill="#94a3b8"/>
          <circle cx="18" cy="22" r="1" fill="#94a3b8"/>
        </svg>
      </div>

      {/* Subtle arc decoration - top center */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-4 animate-float-delay-2">
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
          <path d="M5 25C15 10 25 5 30 5C35 5 45 10 55 25" stroke="#94a3b8" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </div>
  );
};

export default FlowerDecoration;
