"use client";

import { X, FileText, Upload, Monitor, Folder, Globe } from "lucide-react";
import Image from "next/image";

interface SourceChipProps {
  source: string;
  sourceId: string;
  onRemove: (source: string) => void;
  className?: string;
}

export default function SourceChip({ source, sourceId, onRemove, className = "" }: SourceChipProps) {
  // Get appropriate icon based on sourceId - matching dropdown exactly
  const getSourceIcon = (id: string) => {
    switch (id) {
      case 'edgar':
        return <Image src="/EDGAR.svg" width={14} height={14} alt="EDGAR" />;
      case 'eur-lex':
        return <Image src="/globe.svg" width={14} height={14} alt="EUR-Lex" />;
      case 'sweden':
        return <span className="text-sm">🇸🇪</span>;
      case 'singapore':
        return <span className="text-sm">🇸🇬</span>;
      case 'lexisnexis':
        return <Image src="/lexis.svg" width={14} height={14} alt="LexisNexis" />;
      case 'web-search':
        return <Globe size={14} />;
      case 'upload-files':
        return <Upload size={14} />;
      case 'sharepoint':
        return <Monitor size={14} />;
      case 'imanage':
      case 'imanage-deep-research':
        return <Image src="/imanage.svg" width={14} height={14} alt="iManage" />;
      case 'vault':
        return <Folder size={14} />;
      default:
        return <FileText size={14} />;
    }
  };

  // Get display name for the source
  const getDisplayName = (sourceName: string, id: string) => {
    // If it's a file upload source, show a more user-friendly name
    switch (id) {
      case 'upload-files':
        return 'Files';
      case 'sharepoint':
        return 'SharePoint';
      case 'imanage':
        return 'iManage';
      case 'imanage-deep-research':
        return 'iManage Search';
      case 'vault':
        return 'Vault';
      case 'web-search':
        return 'Web Search';
      case 'edgar':
        return 'EDGAR';
      case 'eur-lex':
        return 'EUR-Lex';
      case 'sweden':
        return 'Sweden';
      case 'singapore':
        return 'Singapore';
      case 'lexisnexis':
        return 'LexisNexis';
      default:
        return sourceName;
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 pl-2 pr-1 py-1.5 bg-white border border-[#E7E6EA] rounded-lg text-sm font-medium text-neutral-800 hover:border-neutral-300 transition-colors ${className}`}>
      {getSourceIcon(sourceId)}
      <span className="text-neutral-800">{getDisplayName(source, sourceId)}</span>
      <button
        onClick={() => onRemove(source)}
        className="ml-0.5 p-0.5 hover:bg-neutral-600 hover:text-white rounded-md transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  );
}