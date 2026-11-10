import React from 'react';

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✨';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <aside className="toast-viewport" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-notification-card toast-${toast.type}`}>
          <span className="toast-icon">{getIcon(toast.type)}</span>
          <p className="toast-text-msg">{toast.message}</p>
          <button
            type="button"
            className="toast-dismiss-btn"
            onClick={() => onDismiss(toast.id)}
            title="Fechar aviso"
          >
            ✕
          </button>
        </div>
      ))}
    </aside>
  );
}

