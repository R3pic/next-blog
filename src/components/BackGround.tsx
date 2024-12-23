'use client';
import Script from 'next/script';

export default function BackGround() {
  return (
    <>
      <canvas
        id="stars"
        className="fixed top-0 left-0 w-screen h-screen -z-1 
                bg-light-background
                dark:bg-dark-background"
      />
      <Script
        src="/js/background.js"
        strategy="lazyOnload"
      />
    </>
  );
}
