"use client";

import { useState } from "react";

interface Document {
  id: string;
  title: string;
  notes: string;
}

interface DocumentSelectionTableProps {
  documents?: Document[];
  onSelectionChange: (selectedDocuments: Document[]) => void;
  onProceed: (selectedDocuments: Document[]) => void;
}

const HARDCODED_DOCUMENTS: Document[] = [
  {
    id: "1",
    title: "Activision Agreement.pdf",
    notes: "This agreement meets the criteria"
  },
  {
    id: "2", 
    title: "Acme Agreement.pdf",
    notes: "This agreement meets the criteria"
  },
  {
    id: "3",
    title: "Metlife Agreement.pdf", 
    notes: "This agreement meets the criteria"
  },
  {
    id: "4",
    title: "Hooli Agreement.pdf",
    notes: "This agreement meets the criteria"
  }
];

export default function DocumentSelectionTable({ 
  documents = HARDCODED_DOCUMENTS,
  onSelectionChange,
  onProceed
}: DocumentSelectionTableProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(
    new Set(documents.map(doc => doc.id)) // All selected by default
  );

  const toggleDocumentSelection = (docId: string) => {
    const newSelected = new Set(selectedDocuments);
    if (newSelected.has(docId)) {
      newSelected.delete(docId);
    } else {
      newSelected.add(docId);
    }
    
    setSelectedDocuments(newSelected);
    
    // Notify parent component of selection changes
    const selectedDocs = documents.filter(doc => newSelected.has(doc.id));
    onSelectionChange(selectedDocs);
  };

  const toggleSelectAll = () => {
    const allSelected = selectedDocuments.size === documents.length;
    const newSelected = allSelected ? new Set<string>() : new Set(documents.map(doc => doc.id));
    
    setSelectedDocuments(newSelected);
    
    // Notify parent component
    const selectedDocs = documents.filter(doc => newSelected.has(doc.id));
    onSelectionChange(selectedDocs);
  };

  const allSelected = selectedDocuments.size === documents.length;
  const someSelected = selectedDocuments.size > 0 && selectedDocuments.size < documents.length;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden" style={{ maxWidth: '740px' }}>
      <div className="p-4 border-b border-neutral-200">
        <h3 className="text-sm font-medium text-neutral-900">Select sources to include</h3>
        <p className="text-xs text-neutral-600 mt-1">
          {selectedDocuments.size} of {documents.length} sources selected
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-2 focus:ring-neutral-200"
                />
              </th>
              <th className="p-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                Document title
              </th>
              <th className="p-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {documents.map((document) => (
              <tr 
                key={document.id}
                className="hover:bg-neutral-50 transition-colors"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.has(document.id)}
                    onChange={() => toggleDocumentSelection(document.id)}
                    className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-2 focus:ring-neutral-200"
                  />
                </td>
                <td className="p-3">
                  <div className="text-sm text-neutral-900 font-medium">
                    {document.title}
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-neutral-600">
                    {document.notes}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-neutral-50 border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-600">
            Selected sources will be used as precedent for drafting
          </p>
          <button
            onClick={() => {
              const selectedDocs = documents.filter(doc => selectedDocuments.has(doc.id));
              onProceed(selectedDocs);
            }}
            disabled={selectedDocuments.size === 0}
            className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to next step
          </button>
        </div>
      </div>
    </div>
  );
}