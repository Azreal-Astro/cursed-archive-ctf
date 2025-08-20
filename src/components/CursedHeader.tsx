import { useState, useEffect } from 'react';

const CursedHeader = () => {
  const [glitchText, setGlitchText] = useState('CURSED ARCHIVE');
  
  useEffect(() => {
    const glitchPhrases = [
      'C0RRuPT3D D4T4',
      'L0ST S0ULS',
      'SQL_INJECT.ERR',
      'CURSED ARCHIVE'
    ];
    
    const interval = setInterval(() => {
      const randomPhrase = glitchPhrases[Math.floor(Math.random() * glitchPhrases.length)];
      setGlitchText(randomPhrase);
      
      setTimeout(() => {
        setGlitchText('CURSED ARCHIVE');
      }, 150);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative p-6 border-b border-border bg-card screen-static">
      <div className="container mx-auto">
        <h1 className="font-nightmare text-4xl md:text-6xl text-center text-cursed glitch flicker">
          {glitchText}
        </h1>
        <p className="font-terminal text-center text-muted-foreground mt-2 corruption">
          // UNAUTHORIZED ACCESS DETECTED - PROCEED AT YOUR OWN RISK
        </p>
        <div className="absolute top-0 left-0 w-full h-1 bg-destructive opacity-20 blood-drip"></div>
      </div>
      
      {/* Hidden whispers in HTML comments for CTF players */}
      {/* whisper: "The search function trusts all input... how naive" */}
      {/* whisper: "Check the network tab for leaked keys..." */}
      {/* whisper: "Base64 secrets: L3BoYW50b20tYWRtaW4=" */}
    </header>
  );
};

export default CursedHeader;