import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const ComplianceDashboard = ({ data, title }) => {
  const COLORS = {
    compliant: 'var(--color-success)',
    'non-compliant': 'var(--color-error)',
    'in-progress': 'var(--color-warning)',
    'not-applicable': 'var(--color-muted)'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-popover-foreground">{data?.name}</p>
          <p className="text-sm text-popover-foreground">{data?.value}% ({data?.count} controls)</p>
        </div>
      );
    }
    return null;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return 'CheckCircle';
      case 'non-compliant':
        return 'XCircle';
      case 'in-progress':
        return 'Clock';
      case 'not-applicable':
        return 'Minus';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'text-success';
      case 'non-compliant':
        return 'text-error';
      case 'in-progress':
        return 'text-warning';
      case 'not-applicable':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const totalCompliant = data?.find(d => d?.name === 'Compliant')?.value || 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Regulatory compliance status
        </p>
      </div>
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[entry?.status]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{totalCompliant}%</p>
              <p className="text-xs text-muted-foreground">Compliant</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(item?.status)} 
                size={16} 
                className={getStatusColor(item?.status)} 
              />
              <span className="text-sm text-foreground capitalize">{item?.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{item?.value}%</p>
              <p className="text-xs text-muted-foreground">{item?.count} controls</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Updated:</span>
          <span className="text-foreground font-medium">Aug 20, 2025 08:30 AM</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;