import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface InfoPopoverProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isIncompatible?: boolean;
  incompatibilityMessage?: string;
}

export function InfoPopover({
  children,
  title,
  description,
  isIncompatible = false,
  incompatibilityMessage
}: InfoPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div 
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="w-full"
          >
            {children}
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-0 z-[9999]" 
          align="start" 
          side="right" 
          sideOffset={8}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
        {isIncompatible && incompatibilityMessage && (
          <div className="bg-orange-50 text-orange-800 px-4 py-2 text-xs font-medium border-b border-orange-100" 
               style={{ 
                 borderTopLeftRadius: '6px', 
                 borderTopRightRadius: '6px',
                 borderBottomLeftRadius: '0px',
                 borderBottomRightRadius: '0px'
               }}>
            {incompatibilityMessage}
          </div>
        )}
        <div className="p-4">
          <div className="font-medium text-sm mb-2">{title}</div>
          <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
            {description.split('\n').map((line, index) => {
              // Handle bold text with **bold**
              const boldRegex = /\*\*(.*?)\*\*/g;
              const parts = line.split(boldRegex);
              
              return (
                <span key={index}>
                  {parts.map((part, partIndex) => 
                    partIndex % 2 === 1 ? (
                      <strong key={partIndex} className="font-semibold">{part}</strong>
                    ) : (
                      part
                    )
                  )}
                  {index < description.split('\n').length - 1 && <br />}
                </span>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
    </div>
  );
}