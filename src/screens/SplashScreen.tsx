// src/components/SplashScreen.tsx

import React from 'react';
import '@/styles/SplashScreen.css'

const SplashScreen: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {
  return (
    <div className='container'>
      <div className='center'>
    <div >
      <h1>Splash Page</h1>
      <button onClick={onButtonClick}>Continue</button>
    </div>
    </div>
    </div>
  );
};

export default SplashScreen;
