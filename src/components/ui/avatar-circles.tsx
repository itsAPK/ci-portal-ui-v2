'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Avatar {
  imageUrl?: string;
  profileUrl: string;
  name: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

const getRandomColor = () => {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16); // Generate a random number and convert to hex
  return `#${randomHex.padStart(6, '0')}`; // Ensure valid 6-character hex code
};

const AvatarCircles = ({ numPeople, className, avatarUrls }: AvatarCirclesProps) => {
  return (
    <div className={cn('z-10 flex -space-x-2 rtl:space-x-reverse', className)}>
      {avatarUrls.map((url, index) => (
        <a key={index} href={url.profileUrl} target="_blank" rel="noopener noreferrer">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar >
                  <AvatarImage  />
                  <AvatarFallback     className={cn(
                `ring-1 ring-inset ring-white/20 dark:ring-white/30`,
              )}
              style={{ backgroundColor: getRandomColor() }} // Apply random color here
            >{url.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium text-white">{url.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </a>
      ))}

      {numPeople && (
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href="#"
        >
          +{numPeople}
        </a>
      )}
    </div>
  );
};

export default AvatarCircles;
