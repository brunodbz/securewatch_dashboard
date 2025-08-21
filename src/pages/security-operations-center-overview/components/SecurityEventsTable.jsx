import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SecurityEventsTable = ({ dataSources, severityFilter }) => {
  const [activeTab, setActiveTab] = useState('elastic');
  const [events, setEvents] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [selectedEvents, setSelectedEvents] = useState([]);

  const tabs = [
    { key: 'elastic', label: 'Elastic', icon: 'Database', color: 'text-primary' },
    { key: 'trellix', label: 'Trellix', icon: 'Shield', color: 'text-warning' },
    { key: 'defender', label: 'Defender', icon: 'Lock', color: 'text-success' },
    { key: 'tenable', label: 'Tenable', icon: 'Search', color: 'text-error' }
  ];

  const generateMockEvents = (source) => {
    const eventTypes = {
      elastic: ['Log Analysis Alert', 'Anomaly Detection', 'Search Query Alert', 'Index Monitoring'],
      trellix: ['Malware Detection', 'Network Intrusion', 'Email Security', 'Endpoint Protection'],
      defender: ['ATP Alert', 'Identity Protection', 'Cloud Security', 'Device Compliance'],
      tenable: ['Vulnerability Scan', 'Asset Discovery', 'Compliance Check', 'Risk Assessment']
    };

    const severities = ['critical', 'high', 'medium', 'low'];
    const statuses = ['open', 'investigating', 'resolved', 'false_positive'];
    const analysts = ['Sarah Chen', 'Mike Rodriguez', 'Alex Thompson', 'Lisa Park', 'David Kim'];

    return Array.from({ length: 10 }, (_, i) => ({
      id: `${source}-${Date.now()}-${i}`,
      eventType: eventTypes?.[source]?.[Math.floor(Math.random() * eventTypes?.[source]?.length)],
      severity: severities?.[Math.floor(Math.random() * severities?.length)],
      status: statuses?.[Math.floor(Math.random() * statuses?.length)],
      source: source,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Last 7 days
      affectedAssets: Math.floor(Math.random() * 10) + 1,
      assignedTo: Math.random() > 0.3 ? analysts?.[Math.floor(Math.random() * analysts?.length)] : null,
      description: `Security event detected requiring immediate attention and investigation by security team.`,
      riskScore: Math.floor(Math.random() * 100) + 1
    }));
  };

  useEffect(() => {
    const newEvents = {};
    tabs?.forEach(tab => {
      newEvents[tab.key] = generateMockEvents(tab?.key);
    });
    setEvents(newEvents);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-error bg-error/10';
      case 'investigating': return 'text-warning bg-warning/10';
      case 'resolved': return 'text-success bg-success/10';
      case 'false_positive': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on events:`, selectedEvents);
    setSelectedEvents([]);
  };

  const currentEvents = events?.[activeTab] || [];
  const filteredEvents = currentEvents?.filter(event => severityFilter === 'all' || event?.severity === severityFilter)?.sort((a, b) => {
      if (sortConfig?.direction === 'asc') {
        return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
      }
      return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
    });

  const bulkActionOptions = [
    { value: '', label: 'Bulk Actions' },
    { value: 'assign', label: 'Assign to Analyst' },
    { value: 'escalate', label: 'Escalate Priority' },
    { value: 'resolve', label: 'Mark as Resolved' },
    { value: 'export', label: 'Export Selected' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Top 10 Security Events</h2>
          <div className="flex items-center space-x-2">
            {selectedEvents?.length > 0 && (
              <>
                <Select
                  options={bulkActionOptions}
                  value=""
                  onChange={(value) => value && handleBulkAction(value)}
                  className="w-40"
                />
                <span className="text-sm text-muted-foreground">
                  {selectedEvents?.length} selected
                </span>
              </>
            )}
            <Button variant="outline" size="sm" iconName="Download">
              Export All
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs?.map(tab => (
            <button
              key={tab?.key}
              onClick={() => setActiveTab(tab?.key)}
              disabled={!dataSources?.[tab?.key]}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${activeTab === tab?.key 
                  ? 'bg-background text-foreground elevation-1' 
                  : 'text-muted-foreground hover:text-foreground'
                }
                ${!dataSources?.[tab?.key] ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <Icon name={tab?.icon} size={16} className={activeTab === tab?.key ? tab?.color : ''} />
              <span>{tab?.label}</span>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                {currentEvents?.length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedEvents?.length === filteredEvents?.length && filteredEvents?.length > 0}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setSelectedEvents(filteredEvents?.map(event => event?.id));
                    } else {
                      setSelectedEvents([]);
                    }
                  }}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'eventType', label: 'Event Type' },
                { key: 'severity', label: 'Severity' },
                { key: 'status', label: 'Status' },
                { key: 'timestamp', label: 'Timestamp' },
                { key: 'affectedAssets', label: 'Assets' },
                { key: 'assignedTo', label: 'Assigned To' },
                { key: 'riskScore', label: 'Risk Score' }
              ]?.map(column => (
                <th
                  key={column?.key}
                  className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort(column?.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column?.label}</span>
                    <Icon 
                      name={sortConfig?.key === column?.key 
                        ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown')
                        : 'ChevronsUpDown'
                      } 
                      size={14} 
                    />
                  </div>
                </th>
              ))}
              <th className="w-24 p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents?.map((event, index) => (
              <tr 
                key={event?.id} 
                className={`
                  border-b border-border hover:bg-muted/30 transition-colors
                  ${selectedEvents?.includes(event?.id) ? 'bg-primary/5' : ''}
                `}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedEvents?.includes(event?.id)}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        setSelectedEvents(prev => [...prev, event?.id]);
                      } else {
                        setSelectedEvents(prev => prev?.filter(id => id !== event?.id));
                      }
                    }}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{event?.eventType}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {event?.description}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event?.severity)}`}>
                    {event?.severity?.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event?.status)}`}>
                    {event?.status?.replace('_', ' ')?.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  <div>{event?.timestamp?.toLocaleDateString()}</div>
                  <div className="text-xs">{event?.timestamp?.toLocaleTimeString()}</div>
                </td>
                <td className="p-4 text-sm text-foreground font-medium">
                  {event?.affectedAssets}
                </td>
                <td className="p-4 text-sm text-foreground">
                  {event?.assignedTo || (
                    <span className="text-muted-foreground italic">Unassigned</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      event?.riskScore >= 80 ? 'bg-error' :
                      event?.riskScore >= 60 ? 'bg-warning' :
                      event?.riskScore >= 40 ? 'bg-yellow-500' : 'bg-success'
                    }`} />
                    <span className="text-sm font-medium">{event?.riskScore}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye" className="h-8 w-8 p-0" />
                    <Button variant="ghost" size="sm" iconName="Edit" className="h-8 w-8 p-0" />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" className="h-8 w-8 p-0" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEvents?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No events found matching current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityEventsTable;