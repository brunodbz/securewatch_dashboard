import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';
import PreferencesSection from './components/PreferencesSection';
import NotificationsSection from './components/NotificationsSection';
import ProfileHeader from './components/ProfileHeader';

const UserProfileManagement = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [userProfile, setUserProfile] = useState({
    // Personal Information
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@securewatch.com',
    phone: '+55 11 98765-4321',
    department: 'Segurança da Informação',
    role: 'Analista de Segurança Senior',
    location: 'São Paulo, Brasil',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    profilePicture: null,
    bio: 'Especialista em análise de ameaças com mais de 5 anos de experiência em SOC.',
    
    // System Preferences
    theme: 'system',
    compactMode: false,
    autoRefresh: true,
    refreshInterval: 30,
    defaultDashboard: 'security-operations-center-overview',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    desktopNotifications: true,
    criticalAlerts: true,
    weeklyReports: true,
    maintenanceAlerts: false,
    notificationQuietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    },
    
    // Security Settings
    twoFactorEnabled: true,
    lastPasswordChange: new Date('2024-06-15'),
    activeSessions: [
      { id: '1', device: 'Chrome - Windows', location: 'São Paulo, Brasil', lastActive: new Date(), current: true },
      { id: '2', device: 'Safari - iPhone', location: 'São Paulo, Brasil', lastActive: new Date(Date.now() - 3600000), current: false }
    ]
  });

  const profileSections = [
    {
      id: 'profile',
      name: 'Perfil',
      icon: 'User',
      description: 'Informações pessoais e profissionais'
    },
    {
      id: 'security',
      name: 'Segurança',
      icon: 'Shield',
      description: 'Senha, 2FA e sessões ativas'
    },
    {
      id: 'preferences',
      name: 'Preferências',
      icon: 'Settings',
      description: 'Configurações do sistema e interface'
    },
    {
      id: 'notifications',
      name: 'Notificações',
      icon: 'Bell',
      description: 'Alertas e configurações de comunicação'
    }
  ];

  const handleSectionChange = (sectionId) => {
    if (hasUnsavedChanges) {
      if (window.confirm('Você tem alterações não salvas. Deseja continuar sem salvar?')) {
        setActiveSection(sectionId);
        setHasUnsavedChanges(false);
      }
    } else {
      setActiveSection(sectionId);
    }
  };

  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleNestedProfileUpdate = (section, field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveProfile = async () => {
    // Simulate saving to backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    setHasUnsavedChanges(false);
    
    // Show success message
    alert('Perfil atualizado com sucesso!');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <ProfileSection
            profile={userProfile}
            onUpdate={handleProfileUpdate}
            onSave={handleSaveProfile}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        );
      case 'security':
        return (
          <SecuritySection
            profile={userProfile}
            onUpdate={handleProfileUpdate}
            onNestedUpdate={handleNestedProfileUpdate}
            onSave={handleSaveProfile}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        );
      case 'preferences':
        return (
          <PreferencesSection
            profile={userProfile}
            onUpdate={handleProfileUpdate}
            onNestedUpdate={handleNestedProfileUpdate}
            onSave={handleSaveProfile}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        );
      case 'notifications':
        return (
          <NotificationsSection
            profile={userProfile}
            onUpdate={handleProfileUpdate}
            onNestedUpdate={handleNestedProfileUpdate}
            onSave={handleSaveProfile}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Gerenciar Perfil - SecureWatch</title>
        <meta name="description" content="Gerencie suas informações pessoais, configurações de segurança e preferências do sistema" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Gerenciar Perfil
              </h1>
              <p className="text-muted-foreground">
                Configure suas informações pessoais, segurança e preferências do sistema
              </p>
            </div>

            {/* Profile Header Card */}
            <ProfileHeader
              profile={userProfile}
              hasUnsavedChanges={hasUnsavedChanges}
              onSave={handleSaveProfile}
            />

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                  <h3 className="font-semibold text-foreground mb-4">Configurações</h3>
                  <nav className="space-y-1">
                    {profileSections?.map((section) => (
                      <button
                        key={section?.id}
                        onClick={() => handleSectionChange(section?.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          activeSection === section?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            activeSection === section?.id ? 'bg-primary-foreground/20' : 'bg-muted'
                          }`}>
                            <div className="w-4 h-4 bg-current rounded-sm opacity-80" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium text-sm ${
                              activeSection === section?.id ? 'text-primary-foreground' : 'text-foreground'
                            }`}>
                              {section?.name}
                            </div>
                            <div className={`text-xs opacity-75 ${
                              activeSection === section?.id ? 'text-primary-foreground' : 'text-muted-foreground'
                            }`}>
                              {section?.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>

                  {/* Unsaved Changes Warning */}
                  {hasUnsavedChanges && (
                    <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-warning rounded-full" />
                        <div>
                          <p className="text-xs font-medium text-warning">
                            Alterações não salvas
                          </p>
                          <p className="text-xs text-warning/80">
                            Lembre-se de salvar suas alterações
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-lg">
                  {renderActiveSection()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserProfileManagement;