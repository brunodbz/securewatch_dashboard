import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const IntegrationTab = ({ integration, onStatusUpdate }) => {
  const [config, setConfig] = useState({
    apiEndpoint: '',
    authToken: '',
    apiKey: '',
    secretKey: '',
    timeout: '30',
    rateLimit: '100',
    retryAttempts: '3',
    enableSSL: true,
    customHeaders: '',
    proxyUrl: '',
    proxyAuth: '',
    webhookUrl: '',
    logLevel: 'info'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionHistory, setConnectionHistory] = useState([
    { timestamp: new Date(Date.now() - 1800000), status: 'success', message: 'Conexão estabelecida com sucesso' },
    { timestamp: new Date(Date.now() - 3600000), status: 'warning', message: 'Timeout na resposta da API' },
    { timestamp: new Date(Date.now() - 7200000), status: 'error', message: 'Token de autenticação inválido' }
  ]);

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTestConnection = async () => {
    setIsConnecting(true);
    
    // Simulate API connection test
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const success = Math.random() > 0.3;
    const newStatus = success ? 'connected' : 'warning';
    const newEntry = {
      timestamp: new Date(),
      status: success ? 'success' : 'error',
      message: success ? 'Conexão estabelecida com sucesso' : 'Falha na autenticação'
    };
    
    setConnectionHistory(prev => [newEntry, ...prev?.slice(0, 9)]);
    onStatusUpdate?.(integration?.id, newStatus);
    setIsConnecting(false);
  };

  const getIntegrationSpecificFields = () => {
    switch (integration?.id) {
      case 'microsoft-defender':
        return (
          <>
            <Input
              label="Tenant ID"
              placeholder="00000000-0000-0000-0000-000000000000"
              value={config?.tenantId || ''}
              onChange={(e) => handleConfigChange('tenantId', e?.target?.value)}
              required
            />
            <Input
              label="Client ID"
              placeholder="Application Client ID"
              value={config?.clientId || ''}
              onChange={(e) => handleConfigChange('clientId', e?.target?.value)}
              required
            />
            <Input
              label="Client Secret"
              type="password"
              placeholder="••••••••••••••••"
              value={config?.clientSecret || ''}
              onChange={(e) => handleConfigChange('clientSecret', e?.target?.value)}
              required
            />
          </>
        );
      
      case 'tenable':
        return (
          <>
            <Input
              label="Access Key"
              placeholder="Tenable Access Key"
              value={config?.accessKey || ''}
              onChange={(e) => handleConfigChange('accessKey', e?.target?.value)}
              required
            />
            <Input
              label="Secret Key"
              type="password"
              placeholder="••••••••••••••••"
              value={config?.secretKey || ''}
              onChange={(e) => handleConfigChange('secretKey', e?.target?.value)}
              required
            />
          </>
        );
      
      case 'elastic-search':
        return (
          <>
            <Input
              label="Username"
              placeholder="elastic"
              value={config?.username || ''}
              onChange={(e) => handleConfigChange('username', e?.target?.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••••••"
              value={config?.password || ''}
              onChange={(e) => handleConfigChange('password', e?.target?.value)}
              required
            />
            <Input
              label="Index Pattern"
              placeholder="securewatch-*"
              value={config?.indexPattern || ''}
              onChange={(e) => handleConfigChange('indexPattern', e?.target?.value)}
            />
          </>
        );
      
      case 'trellix-ips':
        return (
          <>
            <Input
              label="API Username"
              placeholder="admin"
              value={config?.apiUsername || ''}
              onChange={(e) => handleConfigChange('apiUsername', e?.target?.value)}
              required
            />
            <Input
              label="API Password"
              type="password"
              placeholder="••••••••••••••••"
              value={config?.apiPassword || ''}
              onChange={(e) => handleConfigChange('apiPassword', e?.target?.value)}
              required
            />
            <Input
              label="Management Server"
              placeholder="trellix-mgmt.company.com"
              value={config?.managementServer || ''}
              onChange={(e) => handleConfigChange('managementServer', e?.target?.value)}
              required
            />
          </>
        );
      
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (integration?.status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': case'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (integration?.status) {
      case 'connected': return 'Conectado';
      case 'warning': return 'Instável';
      case 'error': case'disconnected': return 'Desconectado';
      default: return 'Não configurado';
    }
  };

  return (
    <div className="p-6">
      {/* Tab Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={integration?.icon} size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{integration?.name}</h2>
            <p className="text-sm text-muted-foreground">{integration?.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
            <div className={`w-2 h-2 rounded-full ${
              integration?.status === 'connected' ? 'bg-success' :
              integration?.status === 'warning'? 'bg-warning' : 'bg-error'
            }`} />
            <span className="font-medium text-sm">{getStatusText()}</span>
          </div>
          
          <Button
            onClick={handleTestConnection}
            loading={isConnecting}
            variant="outline"
            size="sm"
            iconName="Wifi"
          >
            Testar Conexão
          </Button>
        </div>
      </div>
      {/* Configuration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Configuration */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground mb-3">Configuração Básica</h3>
          
          <Input
            label="API Endpoint"
            placeholder={`https://api.${integration?.id}.com/v1`}
            value={config?.apiEndpoint}
            onChange={(e) => handleConfigChange('apiEndpoint', e?.target?.value)}
            required
          />

          {getIntegrationSpecificFields()}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Timeout (segundos)"
              type="number"
              placeholder="30"
              value={config?.timeout}
              onChange={(e) => handleConfigChange('timeout', e?.target?.value)}
            />
            <Input
              label="Rate Limit (req/min)"
              type="number"
              placeholder="100"
              value={config?.rateLimit}
              onChange={(e) => handleConfigChange('rateLimit', e?.target?.value)}
            />
          </div>
        </div>

        {/* Connection History */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground mb-3">Histórico de Conexões</h3>
          
          <div className="bg-muted/30 rounded-lg p-4 max-h-64 overflow-y-auto">
            {connectionHistory?.map((entry, index) => (
              <div key={index} className="flex items-start space-x-3 py-2">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  entry?.status === 'success' ? 'bg-success' :
                  entry?.status === 'warning'? 'bg-warning' : 'bg-error'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{entry?.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry?.timestamp?.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Advanced Configuration Toggle */}
      <div className="mt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
        >
          Configurações Avançadas
        </Button>

        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Configurações de Rede</h4>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`ssl-${integration?.id}`}
                    checked={config?.enableSSL}
                    onChange={(e) => handleConfigChange('enableSSL', e?.target?.checked)}
                    className="rounded"
                  />
                  <label htmlFor={`ssl-${integration?.id}`} className="text-sm font-medium text-foreground">
                    Habilitar SSL/TLS
                  </label>
                </div>

                <Input
                  label="Proxy URL (opcional)"
                  placeholder="http://proxy.company.com:8080"
                  value={config?.proxyUrl}
                  onChange={(e) => handleConfigChange('proxyUrl', e?.target?.value)}
                />

                <Input
                  label="Custom Headers (JSON)"
                  placeholder='{"X-Custom-Header": "value"}'
                  value={config?.customHeaders}
                  onChange={(e) => handleConfigChange('customHeaders', e?.target?.value)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Configurações de Monitoramento</h4>
                
                <Input
                  label="Webhook URL (opcional)"
                  placeholder="https://webhook.company.com/alerts"
                  value={config?.webhookUrl}
                  onChange={(e) => handleConfigChange('webhookUrl', e?.target?.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Tentativas de Retry"
                    type="number"
                    placeholder="3"
                    value={config?.retryAttempts}
                    onChange={(e) => handleConfigChange('retryAttempts', e?.target?.value)}
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nível de Log</label>
                    <select
                      value={config?.logLevel}
                      onChange={(e) => handleConfigChange('logLevel', e?.target?.value)}
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm"
                    >
                      <option value="debug">Debug</option>
                      <option value="info">Info</option>
                      <option value="warn">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-border">
        <Button variant="outline" size="sm">
          Resetar
        </Button>
        <Button variant="secondary" size="sm">
          Salvar como Modelo
        </Button>
        <Button size="sm" iconName="Save">
          Salvar Configuração
        </Button>
      </div>
    </div>
  );
};

export default IntegrationTab;