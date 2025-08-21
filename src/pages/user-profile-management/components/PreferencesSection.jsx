import React from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PreferencesSection = ({ profile, onUpdate, onSave, hasUnsavedChanges }) => {
  const themes = [
    { value: 'light', label: 'Claro', icon: 'Sun' },
    { value: 'dark', label: 'Escuro', icon: 'Moon' },
    { value: 'system', label: 'Automático', icon: 'Monitor' }
  ];

  const dashboards = [
    { value: 'security-operations-center-overview', label: 'Visão Geral SOC' },
    { value: 'threat-intelligence-analytics', label: 'Inteligência de Ameaças' },
    { value: 'vulnerability-management-dashboard', label: 'Gestão de Vulnerabilidades' },
    { value: 'executive-security-summary', label: 'Resumo Executivo' }
  ];

  const refreshIntervals = [
    { value: 5, label: '5 segundos' },
    { value: 10, label: '10 segundos' },
    { value: 30, label: '30 segundos' },
    { value: 60, label: '1 minuto' },
    { value: 300, label: '5 minutos' }
  ];

  const dateFormats = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/AAAA (31/12/2024)' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/AAAA (12/31/2024)' },
    { value: 'YYYY-MM-DD', label: 'AAAA-MM-DD (2024-12-31)' }
  ];

  const timeFormats = [
    { value: '12h', label: '12 horas (2:30 PM)' },
    { value: '24h', label: '24 horas (14:30)' }
  ];

  return (
    <div className="p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Preferências do Sistema</h2>
            <p className="text-sm text-muted-foreground">Personalize sua experiência no SecureWatch</p>
          </div>
        </div>
        
        <Button
          onClick={onSave}
          disabled={!hasUnsavedChanges}
          size="sm"
          iconName="Save"
        >
          Salvar Preferências
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Aparência</h3>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Tema</label>
            <div className="grid grid-cols-3 gap-3">
              {themes?.map((theme) => (
                <button
                  key={theme?.value}
                  onClick={() => onUpdate('theme', theme?.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    profile?.theme === theme?.value
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Icon 
                      name={theme?.icon} 
                      size={20} 
                      className={profile?.theme === theme?.value ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <span className={`text-sm font-medium ${
                      profile?.theme === theme?.value ? 'text-primary' : 'text-foreground'
                    }`}>
                      {theme?.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <label className="text-sm font-medium text-foreground">Modo Compacto</label>
              <p className="text-xs text-muted-foreground">Reduz espaçamentos para mostrar mais informações</p>
            </div>
            <button
              onClick={() => onUpdate('compactMode', !profile?.compactMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                profile?.compactMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profile?.compactMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Dashboard Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Dashboard</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Dashboard Padrão
            </label>
            <select
              value={profile?.defaultDashboard}
              onChange={(e) => onUpdate('defaultDashboard', e?.target?.value)}
              className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {dashboards?.map(dashboard => (
                <option key={dashboard?.value} value={dashboard?.value}>
                  {dashboard?.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Página que será exibida quando você fizer login
            </p>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <label className="text-sm font-medium text-foreground">Atualização Automática</label>
              <p className="text-xs text-muted-foreground">Atualiza automaticamente os dados em tempo real</p>
            </div>
            <button
              onClick={() => onUpdate('autoRefresh', !profile?.autoRefresh)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                profile?.autoRefresh ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profile?.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {profile?.autoRefresh && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Intervalo de Atualização
              </label>
              <select
                value={profile?.refreshInterval}
                onChange={(e) => onUpdate('refreshInterval', parseInt(e?.target?.value))}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {refreshIntervals?.map(interval => (
                  <option key={interval?.value} value={interval?.value}>
                    {interval?.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Data Format Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Formato de Dados</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Formato de Data
              </label>
              <select
                value={profile?.dateFormat}
                onChange={(e) => onUpdate('dateFormat', e?.target?.value)}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {dateFormats?.map(format => (
                  <option key={format?.value} value={format?.value}>
                    {format?.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Formato de Hora
              </label>
              <select
                value={profile?.timeFormat}
                onChange={(e) => onUpdate('timeFormat', e?.target?.value)}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {timeFormats?.map(format => (
                  <option key={format?.value} value={format?.value}>
                    {format?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Configurações Avançadas</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Debug Mode</label>
                  <p className="text-xs text-muted-foreground">Exibe informações técnicas adicionais</p>
                </div>
                <button
                  onClick={() => onUpdate('debugMode', !profile?.debugMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    profile?.debugMode ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      profile?.debugMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Animações Reduzidas</label>
                  <p className="text-xs text-muted-foreground">Reduz animações para melhor performance</p>
                </div>
                <button
                  onClick={() => onUpdate('reducedAnimations', !profile?.reducedAnimations)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    profile?.reducedAnimations ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      profile?.reducedAnimations ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Reset Preferences */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              onClick={() => {
                if (confirm('Isso restaurará todas as preferências para os valores padrão. Deseja continuar?')) {
                  // Reset to default preferences
                  onUpdate('theme', 'system');
                  onUpdate('compactMode', false);
                  onUpdate('autoRefresh', true);
                  onUpdate('refreshInterval', 30);
                  onUpdate('defaultDashboard', 'security-operations-center-overview');
                  onUpdate('dateFormat', 'DD/MM/YYYY');
                  onUpdate('timeFormat', '24h');
                  onUpdate('debugMode', false);
                  onUpdate('reducedAnimations', false);
                }
              }}
            >
              Restaurar Padrões
            </Button>
          </div>
        </div>
      </div>
      {/* Preview Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-4">Pré-visualização</h3>
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">Data atual:</span>
            <span className="text-sm font-medium text-foreground">
              {new Date()?.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Hora atual:</span>
            <span className="text-sm font-medium text-foreground">
              {new Date()?.toLocaleTimeString('pt-BR', {
                hour12: profile?.timeFormat === '12h'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;