"use client";

import { FileText } from "lucide-react";

interface DocumentChipProps {
  filename: string;
  className?: string;
}

export default function DocumentChip({ filename, className = "" }: DocumentChipProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-md text-xs text-neutral-700 cursor-pointer ${className}`}>
      <FileText size={12} className="text-neutral-500" />
      <span className="font-medium">{filename}</span>
    </div>
  );
}