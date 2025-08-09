"use client";

import { useState } from "react";
import DocumentChip from "./document-chip";

interface SubleasingProvision {
  id: string;
  agreement: string;
  notes: string;
}

interface SubleasingProvisionsTableProps {
  onProceed: (selectedProvisions: SubleasingProvision[]) => void;
}

const SUBLEASING_PROVISIONS: SubleasingProvision[] = [
  {
    id: "1",
    agreement: "Spotify Commercial Lease 2023.pdf",
    notes: "Requires landlord's prior written consent, not to be unreasonably withheld or delayed. Tenant may sublease up to 50% of premises without consent if subtenant is in same industry."
  },
  {
    id: "2",
    agreement: "Airbnb Headquarters Lease 2022.pdf",
    notes: "Broad subleasing rights with minimal restrictions. Landlord consent required only for subleases exceeding 75% of total space. Tenant retains primary liability but may collect profits from subletting."
  },
  {
    id: "3",
    agreement: "Slack Office Lease 2024.pdf",
    notes: "Conditional subleasing allowed for 'Permitted Transferees' (affiliates, subsidiaries). All other subleases require landlord approval and cannot exceed 25% of leased premises without additional security deposit."
  },
  {
    id: "4",
    agreement: "Zoom Corporate Lease 2023.pdf",
    notes: "Standard landlord approval required for all subleases. Includes assignment and subletting profit-sharing clause - landlord receives 50% of excess rent above base rent from any sublease arrangement."
  }
];

export default function SubleasingProvisionsTable({ onProceed }: SubleasingProvisionsTableProps) {
  const [selectedProvisions, setSelectedProvisions] = useState<Set<string>>(
    new Set(SUBLEASING_PROVISIONS.map(provision => provision.id)) // All selected by default
  );

  const toggleProvisionSelection = (provisionId: string) => {
    const newSelected = new Set(selectedProvisions);
    if (newSelected.has(provisionId)) {
      newSelected.delete(provisionId);
    } else {
      newSelected.add(provisionId);
    }
    setSelectedProvisions(newSelected);
  };

  const toggleSelectAll = () => {
    const allSelected = selectedProvisions.size === SUBLEASING_PROVISIONS.length;
    const newSelected = allSelected ? new Set<string>() : new Set(SUBLEASING_PROVISIONS.map(provision => provision.id));
    setSelectedProvisions(newSelected);
  };

  const allSelected = selectedProvisions.size === SUBLEASING_PROVISIONS.length;
  const someSelected = selectedProvisions.size > 0 && selectedProvisions.size < SUBLEASING_PROVISIONS.length;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden" style={{ maxWidth: '740px' }}>
      <div className="p-4 border-b border-neutral-200">
        <h3 className="text-sm font-medium text-neutral-900">Select subleasing approaches</h3>
        <p className="text-xs text-neutral-600 mt-1">
          {selectedProvisions.size} of {SUBLEASING_PROVISIONS.length} approaches selected
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
                Agreement
              </th>
              <th className="p-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {SUBLEASING_PROVISIONS.map((provision) => (
              <tr 
                key={provision.id}
                className="hover:bg-neutral-50 transition-colors"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedProvisions.has(provision.id)}
                    onChange={() => toggleProvisionSelection(provision.id)}
                    className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-2 focus:ring-neutral-200"
                  />
                </td>
                <td className="p-3">
                  <DocumentChip filename={provision.agreement} />
                </td>
                <td className="p-3">
                  <div className="text-sm text-neutral-600">
                    {provision.notes}
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
            Selected approaches will be used to draft the subleasing provision
          </p>
          <button
            onClick={() => {
              const selectedData = SUBLEASING_PROVISIONS.filter(provision => selectedProvisions.has(provision.id));
              onProceed(selectedData);
            }}
            disabled={selectedProvisions.size === 0}
            className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Revise using selected
          </button>
        </div>
      </div>
    </div>
  );
}