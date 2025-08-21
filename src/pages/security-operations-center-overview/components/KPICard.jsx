import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, status, sparklineData }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-muted ${getStatusColor()}`}>
            <Icon name={icon} size={20} />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={14} />
          <span className="text-xs font-medium">{change}</span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
          <div className="text-xs text-muted-foreground">Last updated: 2 min ago</div>
        </div>
        
        {sparklineData && (
          <div className="w-16 h-8">
            <svg width="64" height="32" className="overflow-visible">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={getStatusColor()}
                points={sparklineData?.map((point, index) => 
                  `${(index / (sparklineData?.length - 1)) * 60},${32 - (point / Math.max(...sparklineData)) * 28}`
                )?.join(' ')}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;