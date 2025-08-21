import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExportControls = ({ onExport, onTimeRangeChange, onDepartmentChange }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const timeRanges = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'it', label: 'IT Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'sales', label: 'Sales & Marketing' },
    { value: 'operations', label: 'Operations' }
  ];

  const exportFormats = [
    { format: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { format: 'png', label: 'PNG Image', icon: 'Image' }
  ];

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
    onTimeRangeChange?.(value);
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    onDepartmentChange?.(value);
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExport?.(format, selectedTimeRange, selectedDepartment);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Time Range Selector */}
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Period:</span>
          <div className="flex bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => handleTimeRangeChange(range?.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                  selectedTimeRange === range?.value
                    ? 'bg-primary text-primary-foreground elevation-1'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Department Selector */}
        <div className="flex items-center space-x-2">
          <Icon name="Building" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Department:</span>
          <select
            value={selectedDepartment}
            onChange={(e) => handleDepartmentChange(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {departments?.map((dept) => (
              <option key={dept?.value} value={dept?.value}>
                {dept?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Export Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Export:</span>
          <div className="flex space-x-2">
            {exportFormats?.map((format) => (
              <Button
                key={format?.format}
                variant="outline"
                size="sm"
                iconName={format?.icon}
                iconPosition="left"
                onClick={() => handleExport(format?.format)}
                disabled={isExporting}
                loading={isExporting}
                className="text-xs"
              >
                {format?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">92%</p>
            <p className="text-xs text-muted-foreground">Overall Score</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success">15</p>
            <p className="text-xs text-muted-foreground">Resolved Issues</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-warning">3</p>
            <p className="text-xs text-muted-foreground">Active Incidents</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">98%</p>
            <p className="text-xs text-muted-foreground">Compliance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;