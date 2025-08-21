import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const ThreatTimeline = ({ timeRange, severityFilter, dataSources }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock data generation based on time range
  const generateMockData = () => {
    const now = new Date();
    const dataPoints = timeRange === '1h' ? 12 : timeRange === '6h' ? 24 : timeRange === '24h' ? 48 : 168;
    const interval = timeRange === '1h' ? 5 : timeRange === '6h' ? 15 : timeRange === '24h' ? 30 : 60;
    
    return Array.from({ length: dataPoints }, (_, i) => {
      const time = new Date(now.getTime() - (dataPoints - i - 1) * interval * 60000);
      return {
        time: time?.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          ...(timeRange === '7d' || timeRange === '30d' ? { month: 'short', day: 'numeric' } : {})
        }),
        timestamp: time?.getTime(),
        critical: Math.floor(Math.random() * 15) + 2,
        high: Math.floor(Math.random() * 25) + 5,
        medium: Math.floor(Math.random() * 40) + 10,
        low: Math.floor(Math.random() * 60) + 15,
        total: 0
      };
    })?.map(item => ({
      ...item,
      total: item?.critical + item?.high + item?.medium + item?.low
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setChartData(generateMockData());
      setIsLoading(false);
      setLastUpdate(new Date());
    }, 500);

    return () => clearTimeout(timer);
  }, [timeRange, severityFilter, dataSources]);

  // WebSocket simulation for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && chartData?.length > 0) {
        setChartData(prev => {
          const newData = [...prev];
          const lastPoint = newData?.[newData?.length - 1];
          
          // Update the last data point with new values
          newData[newData.length - 1] = {
            ...lastPoint,
            critical: Math.max(0, lastPoint?.critical + (Math.random() - 0.5) * 4),
            high: Math.max(0, lastPoint?.high + (Math.random() - 0.5) * 6),
            medium: Math.max(0, lastPoint?.medium + (Math.random() - 0.5) * 8),
            low: Math.max(0, lastPoint?.low + (Math.random() - 0.5) * 10)
          };
          
          newData[newData.length - 1].total = 
            newData?.[newData?.length - 1]?.critical + 
            newData?.[newData?.length - 1]?.high + 
            newData?.[newData?.length - 1]?.medium + 
            newData?.[newData?.length - 1]?.low;
          
          return newData;
        });
        setLastUpdate(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoading, chartData?.length]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const total = payload?.reduce((sum, entry) => sum + entry?.value, 0);
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.reverse()?.map((entry) => (
            <div key={entry?.dataKey} className="flex items-center justify-between space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="capitalize text-popover-foreground">{entry?.dataKey}</span>
              </div>
              <span className="font-medium text-popover-foreground">{entry?.value}</span>
            </div>
          ))}
          <div className="border-t border-border mt-2 pt-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-popover-foreground">Total Events</span>
              <span className="text-popover-foreground">{total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded animate-pulse" />
            <div className="w-32 h-4 bg-muted rounded animate-pulse" />
          </div>
          <div className="w-24 h-4 bg-muted rounded animate-pulse" />
        </div>
        <div className="w-full h-80 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Real-time Threat Timeline</h2>
          <div className="flex items-center space-x-1 text-success">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs font-medium">Live</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: {lastUpdate?.toLocaleTimeString()}
        </div>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="criticalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="highGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="mediumGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFCC00" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FFCC00" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="lowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />
            <Area
              type="monotone"
              dataKey="low"
              stackId="1"
              stroke="#10B981"
              fill="url(#lowGradient)"
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="medium"
              stackId="1"
              stroke="#FFCC00"
              fill="url(#mediumGradient)"
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="high"
              stackId="1"
              stroke="#F59E0B"
              fill="url(#highGradient)"
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="critical"
              stackId="1"
              stroke="#DC2626"
              fill="url(#criticalGradient)"
              strokeWidth={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreatTimeline;