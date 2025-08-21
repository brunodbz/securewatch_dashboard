import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const SecurityTrendChart = ({ data, title }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-popover-foreground">
                {entry?.name}: {entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Security posture trends over the selected time period
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="period" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={75} stroke="var(--color-warning)" strokeDasharray="5 5" />
            <ReferenceLine y={90} stroke="var(--color-success)" strokeDasharray="5 5" />
            <Line 
              type="monotone" 
              dataKey="securityScore" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Security Score"
            />
            <Line 
              type="monotone" 
              dataKey="complianceScore" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
              name="Compliance Score"
            />
            <Line 
              type="monotone" 
              dataKey="incidentResponse" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 3 }}
              name="Response Time"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Security Score</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">Compliance</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">Response Time</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityTrendChart;