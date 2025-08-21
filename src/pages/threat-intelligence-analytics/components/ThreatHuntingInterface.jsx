import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const ThreatHuntingInterface = () => {
  const [query, setQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState([]);
  const [savedQueries, setSavedQueries] = useState([]);

  const queryTemplates = [
    {
      value: 'malware-detection',
      label: 'Malware Detection',
      description: 'Search for malware indicators across all sources',
      query: `source:* AND (malware OR virus OR trojan OR backdoor) 
AND severity:(high OR critical) 
AND timestamp:[now-24h TO now]`
    },
    {
      value: 'lateral-movement',
      label: 'Lateral Movement',
      description: 'Detect potential lateral movement activities',
      query: `event_type:authentication AND 
(failed_login OR privilege_escalation OR unusual_access) 
AND source_ip:internal AND destination_ip:internal`
    },
    {
      value: 'data-exfiltration',
      label: 'Data Exfiltration',
      description: 'Identify potential data exfiltration attempts',
      query: `(file_transfer OR data_upload OR large_download) AND 
bytes_transferred:>100MB AND 
destination_ip:external AND 
time_of_day:(after_hours OR weekend)`
    },
    {
      value: 'apt-indicators',
      label: 'APT Indicators',
      description: 'Search for Advanced Persistent Threat indicators',
      query: `(persistence_mechanism OR command_control OR steganography) 
AND duration:>1h AND 
source:(Elastic OR Trellix) AND 
confidence:>0.8`
    },
    {
      value: 'vulnerability-exploit',
      label: 'Vulnerability Exploitation',
      description: 'Find active vulnerability exploitation attempts',
      query: `event_type:exploit AND 
(CVE-* OR zero_day OR unpatched) AND 
success:true AND 
target_system:production`
    }
  ];

  const mockResults = [
    {
      id: 1,
      timestamp: '2025-01-20 20:45:23',
      source: 'Elastic',
      event_type: 'malware_detection',
      severity: 'critical',
      description: 'Trojan.Win32.Agent detected on workstation WS-001',
      affected_assets: ['WS-001', '192.168.1.45'],
      confidence: 0.95
    },
    {
      id: 2,
      timestamp: '2025-01-20 20:42:15',
      source: 'Trellix',
      event_type: 'malware_detection',
      severity: 'high',
      description: 'Suspicious PowerShell execution with encoded commands',
      affected_assets: ['SRV-DB-01', '10.0.1.25'],
      confidence: 0.87
    },
    {
      id: 3,
      timestamp: '2025-01-20 20:38:47',
      source: 'Defender',
      event_type: 'malware_detection',
      severity: 'medium',
      description: 'Potentially unwanted application (PUA) blocked',
      affected_assets: ['WS-045', '192.168.1.78'],
      confidence: 0.72
    }
  ];

  const handleTemplateSelect = (templateValue) => {
    const template = queryTemplates?.find(t => t?.value === templateValue);
    if (template) {
      setQuery(template?.query);
      setSelectedTemplate(templateValue);
    }
  };

  const executeQuery = async () => {
    if (!query?.trim()) return;
    
    setIsExecuting(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsExecuting(false);
    }, 2000);
  };

  const saveQuery = () => {
    if (!query?.trim()) return;
    
    const newQuery = {
      id: Date.now(),
      name: `Query ${savedQueries?.length + 1}`,
      query: query,
      created: new Date()?.toISOString(),
      results_count: results?.length
    };
    
    setSavedQueries([...savedQueries, newQuery]);
  };

  const exportResults = (format) => {
    console.log(`Exporting results in ${format} format:`, results);
    // Implementation would handle actual export
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Search" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Threat Hunting Query Interface</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="History">
            Query History
          </Button>
          <Button variant="outline" size="sm" iconName="BookOpen">
            Documentation
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Query Builder */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <Select
              label="Query Templates"
              placeholder="Select a template to get started..."
              options={queryTemplates?.map(t => ({
                value: t?.value,
                label: t?.label,
                description: t?.description
              }))}
              value={selectedTemplate}
              onChange={handleTemplateSelect}
              searchable
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Custom Query
            </label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e?.target?.value)}
              placeholder="Enter your threat hunting query here..."
              className="w-full h-32 px-3 py-2 bg-input border border-border rounded-lg text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                iconName="Play"
                onClick={executeQuery}
                loading={isExecuting}
                disabled={!query?.trim()}
              >
                Execute Query
              </Button>
              <Button
                variant="outline"
                iconName="Save"
                onClick={saveQuery}
                disabled={!query?.trim()}
              >
                Save Query
              </Button>
            </div>
            
            {results?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => exportResults('csv')}
                >
                  CSV
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => exportResults('json')}
                >
                  JSON
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Saved Queries */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Saved Queries</h4>
          {savedQueries?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No saved queries yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {savedQueries?.map((savedQuery) => (
                <div key={savedQuery?.id} className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-foreground">{savedQuery?.name}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Play"
                      onClick={() => setQuery(savedQuery?.query)}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(savedQuery.created)?.toLocaleDateString()} • {savedQuery?.results_count} results
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Query Results */}
      {results?.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground">
              Query Results ({results?.length} found)
            </h4>
            <div className="text-sm text-muted-foreground">
              Execution time: 1.23s
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Timestamp</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Source</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Event Type</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Severity</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Description</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Confidence</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((result) => (
                  <tr key={result?.id} className="border-b border-border hover:bg-muted/20">
                    <td className="p-3 text-sm font-mono text-foreground">{result?.timestamp}</td>
                    <td className="p-3 text-sm text-foreground">{result?.source}</td>
                    <td className="p-3 text-sm text-foreground">{result?.event_type}</td>
                    <td className="p-3">
                      <span className={`text-sm font-medium ${getSeverityColor(result?.severity)}`}>
                        {result?.severity}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-foreground max-w-xs truncate" title={result?.description}>
                      {result?.description}
                    </td>
                    <td className="p-3 text-sm text-foreground">
                      {(result?.confidence * 100)?.toFixed(0)}%
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm" iconName="ExternalLink">
                        Investigate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isExecuting && (
        <div className="mt-8 text-center py-8">
          <Icon name="Loader2" size={32} className="mx-auto mb-2 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Executing query across all data sources...</p>
        </div>
      )}
      <div className="mt-4 text-xs text-muted-foreground">
        Query syntax supports Lucene-style searches • Use AND, OR, NOT operators • Wildcards (*) supported
      </div>
    </div>
  );
};

export default ThreatHuntingInterface;