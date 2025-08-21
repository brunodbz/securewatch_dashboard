import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConnectionTestPanel = ({ integrations, configurationsStatus, onTestConnection }) => {
  const [testingStates, setTestingStates] = useState({});

  const handleTestConnection = async (integrationId) => {
    setTestingStates(prev => ({ ...prev, [integrationId]: true }));
    
    try {
      await onTestConnection?.(integrationId);
    } finally {
      setTimeout(() => {
        setTestingStates(prev => ({ ...prev, [integrationId]: false }));
      }, 2000);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'disconnected': case'error': return 'XCircle';
      default: return 'MinusCircle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'disconnected': case'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected': return 'Conectado';
      case 'warning': return 'Instável';
      case 'disconnected': return 'Desconectado';
      case 'error': return 'Erro';
      default: return 'Não testado';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Activity" size={20} className="text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Teste de Conectividade</h3>
              <p className="text-sm text-muted-foreground">
                Verifique o status das conexões com todas as plataformas
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations?.map((integration) => {
            const status = configurationsStatus?.[integration?.id];
            const isTesting = testingStates?.[integration?.id];
            
            return (
              <div
                key={integration?.id}
                className="bg-muted/30 rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={integration?.icon} size={16} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {integration?.name}
                      </h4>
                    </div>
                  </div>
                  
                  <Icon
                    name={getStatusIcon(status)}
                    size={16}
                    className={getStatusColor(status)}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Status:</span>
                    <span className={`text-xs font-medium ${getStatusColor(status)}`}>
                      {getStatusText(status)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Latência:</span>
                    <span className="text-xs font-medium text-foreground">
                      {status === 'connected' ? '< 100ms' : 
                       status === 'warning' ? '> 500ms' : 'N/A'}
                    </span>
                  </div>

                  <Button
                    size="xs"
                    variant={status === 'connected' ? 'success' : 'outline'}
                    fullWidth
                    onClick={() => handleTestConnection(integration?.id)}
                    loading={isTesting}
                    iconName="Wifi"
                  >
                    {isTesting ? 'Testando...' : 'Testar'}
                  </Button>
                </div>
                {/* Connection Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-muted rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        status === 'connected' ? 'bg-success w-full' :
                        status === 'warning'? 'bg-warning w-2/3' : 'bg-error w-1/3'
                      }`}
                    />
                  </div>
                </div>
                {/* Last Test Time */}
                <div className="mt-2 text-xs text-muted-foreground">
                  Último teste: {new Date()?.toLocaleTimeString('pt-BR')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Troubleshooting Tips */}
        <div className="mt-6 p-4 bg-muted/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground text-sm mb-1">
                Dicas de Solução de Problemas
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Verifique se as credenciais estão corretas e não expiraram</li>
                <li>• Confirme se os endpoints da API estão acessíveis</li>
                <li>• Verifique configurações de proxy e firewall</li>
                <li>• Consulte os logs de conexão para detalhes específicos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTestPanel;