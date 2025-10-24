'use client';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';
export type Toast = { id: string; title?: string; message: string; type?: ToastType };

type ToastContextValue = {
  show: (t: Omit<Toast, 'id'>) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const toast: Toast = { id, type: 'info', ...t };
    setToasts((prev) => [...prev, toast]);
    // auto dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              'min-w-[220px] max-w-sm rounded-lg shadow-lg px-4 py-3 text-sm border ' +
              (t.type === 'error'
                ? 'bg-red-600 text-white border-red-700'
                : t.type === 'success'
                ? 'bg-green-600 text-white border-green-700'
                : t.type === 'warning'
                ? 'bg-yellow-400 text-black border-yellow-500'
                : 'bg-gray-900 text-white border-gray-800')
            }
          >
            {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
            <div>{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
