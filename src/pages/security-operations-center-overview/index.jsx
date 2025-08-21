import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import GlobalControls from './components/GlobalControls';
import KPICard from './components/KPICard';
import ThreatTimeline from './components/ThreatTimeline';
import LiveAlertFeed from './components/LiveAlertFeed';
import SecurityEventsTable from './components/SecurityEventsTable';

const SecurityOperationsCenterOverview = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [dataSources, setDataSources] = useState({
    elastic: true,
    trellix: true,
    defender: true,
    tenable: true
  });
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ['connected', 'warning', 'error'];
      const weights = [0.8, 0.15, 0.05]; // 80% connected, 15% warning, 5% error
      const random = Math.random();
      let cumulativeWeight = 0;
      
      for (let i = 0; i < statuses?.length; i++) {
        cumulativeWeight += weights?.[i];
        if (random <= cumulativeWeight) {
          setConnectionStatus(statuses?.[i]);
          break;
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Mock KPI data with dynamic updates
  const kpiData = [
    {
      title: 'Active Threats',
      value: '247',
      change: '+12%',
      changeType: 'negative',
      icon: 'AlertTriangle',
      status: 'critical',
      sparklineData: [45, 52, 48, 61, 55, 67, 59, 72, 68, 75, 71, 78]
    },
    {
      title: 'Resolved Incidents',
      value: '1,834',
      change: '+8%',
      changeType: 'positive',
      icon: 'CheckCircle',
      status: 'success',
      sparklineData: [120, 135, 142, 138, 155, 148, 162, 159, 171, 168, 175, 182]
    },
    {
      title: 'Vulnerability Score',
      value: '7.2/10',
      change: '-0.3',
      changeType: 'positive',
      icon: 'Shield',
      status: 'warning',
      sparklineData: [8.1, 7.9, 8.2, 7.8, 7.6, 7.4, 7.7, 7.5, 7.3, 7.1, 7.0, 7.2]
    },
    {
      title: 'System Health',
      value: '98.7%',
      change: '+0.2%',
      changeType: 'positive',
      icon: 'Activity',
      status: 'success',
      sparklineData: [97.2, 97.8, 98.1, 97.9, 98.3, 98.0, 98.5, 98.2, 98.7, 98.4, 98.6, 98.7]
    }
  ];

  return (
    <>
      <Helmet>
        <title>SOC Overview - SecureWatch Dashboard</title>
        <meta name="description" content="Real-time security operations center dashboard providing comprehensive threat monitoring and security intelligence." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Security Operations Center Overview
              </h1>
              <p className="text-muted-foreground">
                Real-time threat monitoring and security intelligence dashboard
              </p>
            </div>

            {/* Global Controls */}
            <GlobalControls
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              severityFilter={severityFilter}
              setSeverityFilter={setSeverityFilter}
              dataSources={dataSources}
              setDataSources={setDataSources}
              connectionStatus={connectionStatus}
            />

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData?.map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi?.title}
                  value={kpi?.value}
                  change={kpi?.change}
                  changeType={kpi?.changeType}
                  icon={kpi?.icon}
                  status={kpi?.status}
                  sparklineData={kpi?.sparklineData}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              {/* Threat Timeline - Takes 2/3 width on desktop */}
              <div className="xl:col-span-2">
                <ThreatTimeline
                  timeRange={timeRange}
                  severityFilter={severityFilter}
                  dataSources={dataSources}
                />
              </div>

              {/* Live Alert Feed - Takes 1/3 width on desktop */}
              <div className="xl:col-span-1">
                <LiveAlertFeed
                  severityFilter={severityFilter}
                  dataSources={dataSources}
                />
              </div>
            </div>

            {/* Security Events Table */}
            <SecurityEventsTable
              dataSources={dataSources}
              severityFilter={severityFilter}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default SecurityOperationsCenterOverview;