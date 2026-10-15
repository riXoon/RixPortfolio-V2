import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

// Shared dialog for the admin forms. The overlay itself scrolls (so tall forms
// are never cropped), `data-lenis-prevent` stops the site's smooth-scroll from
// swallowing the wheel, and the page behind is locked while it is open.
const AdminModal = ({ open, title, onClose, maxWidth = 'max-w-md', children }) => {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const trigger = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKeyDown = (e) => { if (e.key === 'Escape') onCloseRef.current(); };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/80"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          className={`w-full ${maxWidth} bg-[#1A1825] border border-white/10 rounded-2xl p-6 outline-none`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button type="button" onClick={onClose} aria-label="Close" className="p-1 text-gray-400 hover:text-white">
              <FiX size={24} aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
