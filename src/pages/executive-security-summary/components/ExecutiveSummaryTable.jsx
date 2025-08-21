import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveSummaryTable = ({ data, title }) => {
  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'high':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'AlertCircle';
      case 'planned':
        return 'Calendar';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      case 'pending':
        return 'text-error';
      case 'planned':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Monthly security highlights and business impact assessments
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Category</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Description</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Impact</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Timeline</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{item?.category}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div>
                    <p className="text-sm text-foreground font-medium">{item?.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item?.description}</p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getImpactColor(item?.impact)}`}>
                    {item?.impact}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getStatusIcon(item?.status)} 
                      size={14} 
                      className={getStatusColor(item?.status)} 
                    />
                    <span className={`text-sm font-medium ${getStatusColor(item?.status)}`}>
                      {item?.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-muted-foreground">{item?.timeline}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {data?.filter(d => d?.status?.toLowerCase() === 'resolved')?.length}
            </p>
            <p className="text-xs text-muted-foreground">Resolved This Month</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">
              {data?.filter(d => d?.status?.toLowerCase() === 'in-progress')?.length}
            </p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">
              {data?.filter(d => d?.status?.toLowerCase() === 'planned')?.length}
            </p>
            <p className="text-xs text-muted-foreground">Planned</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummaryTable;