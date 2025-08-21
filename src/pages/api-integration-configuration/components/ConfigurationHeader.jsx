import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConfigurationHeader = ({ statusCount, onTestAll, onSave, isTestingAll, lastSaved }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Status Overview */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-8">
          {/* Connection Status Summary */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-foreground">{statusCount?.connected}</span>
              <span className="text-sm text-muted-foreground">Conectadas</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-sm font-medium text-foreground">{statusCount?.warning}</span>
              <span className="text-sm text-muted-foreground">Instáveis</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-sm font-medium text-foreground">{statusCount?.disconnected}</span>
              <span className="text-sm text-muted-foreground">Desconectadas</span>
            </div>
          </div>

          {/* Last Saved Indicator */}
          {lastSaved && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Último salvamento: {lastSaved?.toLocaleString('pt-BR')}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
          >
            Exportar Config
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
          >
            Importar Config
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={onTestAll}
            loading={isTestingAll}
            iconName="Wifi"
          >
            Testar Todas
          </Button>
          
          <Button
            size="sm"
            onClick={onSave}
            iconName="Save"
          >
            Salvar Tudo
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{statusCount?.total}</div>
            <div className="text-sm text-muted-foreground">Total de Integrações</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{statusCount?.connected}</div>
            <div className="text-sm text-muted-foreground">Ativas</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {((statusCount?.connected / statusCount?.total) * 100)?.toFixed(0)}%
            </div>
            <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {isTestingAll ? 'Testando...' : '< 1s'}
            </div>
            <div className="text-sm text-muted-foreground">Latência Média</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationHeader;