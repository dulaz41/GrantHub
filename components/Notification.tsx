import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'loading';
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    if (isVisible && type !== 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration, type]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <FiXCircle className="w-6 h-6 text-red-500" />;
      case 'info':
        return <FiAlertCircle className="w-6 h-6 text-blue-500" />;
      case 'loading':
        return <FiLoader className="w-6 h-6 text-blue-500 animate-spin" />;
      default:
        return <FiCheckCircle className="w-6 h-6 text-green-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'loading':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'info':
        return 'text-blue-800';
      case 'loading':
        return 'text-blue-800';
      default:
        return 'text-green-800';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-[9999] animate-slide-in-right">
      <div
        className={`max-w-md w-full ${getBackgroundColor()} border rounded-lg shadow-xl p-4 flex items-center space-x-3 transform transition-all duration-300 hover:scale-105`}
      >
        {getIcon()}
        <div className="flex-1">
          <p className={`text-sm font-medium ${getTextColor()}`}>
            {message}
          </p>
        </div>
        {type !== 'loading' && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiXCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
