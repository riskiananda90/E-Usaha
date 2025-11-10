import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  blurDataURL?: string;
  aspectRatio?: string;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className, 
  wrapperClassName,
  blurDataURL,
  aspectRatio = '16/9',
  ...props 
}: LazyImageProps) => {
  const defaultBlur = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJoc2woMCAwJSA5NSUpIi8+PC9zdmc+';
  const [imageSrc, setImageSrc] = useState(blurDataURL || defaultBlur);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = src;
            
            img.onload = () => {
              setImageSrc(src);
              setIsLoading(false);
            };
            
            img.onerror = () => {
              setIsError(true);
              setIsLoading(false);
            };
            
            if (imgRef.current) {
              observer.unobserve(imgRef.current);
            }
          }
        });
      },
      {
        rootMargin: '50px', 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <div 
      className={cn('relative overflow-hidden bg-muted', wrapperClassName)}
      style={{ aspectRatio }}
      role="img"
      aria-label={isLoading ? `Memuat gambar: ${alt}` : alt}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={cn(
          'absolute inset-0 w-full h-full object-cover transition-all duration-500',
          isLoading && 'opacity-0 scale-110 blur-lg',
          !isLoading && 'opacity-100 scale-100 blur-0',
          className
        )}
        loading="lazy"
        decoding="async"
        {...props}
      />
      
      {isLoading && (
        <div className="absolute inset-0 skeleton-shimmer bg-muted" aria-hidden="true" />
      )}
      
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted" role="alert">
          <div className="text-center text-muted-foreground p-4">
            <svg 
              className="w-12 h-12 mx-auto mb-2 opacity-50" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Gagal memuat gambar</p>
          </div>
        </div>
      )}
    </div>
  );
};
