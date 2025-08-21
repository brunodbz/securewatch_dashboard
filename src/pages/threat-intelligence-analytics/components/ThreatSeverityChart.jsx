import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatSeverityChart = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const severityData = [
    { name: 'Critical', value: 156, color: '#DC2626', percentage: 12.4 },
    { name: 'High', value: 342, color: '#EA580C', percentage: 27.2 },
    { name: 'Medium', value: 489, color: '#F59E0B', percentage: 38.9 },
    { name: 'Low', value: 267, color: '#059669', percentage: 21.2 },
    { name: 'Info', value: 3, color: '#4488FF', percentage: 0.3 }
  ];

  const totalThreats = severityData?.reduce((sum, item) => sum + item?.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <div className="font-semibold text-popover-foreground">{data?.name} Severity</div>
          <div className="text-sm text-muted-foreground">
            {data?.value} threats ({data?.percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="space-y-2">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-foreground">{entry?.value}</span>
            </div>
            <div className="text-sm font-medium text-foreground">
              {severityData?.find(d => d?.name === entry?.value)?.value || 0}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="PieChart" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Threat Severity Distribution</h3>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-1 bg-input border border-border rounded text-sm text-foreground"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24h</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {severityData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalThreats?.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Threats Detected</div>
          </div>

          <CustomLegend payload={severityData?.map(item => ({ value: item?.name, color: item?.color }))} />

          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-error">
                  {severityData?.filter(d => d?.name === 'Critical' || d?.name === 'High')?.reduce((sum, d) => sum + d?.value, 0)}
                </div>
                <div className="text-xs text-muted-foreground">High Priority</div>
              </div>
              <div>
                <div className="text-lg font-bold text-warning">
                  {severityData?.find(d => d?.name === 'Medium')?.value || 0}
                </div>
                <div className="text-xs text-muted-foreground">Medium Priority</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {severityData?.map((severity) => (
          <div key={severity?.name} className="p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: severity?.color }}
                ></div>
                <span className="text-sm font-medium text-foreground">{severity?.name}</span>
              </div>
              <Icon name="TrendingUp" size={12} className="text-muted-foreground" />
            </div>
            <div className="text-lg font-bold text-foreground">{severity?.value}</div>
            <div className="text-xs text-muted-foreground">{severity?.percentage}% of total</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-muted-foreground">
        Data updated every 5 minutes • Click segments for detailed breakdown
      </div>
    </div>
  );
};

export default ThreatSeverityChart;