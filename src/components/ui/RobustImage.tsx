import React, { useEffect, useState } from "react";

interface RobustImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

const RobustImage: React.FC<RobustImageProps> = ({
  src,
  alt,
  className = "",
  fallbackText = "Image",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // reset state when src changes
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !hasError && (
        <div className="image-placeholder absolute inset-0 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <div className="text-sm">Loading...</div>
          </div>
        </div>
      )}
      {hasError && (
        <div className="image-error absolute inset-0 rounded-xl grid place-items-center">
          <div className="text-sm">{fallbackText}</div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${isLoaded ? "loaded" : ""}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default RobustImage;
