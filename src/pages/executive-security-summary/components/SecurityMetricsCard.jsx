import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityMetricsCard = ({ title, value, change, changeType, icon, color = 'blue' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-success/10 text-success border-success/20';
      case 'red':
        return 'bg-error/10 text-error border-error/20';
      case 'yellow':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'blue':
      default:
        return 'bg-primary/10 text-primary border-primary/20';
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
        <div className={`p-3 rounded-lg border ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default SecurityMetricsCard;