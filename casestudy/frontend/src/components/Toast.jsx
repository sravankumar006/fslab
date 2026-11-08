import { useEffect } from 'react';

/**
 * Toast Notification Component
 * Renders temporary feedback alerts (success, error, info).
 */
export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  return (
    <div className={`toast-container ${toast.type}`}>
      <div className="toast-icon">
        {isSuccess && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 10l4 4L16 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {isError && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="10" cy="10" r="8" />
            <line x1="10" y1="6" x2="10" y2="11" strokeLinecap="round" />
            <line x1="10" y1="14" x2="10.01" y2="14" strokeLinecap="round" />
          </svg>
        )}
        {!isSuccess && !isError && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="10" cy="10" r="8" />
            <line x1="10" y1="9" x2="10" y2="14" strokeLinecap="round" />
            <circle cx="10" cy="6" r="1" fill="currentColor" />
          </svg>
        )}
      </div>
      <div className="toast-content">
        <strong className="toast-title">
          {isSuccess ? 'Success' : isError ? 'Error' : 'Notice'}
        </strong>
        <p className="toast-message">{toast.message}</p>
      </div>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
}

export default Toast;

