import React from 'react';
import { FilterType } from '../types/task';

interface FilterTabsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: { all: number; active: number; completed: number };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ filter, onFilterChange, counts }) => {
  const tabs: { label: string; value: FilterType; count: number }[] = [
    { label: 'All', value: 'all', count: counts.all },
    { label: 'Active', value: 'active', count: counts.active },
    { label: 'Completed', value: 'completed', count: counts.completed }
  ];

  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          className={`px-4 py-2 font-medium transition-colors relative ${
            filter === tab.value
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {tab.label}
          <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};