import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskHeatMap = ({ data, title }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const getRiskLabel = (level) => {
    switch (level) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Risk levels across business units
        </p>
      </div>
      <div className="space-y-3">
        {data?.map((unit, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Building" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{unit?.department}</p>
                <p className="text-xs text-muted-foreground">{unit?.assets} assets</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${getRiskColor(unit?.riskLevel)}`}>
                <Icon name={getRiskIcon(unit?.riskLevel)} size={12} />
                <span>{getRiskLabel(unit?.riskLevel)}</span>
              </div>
              <span className="text-xs text-muted-foreground">{unit?.score}/100</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{data?.filter(d => d?.riskLevel === 'critical' || d?.riskLevel === 'high')?.length}</p>
            <p className="text-xs text-muted-foreground">High Risk Units</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{data?.filter(d => d?.riskLevel === 'low')?.length}</p>
            <p className="text-xs text-muted-foreground">Low Risk Units</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskHeatMap;