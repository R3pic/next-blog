'use client';
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';
import Icon from '../ui/Icon';

export default function Pre({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  };

  return (
    <pre ref={preRef} {...props}>
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        className='absolute right-12'
      >
        { isCopied ? <Icon className='stroke-2 stroke-green-400' icon='check'/> : <Icon className='stroke-2' icon='clipboard' />}
      </button>
      {children}
    </pre>
  );
}