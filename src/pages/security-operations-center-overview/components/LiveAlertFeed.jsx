import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveAlertFeed = ({ severityFilter, dataSources }) => {
  const [alerts, setAlerts] = useState([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const feedRef = useRef(null);

  const severityColors = {
    critical: 'text-error bg-error/10 border-error/20',
    high: 'text-warning bg-warning/10 border-warning/20',
    medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    low: 'text-success bg-success/10 border-success/20'
  };

  const sourceIcons = {
    elastic: 'Database',
    trellix: 'Shield',
    defender: 'Lock',
    tenable: 'Search'
  };

  const generateMockAlert = () => {
    const severities = ['critical', 'high', 'medium', 'low'];
    const sources = ['elastic', 'trellix', 'defender', 'tenable'];
    const alertTypes = [
      'Malware Detection',
      'Suspicious Network Activity',
      'Failed Authentication',
      'Privilege Escalation',
      'Data Exfiltration',
      'Brute Force Attack',
      'SQL Injection Attempt',
      'Phishing Email Detected',
      'Unauthorized Access',
      'System Vulnerability'
    ];

    const hostnames = [
      'web-server-01.corp.local',
      'db-primary.internal',
      'mail-gateway.company.com',
      'workstation-045.domain.local',
      'firewall-edge.network',
      'dc-controller.ad.local'
    ];

    const severity = severities?.[Math.floor(Math.random() * severities?.length)];
    const source = sources?.[Math.floor(Math.random() * sources?.length)];
    
    return {
      id: Date.now() + Math.random(),
      severity,
      source,
      type: alertTypes?.[Math.floor(Math.random() * alertTypes?.length)],
      hostname: hostnames?.[Math.floor(Math.random() * hostnames?.length)],
      timestamp: new Date(),
      description: `Detected suspicious activity on ${hostnames?.[Math.floor(Math.random() * hostnames?.length)]}. Immediate investigation required.`,
      isNew: true
    };
  };

  // Initialize with mock alerts
  useEffect(() => {
    const initialAlerts = Array.from({ length: 15 }, () => ({
      ...generateMockAlert(),
      isNew: false,
      timestamp: new Date(Date.now() - Math.random() * 3600000) // Random time within last hour
    }))?.sort((a, b) => b?.timestamp - a?.timestamp);

    setAlerts(initialAlerts);
  }, []);

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = generateMockAlert();
      
      setAlerts(prev => {
        const updated = [newAlert, ...prev?.slice(0, 49)]; // Keep only 50 alerts
        return updated?.map((alert, index) => ({
          ...alert,
          isNew: index === 0 ? true : false
        }));
      });
    }, Math.random() * 10000 + 5000); // Random interval between 5-15 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to top when new alerts arrive
  useEffect(() => {
    if (isAutoScroll && feedRef?.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [alerts, isAutoScroll]);

  // Remove "new" status after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts(prev => prev?.map(alert => ({ ...alert, isNew: false })));
    }, 5000);

    return () => clearTimeout(timer);
  }, [alerts]);

  const handleScroll = () => {
    if (feedRef?.current) {
      const { scrollTop } = feedRef?.current;
      setIsAutoScroll(scrollTop < 50);
    }
  };

  const filteredAlerts = alerts?.filter(alert => {
    if (severityFilter !== 'all' && alert?.severity !== severityFilter) return false;
    if (!dataSources?.[alert?.source]) return false;
    return true;
  });

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-1 h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={18} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Live Alert Feed</h3>
            <div className="flex items-center space-x-1 text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs font-medium">Live</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName={isAutoScroll ? "Pause" : "Play"}
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className="text-xs"
          >
            {isAutoScroll ? 'Pause' : 'Resume'}
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredAlerts?.length} active alerts • Auto-refresh every 5-15s
        </div>
      </div>
      <div 
        ref={feedRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        onScroll={handleScroll}
        style={{ maxHeight: '600px' }}
      >
        {filteredAlerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-2" />
            <p className="text-muted-foreground">No alerts matching current filters</p>
          </div>
        ) : (
          filteredAlerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`
                border rounded-lg p-3 transition-all duration-300 cursor-pointer hover:elevation-1
                ${alert?.isNew ? 'ring-2 ring-primary/50 bg-primary/5' : 'bg-card'}
                ${severityColors?.[alert?.severity]}
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getSeverityIcon(alert?.severity)} 
                    size={16} 
                    className={alert?.severity === 'critical' ? 'text-error' : 
                              alert?.severity === 'high' ? 'text-warning' :
                              alert?.severity === 'medium' ? 'text-yellow-500' : 'text-success'}
                  />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {alert?.severity}
                  </span>
                  {alert?.isNew && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={sourceIcons?.[alert?.source]} 
                    size={14} 
                    className="text-muted-foreground" 
                  />
                  <span className="text-xs text-muted-foreground capitalize">
                    {alert?.source}
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {alert?.type}
                </h4>
                <p className="text-xs text-muted-foreground mb-1">
                  Host: {alert?.hostname}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {alert?.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {alert?.timestamp?.toLocaleTimeString()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  className="text-xs h-6 px-2"
                >
                  Investigate
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      {!isAutoScroll && (
        <div className="p-2 border-t border-border bg-muted/50">
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowUp"
            onClick={() => {
              feedRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
              setIsAutoScroll(true);
            }}
            className="w-full text-xs"
          >
            Scroll to Latest Alerts
          </Button>
        </div>
      )}
    </div>
  );
};

export default LiveAlertFeed;