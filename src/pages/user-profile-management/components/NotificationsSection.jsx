import React from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationsSection = ({ profile, onUpdate, onNestedUpdate, onSave, hasUnsavedChanges }) => {
  const notificationTypes = [
    {
      id: 'criticalAlerts',
      name: 'Alertas Críticos',
      description: 'Ameaças de alta severidade e incidentes críticos',
      icon: 'AlertTriangle',
      color: 'text-error'
    },
    {
      id: 'securityEvents',
      name: 'Eventos de Segurança',
      description: 'Tentativas de login, alterações de configuração',
      icon: 'Shield',
      color: 'text-warning'
    },
    {
      id: 'systemAlerts',
      name: 'Alertas do Sistema',
      description: 'Status do sistema, atualizações e manutenção',
      icon: 'Settings',
      color: 'text-primary'
    },
    {
      id: 'weeklyReports',
      name: 'Relatórios Semanais',
      description: 'Resumos semanais de atividades e métricas',
      icon: 'FileText',
      color: 'text-success'
    },
    {
      id: 'policyUpdates',
      name: 'Atualizações de Políticas',
      description: 'Mudanças em políticas de segurança e compliance',
      icon: 'BookOpen',
      color: 'text-primary'
    },
    {
      id: 'maintenanceAlerts',
      name: 'Manutenção Programada',
      description: 'Avisos sobre manutenções e atualizações',
      icon: 'Tool',
      color: 'text-muted-foreground'
    }
  ];

  const deliveryMethods = [
    { id: 'email', name: 'Email', icon: 'Mail' },
    { id: 'sms', name: 'SMS', icon: 'MessageSquare' },
    { id: 'desktop', name: 'Desktop', icon: 'Monitor' },
    { id: 'mobile', name: 'Push Mobile', icon: 'Smartphone' }
  ];

  const handleNotificationToggle = (notificationId, enabled) => {
    onUpdate(notificationId, enabled);
  };

  const handleDeliveryMethodToggle = (method, enabled) => {
    const fieldMap = {
      email: 'emailNotifications',
      sms: 'smsNotifications',
      desktop: 'desktopNotifications',
      mobile: 'mobileNotifications'
    };
    
    onUpdate(fieldMap?.[method], enabled);
  };

  const handleQuietHoursToggle = () => {
    onNestedUpdate('notificationQuietHours', 'enabled', !profile?.notificationQuietHours?.enabled);
  };

  const handleQuietHoursTimeChange = (field, value) => {
    onNestedUpdate('notificationQuietHours', field, value);
  };

  const testNotification = (type) => {
    // Simulate sending test notification
    alert(`Notificação de teste enviada: ${type}`);
  };

  return (
    <div className="p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Configurações de Notificação</h2>
            <p className="text-sm text-muted-foreground">Gerencie como e quando receber alertas e atualizações</p>
          </div>
        </div>
        
        <Button
          onClick={onSave}
          disabled={!hasUnsavedChanges}
          size="sm"
          iconName="Save"
        >
          Salvar Configurações
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Types */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Tipos de Notificação</h3>
          
          <div className="space-y-3">
            {notificationTypes?.map((notification) => (
              <div key={notification?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${notification?.color}`}>
                    <Icon name={notification?.icon} size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground">{notification?.name}</h4>
                    <p className="text-xs text-muted-foreground">{notification?.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => testNotification(notification?.name)}
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                    title="Testar notificação"
                  >
                    <Icon name="Send" size={14} />
                  </button>
                  <button
                    onClick={() => handleNotificationToggle(notification?.id, !profile?.[notification?.id])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile?.[notification?.id] ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profile?.[notification?.id] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Methods */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Métodos de Entrega</h3>
          
          <div className="space-y-3">
            {deliveryMethods?.map((method) => {
              const fieldMap = {
                email: 'emailNotifications',
                sms: 'smsNotifications',
                desktop: 'desktopNotifications',
                mobile: 'mobileNotifications'
              };
              
              const isEnabled = profile?.[fieldMap?.[method?.id]];
              
              return (
                <div key={method?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Icon name={method?.icon} size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground">{method?.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {method?.id === 'email' && profile?.email}
                        {method?.id === 'sms' && profile?.phone}
                        {method?.id === 'desktop' && 'Notificações no navegador'}
                        {method?.id === 'mobile' && 'Aplicativo móvel'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {(method?.id === 'email' || method?.id === 'sms') && (
                      <button
                        onClick={() => testNotification(`${method?.name} para ${
                          method?.id === 'email' ? profile?.email : profile?.phone
                        }`)}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                        title="Testar entrega"
                      >
                        <Icon name="Send" size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeliveryMethodToggle(method?.id, !isEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isEnabled ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quiet Hours */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-medium text-foreground mb-3">Horário Silencioso</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-foreground">Ativar Horário Silencioso</label>
                  <p className="text-xs text-muted-foreground">Desabilita notificações não críticas durante o período</p>
                </div>
                <button
                  onClick={handleQuietHoursToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    profile?.notificationQuietHours?.enabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      profile?.notificationQuietHours?.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {profile?.notificationQuietHours?.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Início</label>
                    <input
                      type="time"
                      value={profile?.notificationQuietHours?.start}
                      onChange={(e) => handleQuietHoursTimeChange('start', e?.target?.value)}
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Fim</label>
                    <input
                      type="time"
                      value={profile?.notificationQuietHours?.end}
                      onChange={(e) => handleQuietHoursTimeChange('end', e?.target?.value)}
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Frequency Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Configurações de Frequência</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Limite de Notificações por Hora
              </label>
              <select
                value={profile?.notificationLimit || 50}
                onChange={(e) => onUpdate('notificationLimit', parseInt(e?.target?.value))}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value={10}>10 notificações</option>
                <option value={25}>25 notificações</option>
                <option value={50}>50 notificações</option>
                <option value={100}>100 notificações</option>
                <option value={-1}>Sem limite</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Agrupa notificações similares quando o limite é atingido
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Atraso de Agrupamento
              </label>
              <select
                value={profile?.groupingDelay || 300}
                onChange={(e) => onUpdate('groupingDelay', parseInt(e?.target?.value))}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value={60}>1 minuto</option>
                <option value={300}>5 minutos</option>
                <option value={600}>10 minutos</option>
                <option value={1800}>30 minutos</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Tempo para agrupar notificações similares
              </p>
            </div>
          </div>
        </div>

        {/* Priority Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Configurações de Prioridade</h3>
          
          <div className="space-y-3">
            <div className="p-4 bg-error/10 border border-error/30 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <h4 className="font-medium text-sm text-error">Alertas Críticos</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Sempre recebidos, independente das configurações de horário silencioso
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-error/20 text-error text-xs rounded">Email</span>
                <span className="px-2 py-1 bg-error/20 text-error text-xs rounded">SMS</span>
                <span className="px-2 py-1 bg-error/20 text-error text-xs rounded">Desktop</span>
              </div>
            </div>

            <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <h4 className="font-medium text-sm text-warning">Alertas de Alta Prioridade</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Respeitam horário silencioso mas têm prioridade sobre outras notificações
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-warning/20 text-warning text-xs rounded">Email</span>
                <span className="px-2 py-1 bg-warning/20 text-warning text-xs rounded">Desktop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Test All Notifications */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="TestTube" size={20} className="text-primary" />
            <div>
              <h4 className="font-medium text-primary">Testar Todas as Notificações</h4>
              <p className="text-sm text-primary/80">
                Envie uma notificação de teste para todos os métodos habilitados
              </p>
            </div>
          </div>
          
          <Button
            size="sm"
            iconName="Send"
            onClick={() => testNotification('todas as configurações')}
          >
            Enviar Teste
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;