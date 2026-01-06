import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { Toast as ToastType } from '../types';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const config = {
    success: { icon: CheckCircle2, color: 'text-green-400', bg: 'from-green-500/20' },
    error: { icon: XCircle, color: 'text-red-400', bg: 'from-red-500/20' },
    info: { icon: Info, color: 'text-blue-400', bg: 'from-blue-500/20' }
  };

  const { icon: Icon, color, bg } = config[toast.type];

  return (
    <div className={`fixed bottom-[140px] left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-4 py-3 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 bg-gradient-to-r ${bg} to-transparent w-[calc(100%-40px)] max-w-sm`}>
      <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <p className="text-sm font-semibold text-slate-100">{toast.message}</p>
    </div>
  );
};

export default Toast;
