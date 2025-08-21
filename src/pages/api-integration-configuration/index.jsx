import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import IntegrationTab from './components/IntegrationTab';
import ConfigurationHeader from './components/ConfigurationHeader';
import ConnectionTestPanel from './components/ConnectionTestPanel';

const ApiIntegrationConfiguration = () => {
  const [activeTab, setActiveTab] = useState('microsoft-defender');
  const [configurationsStatus, setConfigurationsStatus] = useState({
    'microsoft-defender': 'disconnected',
    'tenable': 'connected',
    'elastic-search': 'warning',
    'trellix-ips': 'disconnected'
  });
  
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const integrationTabs = [
    {
      id: 'microsoft-defender',
      name: 'Microsoft Defender',
      icon: 'Shield',
      description: 'Configurar integração com Microsoft Defender ATP',
      status: configurationsStatus?.['microsoft-defender']
    },
    {
      id: 'tenable',
      name: 'Tenable',
      icon: 'Search',
      description: 'Configurar integração com Tenable Vulnerability Management',
      status: configurationsStatus?.['tenable']
    },
    {
      id: 'elastic-search',
      name: 'Elastic Search',
      icon: 'Database',
      description: 'Configurar integração com Elastic Search SIEM',
      status: configurationsStatus?.['elastic-search']
    },
    {
      id: 'trellix-ips',
      name: 'Trellix IPS',
      icon: 'AlertTriangle',
      description: 'Configurar integração com Trellix Intrusion Prevention System',
      status: configurationsStatus?.['trellix-ips']
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleStatusUpdate = (integrationId, status) => {
    setConfigurationsStatus(prev => ({
      ...prev,
      [integrationId]: status
    }));
  };

  const handleTestAllConnections = async () => {
    setIsTestingAll(true);
    
    // Simulate testing all connections
    for (const tab of integrationTabs) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const randomStatus = Math.random() > 0.7 ? 'connected' : Math.random() > 0.5 ? 'warning' : 'disconnected';
      handleStatusUpdate(tab?.id, randomStatus);
    }
    
    setIsTestingAll(false);
  };

  const handleSaveConfiguration = () => {
    setLastSaved(new Date());
    // Here you would typically save to backend
  };

  const getStatusCount = () => {
    const statuses = Object.values(configurationsStatus);
    return {
      connected: statuses?.filter(s => s === 'connected')?.length,
      warning: statuses?.filter(s => s === 'warning')?.length,
      disconnected: statuses?.filter(s => s === 'disconnected')?.length,
      total: statuses?.length
    };
  };

  return (
    <>
      <Helmet>
        <title>Configuração de Integrações API - SecureWatch</title>
        <meta name="description" content="Configure e gerencie integrações seguras com plataformas de segurança externas" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Configuração de Integrações API
              </h1>
              <p className="text-muted-foreground">
                Configure e gerencie conexões seguras com plataformas de segurança externas
              </p>
            </div>

            {/* Configuration Header with Global Controls */}
            <ConfigurationHeader
              statusCount={getStatusCount()}
              onTestAll={handleTestAllConnections}
              onSave={handleSaveConfiguration}
              isTestingAll={isTestingAll}
              lastSaved={lastSaved}
            />

            {/* Main Configuration Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Integration Tabs Navigation - Left Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                  <h3 className="font-semibold text-foreground mb-4">Plataformas</h3>
                  <nav className="space-y-2">
                    {integrationTabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => handleTabChange(tab?.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              activeTab === tab?.id ? 'bg-primary-foreground/20' : 'bg-muted'
                            }`}>
                              <div className="w-4 h-4 bg-current rounded-sm opacity-80" />
                            </div>
                            {/* Status Indicator */}
                            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                              tab?.status === 'connected' ? 'bg-success' :
                              tab?.status === 'warning'? 'bg-warning' : 'bg-error'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium text-sm ${
                              activeTab === tab?.id ? 'text-primary-foreground' : 'text-foreground'
                            }`}>
                              {tab?.name}
                            </div>
                            <div className={`text-xs opacity-75 truncate ${
                              activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'
                            }`}>
                              {tab?.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Configuration Content - Right Side */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-lg">
                  {integrationTabs?.map((tab) => (
                    <div key={tab?.id} className={activeTab === tab?.id ? 'block' : 'hidden'}>
                      <IntegrationTab
                        integration={tab}
                        onStatusUpdate={handleStatusUpdate}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connection Test Panel */}
            <div className="mt-8">
              <ConnectionTestPanel
                integrations={integrationTabs}
                configurationsStatus={configurationsStatus}
                onTestConnection={(id) => {
                  // Simulate individual connection test
                  const randomStatus = Math.random() > 0.6 ? 'connected' : 'warning';
                  setTimeout(() => {
                    handleStatusUpdate(id, randomStatus);
                  }, 2000);
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ApiIntegrationConfiguration;