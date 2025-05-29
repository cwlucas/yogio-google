
import React from 'react';

interface MicButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const MicOnIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-8 h-8"}>
    <path d="M12 1.5a3 3 0 00-3 3v7.5a3 3 0 006 0v-7.5a3 3 0 00-3-3Z" />
    <path d="M8.25 9a4.5 4.5 0 019 0v3a4.5 4.5 0 01-9 0v-3Z" />
    <path d="M11.25 18.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.008Z" />
    <path d="M11.25 18.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.008ZM12 21a4.5 4.5 0 004.5-4.5H7.5A4.5 4.5 0 0012 21Z" />
  </svg>
);

const MicOffIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-8 h-8"}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a.75.75 0 0 0 .75-.75V7.563a3.752 3.752 0 0 0-7.5 0v10.438a.75.75 0 0 0 .75.75Zm2.06-8.745c.393-.28.69-.693.886-1.162A4.506 4.506 0 0 0 15.75 7.5c0-2.485-2.015-4.5-4.5-4.5S6.75 5.015 6.75 7.5c0 .798.209 1.539.578 2.184.196.47.493.883.886 1.162C8.609 10.37 9 10.918 9 11.513V12a3 3 0 1 0 6 0v-.488c0-.595.392-1.142.71-1.49Z" />
</svg>
);


const MicButton: React.FC<MicButtonProps> = ({ isListening, onClick, disabled }) => {
  const buttonClasses = `
    p-4 rounded-full transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-4
    ${
      isListening
        ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-300 animate-pulse'
        : 'bg-pink-500 hover:bg-pink-600 text-white focus:ring-pink-300'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-110'}
  `;

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClasses}
      aria-label={isListening ? 'Stop listening' : 'Start listening'}
      disabled={disabled}
    >
      {isListening ? <MicOnIcon /> : <MicOffIcon />}
    </button>
  );
};

export default MicButton;
