"use client";

import { X, FileText, Monitor } from "lucide-react";
import Image from "next/image";

interface FileChipProps {
  fileName: string;
  fileType: 'browser' | 'sharepoint' | 'imanage';
  onRemove: () => void;
  className?: string;
}

export default function FileChip({ fileName, fileType, onRemove, className = "" }: FileChipProps) {
  // Get appropriate icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'sharepoint':
        return <Monitor size={14} className="text-blue-500" />;
      case 'imanage':
        return <Image src="/imanage.svg" width={14} height={14} alt="iManage" />;
      case 'browser':
      default:
        return <FileText size={14} className="text-gray-600" />;
    }
  };

  // Get source prefix for display
  const getSourcePrefix = (type: string) => {
    switch (type) {
      case 'sharepoint':
        return 'SharePoint: ';
      case 'imanage':
        return 'iManage: ';
      case 'browser':
      default:
        return '';
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 pl-2 pr-1 py-1.5 bg-white border border-[#E7E6EA] rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors ${className}`}>
      {getFileIcon(fileType)}
      <span className="text-gray-700 max-w-32 truncate">
        {getSourcePrefix(fileType)}{fileName}
      </span>
      <button
        onClick={onRemove}
        className="ml-0.5 p-0.5 hover:bg-gray-500 hover:text-white rounded-md transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  );
}