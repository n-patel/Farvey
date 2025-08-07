"use client";

import { useState } from "react";
import DocumentChip from "./document-chip";

interface LeaseProvision {
  id: string;
  topic: string;
  notes: string;
  exampleSources: string[];
}

interface LeaseProvisionsTableProps {
  onProceed: (selectedProvisions: LeaseProvision[]) => void;
}

const LEASE_PROVISIONS: LeaseProvision[] = [
  {
    id: "1",
    topic: "Reduced Penalty Model",
    notes: "12-month notice, 6 months' base rent penalty, available after Year 2",
    exampleSources: ["Series B Startup Lease.pdf", "TechCorp Agreement.pdf"]
  },
  {
    id: "2",
    topic: "Sliding Scale Penalties",
    notes: "9-month notice, penalties decrease over lease term (12mo→6mo→3mo)",
    exampleSources: ["WeWork Sublease.pdf", "Flexible Office Lease.pdf"]
  },
  {
    id: "3",
    topic: "Business Justification",
    notes: "6-month notice, 3 months' rent penalty, must demonstrate 50%+ downsizing",
    exampleSources: ["Fintech Headquarters.pdf", "Startup Campus Lease.pdf"]
  },
  {
    id: "4",
    topic: "Expansion/Contraction Triggers",
    notes: "90-day notice, no penalty if expanding >50% or shrinking >30%",
    exampleSources: ["Scaling SaaS Lease.pdf", "Growth Company Agreement.pdf"]
  },
  {
    id: "5",
    topic: "Acquisition/Funding Triggers",
    notes: "30-day notice, 1 month penalty upon M&A or major funding round",
    exampleSources: ["Unicorn Startup Lease.pdf", "Series C Company.pdf"]
  },
  {
    id: "6",
    topic: "Market Standard Plus",
    notes: "12-month notice, 9 months' rent penalty, available after Year 1",
    exampleSources: ["Spotify Lease.pdf", "Mid-Market Tech.pdf"]
  }
];

export default function LeaseProvisionsTable({ onProceed }: LeaseProvisionsTableProps) {
  const [selectedProvisions, setSelectedProvisions] = useState<Set<string>>(
    new Set(LEASE_PROVISIONS.map(provision => provision.id)) // All selected by default
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
    const allSelected = selectedProvisions.size === LEASE_PROVISIONS.length;
    const newSelected = allSelected ? new Set<string>() : new Set(LEASE_PROVISIONS.map(provision => provision.id));
    setSelectedProvisions(newSelected);
  };

  const allSelected = selectedProvisions.size === LEASE_PROVISIONS.length;
  const someSelected = selectedProvisions.size > 0 && selectedProvisions.size < LEASE_PROVISIONS.length;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden" style={{ maxWidth: '740px' }}>
      <div className="p-4 border-b border-neutral-200">
        <h3 className="text-sm font-medium text-neutral-900">Select lease provision approaches</h3>
        <p className="text-xs text-neutral-600 mt-1">
          {selectedProvisions.size} of {LEASE_PROVISIONS.length} approaches selected
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
                Topic
              </th>
              <th className="p-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                Notes
              </th>
              <th className="p-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                Example Source
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {LEASE_PROVISIONS.map((provision) => (
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
                  <div className="text-sm text-neutral-900 font-medium">
                    {provision.topic}
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-neutral-600">
                    {provision.notes}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {provision.exampleSources.map((source, index) => (
                      <DocumentChip key={index} filename={source} />
                    ))}
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
            Selected approaches will be used to draft the revised provision
          </p>
          <button
            onClick={() => {
              const selectedData = LEASE_PROVISIONS.filter(provision => selectedProvisions.has(provision.id));
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