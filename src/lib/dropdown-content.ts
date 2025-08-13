export interface DropdownItemInfo {
  title: string;
  description: string;
  isCompatibleWithDR: boolean;
  isCompatibleWithoutDR: boolean;
}

export const dropdownItemsInfo: Record<string, DropdownItemInfo> = {
  'upload-files': {
    title: 'Upload Files',
    description: 'Select individual files to upload to Harvey.\n\n**Accepted file types:** PDF, Word, Text, Excel\n**Maximum file size:** 100MB\n**File limit:** Up to 50 files',
    isCompatibleWithDR: false,
    isCompatibleWithoutDR: true
  },
  'sharepoint': {
    title: 'Upload from SharePoint',
    description: 'Select individual files from your SharePoint document library to upload to Harvey.\n\n**Accepted file types:** PDF, Word, Text, Excel\n**Maximum file size:** 100MB\n**File limit:** Up to 50 files',
    isCompatibleWithDR: false,
    isCompatibleWithoutDR: true
  },
  'imanage': {
    title: 'Upload from iManage',
    description: 'Select individual files from your iManage document management system to upload to Harvey.\n\n**Accepted file types:** PDF, Word, Text, Excel\n**Maximum file size:** 100MB\n**File limit:** Up to 50 files',
    isCompatibleWithDR: false,
    isCompatibleWithoutDR: true
  },
  'imanage-deep-research': {
    title: 'Search across iManage (no upload required)',
    description: 'Search and analyze documents you have access to directly within iManage. No need to upload individual files—Harvey will run intelligent searches against your iManage repository to find the most relevant documents for your query.',
    isCompatibleWithDR: true,
    isCompatibleWithoutDR: false
  },
  'vault': {
    title: 'Add from Vault project',
    description: 'Select files from your Vault project repository.\n\n**Accepted file types:** PDF, Word, Text, Excel\n**Maximum file size:** 100MB\n**File limit:** Up to 10,000 files (significantly more than other sources)',
    isCompatibleWithDR: true,
    isCompatibleWithoutDR: true
  },
  'web-search': {
    title: 'Web Search',
    description: 'Search and analyze content from across the internet. Harvey will find relevant web pages, articles, and publicly available documents to support your research and analysis.',
    isCompatibleWithDR: true,
    isCompatibleWithoutDR: true
  },
  'edgar': {
    title: 'EDGAR',
    description: 'Search SEC filings from the EDGAR database.\n\n**Supported filings:** 8-Ks, 10-Ks\n**Update frequency:** Every 5 minutes',
    isCompatibleWithDR: false,
    isCompatibleWithoutDR: true
  },
  'eur-lex': {
    title: 'EUR-Lex',
    description: 'Search European Union legal documents, legislation, and case law from the official EUR-Lex database.\n\n**Content includes:** Treaties, directives, regulations, court decisions from EU institutions',
    isCompatibleWithDR: false,
    isCompatibleWithoutDR: true
  },
  'sweden': {
    title: 'Sweden',
    description: 'Search Swedish legal documents, legislation, and regulatory materials.\n\n**Content includes:** Laws, court decisions, official government publications from Swedish legal databases',
    isCompatibleWithDR: false,
    isCompatibleWithoutDR: true
  },
  'singapore': {
    title: 'Singapore',
    description: 'Search Singaporean legal documents, legislation, and regulatory materials.\n\n**Content includes:** Statutes, case law, official government publications from Singapore legal databases',
    isCompatibleWithDR: false,
    isCompatibleWithoutDR: true
  },
  'lexisnexis': {
    title: 'LexisNexis',
    description: 'Search comprehensive legal research database including case law, statutes, regulations, and legal commentary.\n\n**Access:** Millions of legal documents from jurisdictions worldwide',
    isCompatibleWithDR: false,
    isCompatibleWithoutDR: true
  }
};

export function getIncompatibilityMessage(isDeepResearchActive: boolean, itemInfo: DropdownItemInfo): string | undefined {
  if (isDeepResearchActive && !itemInfo.isCompatibleWithDR) {
    return 'Incompatible with Deep Research';
  }
  if (!isDeepResearchActive && !itemInfo.isCompatibleWithoutDR) {
    return 'Only compatible with Deep Research';
  }
  return undefined;
}