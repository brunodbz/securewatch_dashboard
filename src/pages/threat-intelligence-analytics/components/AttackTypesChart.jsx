import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttackTypesChart = () => {
  const [sortBy, setSortBy] = useState('count');
  const [showTrend, setShowTrend] = useState(true);

  const attackTypesData = [
    {
      name: 'Malware',
      count: 2847,
      trend: 12.3,
      severity: 'high',
      sources: ['Elastic', 'Trellix', 'Defender'],
      lastDetected: '2 min ago'
    },
    {
      name: 'Phishing',
      count: 1923,
      trend: -5.7,
      severity: 'medium',
      sources: ['Defender', 'Trellix'],
      lastDetected: '5 min ago'
    },
    {
      name: 'Ransomware',
      count: 789,
      trend: 23.1,
      severity: 'critical',
      sources: ['Trellix', 'Elastic'],
      lastDetected: '1 min ago'
    },
    {
      name: 'APT Activity',
      count: 567,
      trend: 8.9,
      severity: 'high',
      sources: ['Tenable', 'Elastic'],
      lastDetected: '12 min ago'
    },
    {
      name: 'DDoS',
      count: 345,
      trend: -15.2,
      severity: 'medium',
      sources: ['Elastic'],
      lastDetected: '8 min ago'
    },
    {
      name: 'Insider Threat',
      count: 234,
      trend: 4.6,
      severity: 'high',
      sources: ['Defender', 'Tenable'],
      lastDetected: '15 min ago'
    },
    {
      name: 'Vulnerability Exploit',
      count: 156,
      trend: 18.7,
      severity: 'medium',
      sources: ['Tenable'],
      lastDetected: '3 min ago'
    },
    {
      name: 'Social Engineering',
      count: 89,
      trend: -2.1,
      severity: 'low',
      sources: ['Defender'],
      lastDetected: '22 min ago'
    }
  ];

  const sortedData = [...attackTypesData]?.sort((a, b) => {
    if (sortBy === 'count') return b?.count - a?.count;
    if (sortBy === 'trend') return Math.abs(b?.trend) - Math.abs(a?.trend);
    if (sortBy === 'name') return a?.name?.localeCompare(b?.name);
    return 0;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#DC2626';
      case 'high': return '#EA580C';
      case 'medium': return '#F59E0B';
      case 'low': return '#059669';
      default: return '#4488FF';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = attackTypesData?.find(d => d?.name === label);
      return (
        <div className="bg-popover border border-border rounded-lg p-4 elevation-2">
          <div className="font-semibold text-popover-foreground mb-2">{label}</div>
          <div className="space-y-1 text-sm">
            <div className="text-muted-foreground">Count: <span className="font-medium text-popover-foreground">{data?.count}</span></div>
            <div className="text-muted-foreground">Trend: <span className={`font-medium ${data?.trend > 0 ? 'text-success' : 'text-error'}`}>
              {data?.trend > 0 ? '+' : ''}{data?.trend}%
            </span></div>
            <div className="text-muted-foreground">Severity: <span className="font-medium" style={{ color: getSeverityColor(data?.severity) }}>
              {data?.severity}
            </span></div>
            <div className="text-muted-foreground">Sources: <span className="font-medium text-popover-foreground">{data?.sources?.join(', ')}</span></div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Trending Attack Types</h3>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-1 bg-input border border-border rounded text-sm text-foreground"
          >
            <option value="count">Sort by Count</option>
            <option value="trend">Sort by Trend</option>
            <option value="name">Sort by Name</option>
          </select>
          <Button
            variant={showTrend ? 'default' : 'outline'}
            size="sm"
            iconName="TrendingUp"
            onClick={() => setShowTrend(!showTrend)}
          >
            Trends
          </Button>
        </div>
      </div>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {sortedData?.slice(0, 5)?.map((attack, index) => (
          <div key={attack?.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-primary/20 text-primary text-xs font-bold">
                {index + 1}
              </div>
              <div>
                <div className="font-medium text-foreground">{attack?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {attack?.sources?.length} source{attack?.sources?.length !== 1 ? 's' : ''} • Last: {attack?.lastDetected}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="font-bold text-foreground">{attack?.count?.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">events</div>
              </div>
              
              {showTrend && (
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={attack?.trend > 0 ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className={attack?.trend > 0 ? 'text-success' : 'text-error'} 
                  />
                  <span className={`text-sm font-medium ${attack?.trend > 0 ? 'text-success' : 'text-error'}`}>
                    {Math.abs(attack?.trend)}%
                  </span>
                </div>
              )}
              
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getSeverityColor(attack?.severity) }}
                title={`${attack?.severity} severity`}
              ></div>
              
              <Button variant="ghost" size="sm" iconName="ExternalLink">
                Drill Down
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-muted-foreground">
        Showing top {Math.min(5, sortedData?.length)} attack types • Data refreshed every 5 minutes
      </div>
    </div>
  );
};

export default AttackTypesChart;