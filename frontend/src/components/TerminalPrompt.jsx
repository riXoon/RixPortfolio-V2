import React, { useState, useEffect, useRef } from 'react';

/**
 * TerminalPrompt — renders the Kali ZSH prompt with a sequential typewriter animation.
 *
 * Props:
 *   user        — username shown in the prompt (default: 'senec4')
 *   host        — hostname shown in the prompt (default: 'kali')
 *   dir         — working directory shown in brackets (default: '~')
 *   command     — ReactNode shown once typing is done (with colored spans etc.)
 *   commandStr  — plain-text version of `command` used for the typing animation
 *   onComplete  — optional callback fired once when typing finishes
 *   speed       — ms per character (default: 35)
 *   className   — extra Tailwind classes for the wrapper
 *
 * Animation sequence:
 *   1. Trigger when the element enters the viewport (IntersectionObserver).
 *   2. Type the header line: ┌──(user㉿host) - [dir]
 *   3. Pause briefly, then show └─$ and type the commandStr character by character.
 *   4. When done, swap plain text for the styled `command` ReactNode.
 *   5. The blinking cursor fades out after typing completes.
 */
const TerminalPrompt = ({
  user = 'senec4',
  host = 'kali',
  dir = '~',
  command,
  commandStr = '',
  onComplete,
  speed = 35,
  className = '',
}) => {
  const fullHeader = `(${user}㉿${host}) - [${dir}]`;

  // Animation phases: idle → header → command → done
  const [phase, setPhase] = useState('idle');
  const [headerTyped, setHeaderTyped] = useState('');
  const [cmdTyped, setCmdTyped] = useState('');
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);

  // Kick off animation once in view
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setPhase('header');
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Type the header line
  useEffect(() => {
    if (phase !== 'header') return;
    
    setHeaderTyped(fullHeader);
    // Short pause, then transition to command phase
    timeoutRef.current = setTimeout(() => setPhase('command'), 120);
    
    return () => clearTimeout(timeoutRef.current);
  }, [phase]);

  // Type the command
  useEffect(() => {
    if (phase !== 'command') return;
    if (!commandStr) {
      setPhase('done');
      onComplete?.();
      return;
    }
    let i = 0;
    const type = () => {
      if (i < commandStr.length) {
        setCmdTyped(commandStr.slice(0, i + 1));
        i++;
        timeoutRef.current = setTimeout(type, speed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setPhase('done');
          onComplete?.();
        }, 200);
      }
    };
    timeoutRef.current = setTimeout(type, speed * 0.5);
    return () => clearTimeout(timeoutRef.current);
  }, [phase]);

  const showHeader = phase !== 'idle';
  const showCmdLine = phase === 'command' || phase === 'done';
  const isDone = phase === 'done';

  return (
    <div ref={wrapperRef} className={`zsh-prompt select-none ${className}`}>
      {/* ┌──(senec4㉿kali) - [~] */}
      <div className="zsh-prompt-top">
        <span className="text-[#9B72EF]">┌──</span>
        {showHeader ? (
          <>
            <span className="zsh-prompt-user">{headerTyped}</span>
            {/* Blinking cursor on the header line while it's being typed */}
            {phase === 'header' && (
              <span className="zsh-typing-cursor" aria-hidden="true" />
            )}
          </>
        ) : (
          /* Reserve space so layout doesn't jump */
          <span className="opacity-0">{fullHeader}</span>
        )}
      </div>

      {/* └─$ command */}
      {showCmdLine && (
        <div className="zsh-prompt-bottom">
          <span className="text-[#9B72EF]">└─</span>
          <span className="text-[#9B72EF] font-semibold">$</span>
          <span className="zsh-prompt-cmd">
            {/* While typing: show plain text + blinking cursor */}
            {!isDone && (
              <>
                {cmdTyped}
                <span className="zsh-typing-cursor" aria-hidden="true" />
              </>
            )}
            {/* When done: swap to styled ReactNode */}
            {isDone && command}
          </span>
        </div>
      )}
    </div>
  );
};

export default TerminalPrompt;
