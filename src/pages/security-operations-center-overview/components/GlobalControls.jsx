import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const GlobalControls = ({ 
  timeRange, 
  setTimeRange, 
  severityFilter, 
  setSeverityFilter, 
  dataSources, 
  setDataSources,
  connectionStatus 
}) => {
  const timeRangeOptions = [
    { value: '1h', label: 'Last 1 hour' },
    { value: '6h', label: 'Last 6 hours' },
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const dataSourceList = [
    { key: 'elastic', label: 'Elastic', color: 'bg-primary' },
    { key: 'trellix', label: 'Trellix', color: 'bg-warning' },
    { key: 'defender', label: 'Defender', color: 'bg-success' },
    { key: 'tenable', label: 'Tenable', color: 'bg-error' }
  ];

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const toggleDataSource = (sourceKey) => {
    setDataSources(prev => ({
      ...prev,
      [sourceKey]: !prev?.[sourceKey]
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Time and Severity Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-40"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <Select
              options={severityOptions}
              value={severityFilter}
              onChange={setSeverityFilter}
              className="w-40"
            />
          </div>
        </div>

        {/* Center Section - Data Source Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Sources:</span>
          {dataSourceList?.map((source) => (
            <Button
              key={source?.key}
              variant={dataSources?.[source?.key] ? "default" : "outline"}
              size="sm"
              onClick={() => toggleDataSource(source?.key)}
              className="relative"
            >
              <div className={`w-2 h-2 rounded-full ${source?.color} mr-2`} />
              {source?.label}
              {dataSources?.[source?.key] && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full" />
              )}
            </Button>
          ))}
        </div>

        {/* Right Section - Connection Status and Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon 
              name="Wifi" 
              size={16} 
              className={`${getConnectionStatusColor()} ${connectionStatus === 'connected' ? 'animate-pulse' : ''}`}
            />
            <span className={`text-sm font-medium ${getConnectionStatusColor()}`}>
              {connectionStatus === 'connected' ? 'Live' : 
               connectionStatus === 'warning' ? 'Unstable' : 'Offline'}
            </span>
          </div>
          
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;