import React from 'react';
import Icon from '../../../components/AppIcon';

const ThreatMetricsStrip = () => {
  const metrics = [
    {
      id: 'detection-rate',
      title: 'Threat Detection Rate',
      value: '94.7%',
      change: '+2.3%',
      trend: 'up',
      confidence: '95%',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      id: 'resolution-time',
      title: 'Mean Time to Resolution',
      value: '4.2h',
      change: '-18min',
      trend: 'down',
      confidence: '89%',
      icon: 'Clock',
      color: 'text-primary'
    },
    {
      id: 'false-positive',
      title: 'False Positive Ratio',
      value: '3.1%',
      change: '-0.8%',
      trend: 'down',
      confidence: '92%',
      icon: 'AlertTriangle',
      color: 'text-warning'
    },
    {
      id: 'attack-vectors',
      title: 'Active Attack Vectors',
      value: '127',
      change: '+12',
      trend: 'up',
      confidence: '97%',
      icon: 'Target',
      color: 'text-error'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-card border border-border rounded-lg p-6 elevation-1">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2 rounded-lg bg-muted/20 ${metric?.color}`}>
              <Icon name={metric?.icon} size={20} />
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium ${metric?.trend === 'up' ? 'text-success' : 'text-error'}`}>
                {metric?.change}
              </div>
              <div className="text-xs text-muted-foreground">vs last period</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{metric?.title}</h3>
            <div className="text-2xl font-bold text-foreground">{metric?.value}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Confidence: {metric?.confidence}
              </div>
              <div className={`flex items-center space-x-1 ${metric?.trend === 'up' ? 'text-success' : 'text-error'}`}>
                <Icon name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                <span className="text-xs font-medium">{metric?.trend === 'up' ? 'Rising' : 'Falling'}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreatMetricsStrip;