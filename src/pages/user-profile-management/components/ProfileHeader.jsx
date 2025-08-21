import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfileHeader = ({ profile, hasUnsavedChanges, onSave }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`?.toUpperCase();
  };

  const getRoleColor = (role) => {
    if (role?.toLowerCase()?.includes('admin')) return 'text-error';
    if (role?.toLowerCase()?.includes('senior')) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Profile Avatar and Basic Info */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="relative">
            {profile?.profilePicture ? (
              <img
                src={profile?.profilePicture}
                alt={`${profile?.firstName} ${profile?.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  {getInitials(profile?.firstName, profile?.lastName)}
                </span>
              </div>
            )}
            
            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-card rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className={`text-sm font-medium ${getRoleColor(profile?.role)}`}>
              {profile?.role}
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Mail" size={12} />
                <span>{profile?.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={12} />
                <span>{profile?.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 md:ml-auto">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Última atualização: {new Date()?.toLocaleDateString('pt-BR')}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="Download"
          >
            Exportar Perfil
          </Button>

          <Button
            size="sm"
            onClick={onSave}
            iconName="Save"
            variant={hasUnsavedChanges ? "default" : "secondary"}
            disabled={!hasUnsavedChanges}
          >
            {hasUnsavedChanges ? 'Salvar Alterações' : 'Salvo'}
          </Button>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-foreground">
              {profile?.activeSessions?.length || 0}
            </div>
            <div className="text-xs text-muted-foreground">Sessões Ativas</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-success">
              {profile?.twoFactorEnabled ? 'ON' : 'OFF'}
            </div>
            <div className="text-xs text-muted-foreground">2FA Status</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-foreground">
              {Math.floor((new Date() - new Date(profile?.lastPasswordChange)) / (1000 * 60 * 60 * 24))}d
            </div>
            <div className="text-xs text-muted-foreground">Últimos Dias</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-primary">
              {profile?.language?.toUpperCase()}
            </div>
            <div className="text-xs text-muted-foreground">Idioma</div>
          </div>
        </div>
      </div>
      {/* Security Alerts */}
      {!profile?.twoFactorEnabled && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-warning text-sm">
                Recomendação de Segurança
              </h4>
              <p className="text-xs text-warning/80 mt-1">
                Habilite a autenticação de dois fatores para aumentar a segurança da sua conta.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;