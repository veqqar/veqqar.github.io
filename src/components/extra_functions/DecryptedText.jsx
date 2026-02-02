import React, { useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+-=[]{};:\'",.<>/?';

export default function DecryptedText({
  text,
  encryptedText,
  iterations = 10,
  speed = 35,
  charset = DEFAULT_CHARSET,
  className = 'decrypted-text',
  encryptedClassName = 'encrypted-text',
  parentClassName = 'decrypted-text-container',
  ...props
}) {
  const [displayChars, setDisplayChars] = useState(() =>
    encryptedText.split('')
  );

  const animTokenRef = useRef(0);
  const hoveringRef = useRef(false);

  const diffIndices = useMemo(() => {
    const diffs = [];
    const maxLen = Math.max(text.length, encryptedText.length);
    for (let i = 0; i < maxLen; i++) {
      if (text[i] !== encryptedText[i]) diffs.push(i);
    }
    return diffs;
  }, [text, encryptedText]);

  useEffect(() => {
    animTokenRef.current++;
    setDisplayChars(encryptedText.split(''));
  }, [text, encryptedText]);

  const randomChar = () =>
    charset[Math.floor(Math.random() * charset.length)];

  const runForward = async (token) => {
    for (const idx of diffIndices) {
      if (animTokenRef.current !== token || !hoveringRef.current) return;

      for (let j = 0; j < iterations; j++) {
        if (animTokenRef.current !== token || !hoveringRef.current) return;
        setDisplayChars((prev) => {
          const cp = [...prev];
          cp[idx] = randomChar();
          return cp;
        });
        await new Promise((r) => setTimeout(r, speed));
      }

      if (animTokenRef.current !== token || !hoveringRef.current) return;
      setDisplayChars((prev) => {
        const cp = [...prev];
        cp[idx] = text[idx] ?? '';
        return cp;
      });
      await new Promise((r) => setTimeout(r, speed));
    }
  };

  const runReverse = async (token) => {
    const rev = [...diffIndices].reverse();

    for (const idx of rev) {
      if (animTokenRef.current !== token) return;

      for (let j = 0; j < iterations; j++) {
        if (animTokenRef.current !== token) return;
        setDisplayChars((prev) => {
          const cp = [...prev];
          cp[idx] = randomChar();
          return cp;
        });
        await new Promise((r) => setTimeout(r, speed));
      }

      if (animTokenRef.current !== token) return;
      setDisplayChars((prev) => {
        const cp = [...prev];
        cp[idx] = encryptedText[idx] ?? '';
        return cp;
      });
      await new Promise((r) => setTimeout(r, speed));
    }
  };

  const handleEnter = () => {
    hoveringRef.current = true;
    const token = ++animTokenRef.current;
    runForward(token);
  };

  const handleLeave = () => {
    hoveringRef.current = false;
    const token = ++animTokenRef.current;
    runReverse(token);
  };

  return (
    <span
      className={parentClassName}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
      style={{ cursor: 'none', display: 'inline-block' }}
    >
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          margin: '-1px',
          padding: 0,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)'
        }}
      >
        {displayChars.join('')}
      </span>

      <span aria-hidden="true">
        {displayChars.map((ch, i) => {
          const isFinal = ch === text[i];
          const isEnc = ch === encryptedText[i];
          const cls = isFinal ? className : encryptedClassName;
          return (
            <span key={i} className={cls}>
              {ch}
            </span>
          );
        })}
      </span>
    </span>
  );
}
