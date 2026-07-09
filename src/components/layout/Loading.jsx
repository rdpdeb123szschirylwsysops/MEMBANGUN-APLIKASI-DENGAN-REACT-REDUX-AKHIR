import { useEffect } from 'react';

const Loading = ({ size = 'w-10 h-10', color = 'border-blue-500' }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-900/80 backdrop-blur-sm">
      <div className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default Loading;
