import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CorrelationMatrix = () => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [viewMode, setViewMode] = useState('heatmap');

  const dataSources = ['Elastic', 'Trellix', 'Defender', 'Tenable'];
  const threatTypes = ['Malware', 'Phishing', 'Ransomware', 'APT', 'DDoS', 'Insider'];

  const correlationData = [
    { source: 'Elastic', threat: 'Malware', value: 0.89, events: 2847 },
    { source: 'Elastic', threat: 'Phishing', value: 0.76, events: 1923 },
    { source: 'Elastic', threat: 'Ransomware', value: 0.45, events: 567 },
    { source: 'Elastic', threat: 'APT', value: 0.67, events: 234 },
    { source: 'Elastic', threat: 'DDoS', value: 0.23, events: 89 },
    { source: 'Elastic', threat: 'Insider', value: 0.34, events: 156 },
    { source: 'Trellix', threat: 'Malware', value: 0.92, events: 3124 },
    { source: 'Trellix', threat: 'Phishing', value: 0.68, events: 1456 },
    { source: 'Trellix', threat: 'Ransomware', value: 0.78, events: 789 },
    { source: 'Trellix', threat: 'APT', value: 0.56, events: 345 },
    { source: 'Trellix', threat: 'DDoS', value: 0.12, events: 45 },
    { source: 'Trellix', threat: 'Insider', value: 0.29, events: 123 },
    { source: 'Defender', threat: 'Malware', value: 0.85, events: 2567 },
    { source: 'Defender', threat: 'Phishing', value: 0.91, events: 2890 },
    { source: 'Defender', threat: 'Ransomware', value: 0.67, events: 678 },
    { source: 'Defender', threat: 'APT', value: 0.43, events: 189 },
    { source: 'Defender', threat: 'DDoS', value: 0.18, events: 67 },
    { source: 'Defender', threat: 'Insider', value: 0.52, events: 234 },
    { source: 'Tenable', threat: 'Malware', value: 0.34, events: 456 },
    { source: 'Tenable', threat: 'Phishing', value: 0.28, events: 234 },
    { source: 'Tenable', threat: 'Ransomware', value: 0.56, events: 567 },
    { source: 'Tenable', threat: 'APT', value: 0.78, events: 890 },
    { source: 'Tenable', threat: 'DDoS', value: 0.45, events: 345 },
    { source: 'Tenable', threat: 'Insider', value: 0.67, events: 456 }
  ];

  const getCorrelationValue = (source, threat) => {
    const item = correlationData?.find(d => d?.source === source && d?.threat === threat);
    return item ? item?.value : 0;
  };

  const getEventCount = (source, threat) => {
    const item = correlationData?.find(d => d?.source === source && d?.threat === threat);
    return item ? item?.events : 0;
  };

  const getHeatmapColor = (value) => {
    if (value >= 0.8) return 'bg-error/80 text-white';
    if (value >= 0.6) return 'bg-warning/80 text-white';
    if (value >= 0.4) return 'bg-primary/60 text-white';
    if (value >= 0.2) return 'bg-accent/40 text-foreground';
    return 'bg-muted/20 text-muted-foreground';
  };

  const handleCellClick = (source, threat) => {
    const cellData = correlationData?.find(d => d?.source === source && d?.threat === threat);
    setSelectedCell(cellData);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Grid3X3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Threat Correlation Matrix</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'heatmap' ? 'default' : 'outline'}
            size="sm"
            iconName="Grid3X3"
            onClick={() => setViewMode('heatmap')}
          >
            Heatmap
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            iconName="Table"
            onClick={() => setViewMode('table')}
          >
            Table
          </Button>
          <Button variant="ghost" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {viewMode === 'heatmap' && (
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-7 gap-1 mb-2">
              <div className="p-2"></div>
              {threatTypes?.map(threat => (
                <div key={threat} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {threat}
                </div>
              ))}
            </div>
            
            {dataSources?.map(source => (
              <div key={source} className="grid grid-cols-7 gap-1 mb-1">
                <div className="p-2 text-sm font-medium text-muted-foreground text-right">
                  {source}
                </div>
                {threatTypes?.map(threat => {
                  const value = getCorrelationValue(source, threat);
                  const events = getEventCount(source, threat);
                  return (
                    <div
                      key={`${source}-${threat}`}
                      className={`p-2 rounded cursor-pointer transition-all duration-200 hover:scale-105 ${getHeatmapColor(value)}`}
                      onClick={() => handleCellClick(source, threat)}
                      title={`${source} - ${threat}: ${(value * 100)?.toFixed(1)}% correlation, ${events} events`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-bold">{(value * 100)?.toFixed(0)}%</div>
                        <div className="text-xs opacity-75">{events}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Source</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Threat Type</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Correlation</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Events</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {correlationData?.sort((a, b) => b?.value - a?.value)?.slice(0, 10)?.map((item, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/20">
                  <td className="p-3 text-sm text-foreground font-medium">{item?.source}</td>
                  <td className="p-3 text-sm text-foreground">{item?.threat}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getHeatmapColor(item?.value)?.split(' ')?.[0]}`}></div>
                      <span className="text-sm font-medium">{(item?.value * 100)?.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-foreground">{item?.events?.toLocaleString()}</td>
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
      )}
      {selectedCell && (
        <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">
              {selectedCell?.source} - {selectedCell?.threat} Correlation
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setSelectedCell(null)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Correlation Score</div>
              <div className="text-lg font-bold text-foreground">
                {(selectedCell?.value * 100)?.toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Events</div>
              <div className="text-lg font-bold text-foreground">
                {selectedCell?.events?.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Risk Level</div>
              <div className={`text-lg font-bold ${
                selectedCell?.value >= 0.8 ? 'text-error' :
                selectedCell?.value >= 0.6 ? 'text-warning' :
                selectedCell?.value >= 0.4 ? 'text-primary' : 'text-accent'
              }`}>
                {selectedCell?.value >= 0.8 ? 'Critical' :
                 selectedCell?.value >= 0.6 ? 'High' :
                 selectedCell?.value >= 0.4 ? 'Medium' : 'Low'}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 text-xs text-muted-foreground">
        Last updated: {new Date()?.toLocaleString()} • Click cells for detailed analysis • Data refreshes every 15 minutes
      </div>
    </div>
  );
};

export default CorrelationMatrix;