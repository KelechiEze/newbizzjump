import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

interface SocialLinkProps {
  platform: 'linkedin' | 'instagram' | 'tiktok';
  href?: string;
  className?: string;
  size?: number;
}

export const TikTokIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.58a8.28 8.28 0 0 0 4.84 1.55v-3.44h-1.07Z" />
  </svg>
);

export const SocialMediaLinks = ({
  className = '',
  itemClassName = '',
  iconSize = 16,
}: {
  className?: string;
  itemClassName?: string;
  iconSize?: number;
}) => {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={`text-neutral-900 hover:text-neutral-500 transition-colors p-1.5 rounded-full hover:bg-neutral-100/80 ${itemClassName}`}
      >
        <Linkedin size={iconSize} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={`text-neutral-900 hover:text-neutral-500 transition-colors p-1.5 rounded-full hover:bg-neutral-100/80 ${itemClassName}`}
      >
        <Instagram size={iconSize} />
      </a>
      <a
        href="https://tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className={`text-neutral-900 hover:text-neutral-500 transition-colors p-1.5 rounded-full hover:bg-neutral-100/80 ${itemClassName}`}
      >
        <TikTokIcon size={iconSize} />
      </a>
    </div>
  );
};
