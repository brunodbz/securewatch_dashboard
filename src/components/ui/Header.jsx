import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [userRole] = useState('Analista de Segurança');

  const navigationItems = [
    {
      label: 'Visão Geral SOC',
      path: '/security-operations-center-overview',
      icon: 'Shield',
      tooltip: 'Painel em tempo real do centro de operações de segurança'
    },
    {
      label: 'Inteligência de Ameaças',
      path: '/threat-intelligence-analytics',
      icon: 'Search',
      tooltip: 'Ferramentas avançadas de análise e investigação de ameaças'
    },
    {
      label: 'Gestão de Vulnerabilidades',
      path: '/vulnerability-management-dashboard',
      icon: 'AlertTriangle',
      tooltip: 'Rastreamento de vulnerabilidades de ativos e remediação'
    },
    {
      label: 'Resumo Executivo',
      path: '/executive-security-summary',
      icon: 'BarChart3',
      tooltip: 'Métricas estratégicas de segurança e relatórios'
    }
  ];

  const secondaryItems = [
    { label: 'Configurações', path: '/settings', icon: 'Settings' },
    { label: 'Ajuda', path: '/help', icon: 'HelpCircle' },
    { label: 'Administração', path: '/admin', icon: 'Users' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ['connected', 'warning', 'error'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setConnectionStatus(randomStatus);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'Wifi';
      case 'warning': return 'WifiOff';
      case 'error': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Shield" size={20} className="text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">SecureWatch</span>
            <span className="text-xs text-muted-foreground font-mono">Painel</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200 ease-out-cubic
                  ${isActive 
                    ? 'bg-primary text-primary-foreground elevation-1' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div className="hidden md:flex items-center space-x-2">
            <Icon 
              name={getConnectionStatusIcon()} 
              size={16} 
              className={getConnectionStatusColor()}
            />
            <span className={`text-xs font-medium ${getConnectionStatusColor()}`}>
              {connectionStatus === 'connected' ? 'Ao Vivo' : 
               connectionStatus === 'warning' ? 'Instável' : 'Offline'}
            </span>
          </div>

          {/* User Role Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-muted rounded-lg">
            <Icon name="User" size={14} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">{userRole}</span>
          </div>

          {/* More Menu - Desktop */}
          <div className="hidden lg:block relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              Mais
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg elevation-2 py-1">
                {secondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName={isMenuOpen ? "X" : "Menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <span className="sr-only">Alternar menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40">
          <div className="bg-card border-b border-border p-4">
            <nav className="space-y-2">
              {navigationItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left
                      transition-all duration-200 ease-out-cubic
                      ${isActive 
                        ? 'bg-primary text-primary-foreground elevation-1' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <Icon name={item?.icon} size={20} />
                    <div>
                      <div className="font-medium">{item?.label}</div>
                      <div className="text-xs opacity-75">{item?.tooltip}</div>
                    </div>
                  </button>
                );
              })}
              
              <div className="border-t border-border pt-2 mt-4">
                {secondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile Status Indicators */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getConnectionStatusIcon()} 
                  size={16} 
                  className={getConnectionStatusColor()}
                />
                <span className={`text-sm font-medium ${getConnectionStatusColor()}`}>
                  {connectionStatus === 'connected' ? 'Dados ao Vivo' : 
                   connectionStatus === 'warning' ? 'Conexão Instável' : 'Offline'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">{userRole}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;