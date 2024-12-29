'use client';
import Script from 'next/script';

export default function BackGround() {
  return (
    <>
      <canvas
        id="stars"
        className="fixed inset-0 w-screen h-screen -z-1 bg-light-backgrounddark:bg-dark-background
        hidden
        lg:block"
      />
      <Script
        src="/js/background.js"
        strategy="lazyOnload"
      />
    </>
  );
}
