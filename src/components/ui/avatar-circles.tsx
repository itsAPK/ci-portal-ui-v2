"use client";

import React from "react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Avatar {
  imageUrl: string;
  profileUrl: string;
  name : string
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-1 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <img
                className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                src={url.imageUrl}
                width={40}
                height={40}
                alt={`Avatar ${index + 1}`}
              />
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
