import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoClose as X } from "react-icons/io5";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
  duration?: number;
};

export type toastVariantsProps =  Record<"success" | "error" | "warning", string>

const toastVariants: toastVariantsProps = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-blue-500",
};

export default function Toast({ message, type = "warning", onClose, duration = 1500 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const toastContent = (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`fixed bottom-5 left-5 px-4 py-2 text-white rounded-lg shadow-lg flex items-center gap-2 z-[999] ${toastVariants[type]} select-none`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="text-white">
        <X size={25}/>
      </button>
    </motion.div>
  );

  return toastContent
}