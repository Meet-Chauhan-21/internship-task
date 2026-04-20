import { useEffect, useState } from "react";
import { Dismiss24Regular } from "@fluentui/react-icons";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const TOAST_DURATION = 3000;

export const createToastContext = (): [ToastMessage[], (message: string, type: ToastType, duration?: number) => void, (id: string) => void] => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType, duration = TOAST_DURATION) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, message, type };
    
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return [toasts, showToast, removeToast];
};

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const ToastItem = ({ toast, onRemove }: { toast: ToastMessage; onRemove: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onRemove, TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const bgColor =
    toast.type === "success"
      ? "bg-green-50 border-green-200"
      : toast.type === "error"
        ? "bg-red-50 border-red-200"
        : toast.type === "warning"
          ? "bg-yellow-50 border-yellow-200"
          : "bg-blue-50 border-blue-200";

  const textColor =
    toast.type === "success"
      ? "text-green-800"
      : toast.type === "error"
        ? "text-red-800"
        : toast.type === "warning"
          ? "text-yellow-800"
          : "text-blue-800";

  // const iconBg =
    // toast\.type === "success"
      // \? "bg-green-100"
      // : toast\.type === "error"
        // \? "bg-red-100"
        // : toast\.type === "warning"
          // \? "bg-yellow-100"
          // : "bg-blue-100";

  return (
    <div className={`border ${bgColor} rounded-lg p-4 flex items-center gap-3 min-w-[300px] animate-slideIn`}>
      <div className={`h-2 w-2 rounded-full ${toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : toast.type === "warning" ? "bg-yellow-600" : "bg-blue-600"}`}></div>
      <span className={`flex-1 text-sm font-medium ${textColor}`}>{toast.message}</span>
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Dismiss24Regular />
      </button>
    </div>
  );
};

const Toast = ({ toasts, onRemove }: ToastProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => onRemove(toast.id)} />
      ))}
    </div>
  );    
};

export default Toast;
