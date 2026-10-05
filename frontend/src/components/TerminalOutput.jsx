import React from 'react';

/**
 * TerminalOutput — wraps content that should appear after a terminal command finishes typing.
 *
 * Props:
 *   visible   — when true, the content fades+slides into view
 *   delay     — optional extra ms delay after `visible` becomes true (default: 0)
 *   children  — the content to reveal
 *   className — extra classes on the wrapper
 *
 * Usage (pair with TerminalPrompt's onComplete):
 *   const [ready, setReady] = useState(false);
 *   <TerminalPrompt ... onComplete={() => setReady(true)} />
 *   <TerminalOutput visible={ready}>
 *     <p>This text appears after the prompt finishes typing.</p>
 *   </TerminalOutput>
 */
const TerminalOutput = ({ visible, delay = 0, children, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
        // Always occupy space so layout doesn't shift
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default TerminalOutput;
