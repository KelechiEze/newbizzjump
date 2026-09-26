import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

interface SocialLinkProps {
  platform: 'linkedin' | 'instagram' | 'pinterest' | 'tiktok';
  href?: string;
  className?: string;
  size?: number;
}

export const PinterestIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.25c-5.25 0-9.75 3.75-9.75 8.64 0 3.22 1.83 5.79 4.69 6.8.35.14.5-.15.5-.35l.02-1.39c-1.92-.36-2.7-1.66-2.7-3.16 0-2.45 1.87-4.08 4.48-4.08 2.08 0 3.46 1.25 3.46 3.1 0 2.21-1.07 5.17-3.12 5.17-.97 0-1.68-.79-1.45-1.76.28-1.15.82-2.39.82-3.21 0-.74-.39-1.37-1.2-1.37-.95 0-1.71 1-1.71 2.34 0 .85.29 1.43.29 1.43L7.4 19.8c-.34 1.53-.05 3.42-.03 3.6.02.11.15.13.21.05.09-.12 1.2-1.46 1.58-2.83l.63-2.38c.33.64 1.3 1.18 2.32 1.18 3.05 0 5.1-2.8 5.1-6.04 0-4.13-3.34-7.13-8.16-7.13Zm0 0" />
  </svg>
);

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
        href="https://www.linkedin.com/company/bizzjump-agency/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={`text-white hover:text-[#dbfa07] transition-colors p-1.5 rounded-full hover:bg-[#dbfa07]/10 ${itemClassName}`}
      >
        <Linkedin size={iconSize} />
      </a>
      <a
        href="https://www.instagram.com/bizzju.mp?igsh=b21jNDMyNzQ3dmhy&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={`text-white hover:text-[#dbfa07] transition-colors p-1.5 rounded-full hover:bg-[#dbfa07]/10 ${itemClassName}`}
      >
        <Instagram size={iconSize} />
      </a>
      <a
        href="https://pin.it/77HvKUGOB"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pinterest"
        className={`text-white hover:text-[#dbfa07] transition-colors p-1.5 rounded-full hover:bg-[#dbfa07]/10 ${itemClassName}`}
      >
        <PinterestIcon size={iconSize} />
      </a>
      <a
        href="https://www.tiktok.com/@bizzjump?_r=1&_t=ZS-96iCPCsBf6r"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className={`text-white hover:text-[#dbfa07] transition-colors p-1.5 rounded-full hover:bg-[#dbfa07]/10 ${itemClassName}`}
      >
        <TikTokIcon size={iconSize} />
      </a>
    </div>
  );
};
