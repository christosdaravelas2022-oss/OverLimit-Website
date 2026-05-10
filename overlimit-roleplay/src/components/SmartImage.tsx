import React, { useState } from "react";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export default function SmartImage({ src, alt, className, fallbackIcon, ...props }: SmartImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-graphite/20 border border-white/5 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
        {fallbackIcon || <span className="text-white/20 font-display text-[8px] uppercase tracking-widest">{alt}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => {
        console.warn(`Failed to load image: ${src}`);
        setError(true);
      }}
      {...props}
    />
  );
}
