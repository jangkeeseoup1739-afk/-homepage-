import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  altText: string;
  caption?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  altText,
  caption,
  onClose
}) => {
  const [scale, setScale] = React.useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 z-60 flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setScale((prev) => Math.min(prev + 0.3, 2.5));
          }}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition cursor-pointer"
          title="확대"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setScale((prev) => Math.max(prev - 0.3, 0.7));
          }}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition cursor-pointer"
          title="축소"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition cursor-pointer"
          title="닫기 (ESC)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="relative max-w-6xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-auto max-h-[82vh] max-w-full rounded-lg">
          <img
            src={imageUrl}
            alt={altText}
            style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-out' }}
            className="max-h-[80vh] w-auto object-contain rounded select-none shadow-2xl"
          />
        </div>
        {caption && (
          <p className="mt-3 text-sm text-gray-300 font-medium text-center bg-black/60 px-4 py-1.5 rounded-full backdrop-blur">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};
