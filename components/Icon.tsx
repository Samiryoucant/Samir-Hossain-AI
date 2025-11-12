import React from 'react';

type IconName = 'image' | 'sparkles' | 'download' | 'sun' | 'moon' | 'mail' | 'telegram' | 'youtube' | 'zoom-in' | 'close' | 'credit-card' | 'check-circle' | 'arrow-right';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

const icons: Record<IconName, React.ReactNode> = {
  image: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  ),
  sparkles: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.5 21.75l-.398-1.188a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.188-.398a2.25 2.25 0 001.423-1.423L16.5 15.75l.398 1.188a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.188.398a2.25 2.25 0 00-1.423 1.423z" />
  ),
  download: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  ),
  sun: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a2.25 2.25 0 00-2.25 2.25 2.25 2.25 0 002.25 2.25 2.25 2.25 0 002.25-2.25A2.25 2.25 0 0012 12z" />
  ),
  moon: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  ),
  mail: (
     <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  ),
  telegram: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l-4-4 8-10-12 6 3 3 8-5z" transform="rotate(20 12 12)"/>
  ),
  youtube: (
    <path d="M10,15L15.5,12L10,9V15M21.8,8.2C21.6,7.2,20.8,6.4,19.8,6.2C18.1,5.8,12,5.8,12,5.8S5.9,5.8,4.2,6.2C3.2,6.4,2.4,7.2,2.2,8.2C1.8,9.9,1.8,12,1.8,12S1.8,14.1,2.2,15.8C2.4,16.8,3.2,17.6,4.2,17.8C5.9,18.2,12,18.2,12,18.2S18.1,18.2,19.8,17.8C20.8,17.6,21.6,16.8,21.8,15.8C22.2,14.1,22.2,12,22.2,12S22.2,9.9,21.8,8.2Z" fill="currentColor" stroke="none"/>
  ),
  'zoom-in': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
  ),
  'close': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  ),
  'credit-card': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3.375m-3.375 2.25h11.25m4.5-7.5v6m-3.75-3.75h7.5" />
  ),
  'check-circle': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  'arrow-right': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
  ),
};

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  const isYoutube = name === 'youtube';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={isYoutube ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      strokeWidth={isYoutube ? 0 : 1.5}
      stroke="currentColor"
      className={className}
      {...props}
    >
      {icons[name]}
    </svg>
  );
};