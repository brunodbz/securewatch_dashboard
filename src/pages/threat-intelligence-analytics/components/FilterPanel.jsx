import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '7d',
    threatTypes: [],
    geography: 'all',
    comparisonMode: 'period'
  });

  const dateRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const threatTypeOptions = [
    { value: 'malware', label: 'Malware' },
    { value: 'phishing', label: 'Phishing' },
    { value: 'ransomware', label: 'Ransomware' },
    { value: 'apt', label: 'APT Activity' },
    { value: 'ddos', label: 'DDoS Attacks' },
    { value: 'insider', label: 'Insider Threats' },
    { value: 'vulnerability', label: 'Vulnerability Exploits' },
    { value: 'social-engineering', label: 'Social Engineering' }
  ];

  const geographyOptions = [
    { value: 'all', label: 'Global' },
    { value: 'na', label: 'North America' },
    { value: 'eu', label: 'Europe' },
    { value: 'apac', label: 'Asia Pacific' },
    { value: 'sa', label: 'South America' },
    { value: 'africa', label: 'Africa' },
    { value: 'me', label: 'Middle East' }
  ];

  const comparisonModeOptions = [
    { value: 'period', label: 'Period-over-Period' },
    { value: 'source', label: 'Source-over-Source' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '7d',
      threatTypes: [],
      geography: 'all',
      comparisonMode: 'period'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg mb-6 elevation-1">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />

            <Select
              label="Threat Types"
              options={threatTypeOptions}
              value={filters?.threatTypes}
              onChange={(value) => handleFilterChange('threatTypes', value)}
              multiple
              searchable
              placeholder="Select threat types..."
            />

            <Select
              label="Geographic Region"
              options={geographyOptions}
              value={filters?.geography}
              onChange={(value) => handleFilterChange('geography', value)}
            />

            <Select
              label="Comparison Mode"
              options={comparisonModeOptions}
              value={filters?.comparisonMode}
              onChange={(value) => handleFilterChange('comparisonMode', value)}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Filters applied: {Object.values(filters)?.filter(v => Array.isArray(v) ? v?.length > 0 : v !== 'all' && v !== '7d' && v !== 'period')?.length}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Download">
                Export Filters
              </Button>
              <Button variant="default" size="sm" iconName="Search">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;