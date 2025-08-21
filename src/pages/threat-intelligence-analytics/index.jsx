import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ThreatMetricsStrip from './components/ThreatMetricsStrip';
import FilterPanel from './components/FilterPanel';
import CorrelationMatrix from './components/CorrelationMatrix';
import ThreatSeverityChart from './components/ThreatSeverityChart';
import AttackTypesChart from './components/AttackTypesChart';
import ThreatHuntingInterface from './components/ThreatHuntingInterface';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ThreatIntelligenceAnalytics = () => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filters, setFilters] = useState({});
  const [bookmarkedState, setBookmarkedState] = useState(null);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
      }, 15 * 60 * 1000); // 15 minutes

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleManualRefresh = () => {
    setLastRefresh(new Date());
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleBookmarkState = () => {
    const currentState = {
      filters,
      timestamp: new Date()?.toISOString(),
      url: window.location?.href
    };
    setBookmarkedState(currentState);
    console.log('Investigation state bookmarked:', currentState);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Threat Intelligence Analytics
              </h1>
              <p className="text-muted-foreground">
                Deep analytical capabilities for threat pattern analysis, correlation discovery, and incident investigation
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Last updated: {lastRefresh?.toLocaleTimeString()}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={autoRefresh ? 'default' : 'outline'}
                  size="sm"
                  iconName="RotateCcw"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  Auto Refresh
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={handleManualRefresh}
                >
                  Refresh
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bookmark"
                  onClick={handleBookmarkState}
                >
                  Bookmark State
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <FilterPanel onFiltersChange={handleFiltersChange} />

          {/* Primary Metrics Strip */}
          <ThreatMetricsStrip />

          {/* Main Analysis Area */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
            {/* Correlation Matrix - 8 columns on desktop */}
            <div className="xl:col-span-8">
              <CorrelationMatrix />
            </div>

            {/* Side Panel - 4 columns on desktop */}
            <div className="xl:col-span-4 space-y-6">
              <ThreatSeverityChart />
              <AttackTypesChart />
            </div>
          </div>

          {/* Threat Hunting Interface - Full Width */}
          <ThreatHuntingInterface />

          {/* Status Bar */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/20 rounded-lg border border-border">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground">Live Data Stream Active</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Sources: Elastic, Trellix, Defender, Tenable
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Data Quality: 98.7%</span>
              <span>Latency: &lt;2s</span>
              <span>Coverage: 99.2%</span>
            </div>
          </div>

          {/* Bookmarked State Indicator */}
          {bookmarkedState && (
            <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Bookmark" size={16} className="text-primary" />
                <span className="text-sm text-primary font-medium">
                  Investigation state bookmarked at {new Date(bookmarkedState.timestamp)?.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ThreatIntelligenceAnalytics;