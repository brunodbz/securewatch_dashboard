import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecuritySection = ({ profile, onUpdate, onSave, hasUnsavedChanges }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isGenerating2FA, setIsGenerating2FA] = useState(false);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 20;
    if (password?.length >= 12) strength += 10;
    if (/[A-Z]/?.test(password)) strength += 20;
    if (/[a-z]/?.test(password)) strength += 20;
    if (/[0-9]/?.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 15;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (passwordStrength < 60) {
      alert('Sua senha precisa ser mais forte');
      return;
    }

    // Simulate password change
    await new Promise(resolve => setTimeout(resolve, 1500));
    onUpdate('lastPasswordChange', new Date());
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Senha alterada com sucesso!');
  };

  const handle2FAToggle = async () => {
    setIsGenerating2FA(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onUpdate('twoFactorEnabled', !profile?.twoFactorEnabled);
    setIsGenerating2FA(false);
  };

  const handleSessionTerminate = (sessionId) => {
    if (sessionId === '1') {
      alert('Você não pode finalizar sua sessão atual');
      return;
    }

    const updatedSessions = profile?.activeSessions?.filter(s => s?.id !== sessionId);
    onUpdate('activeSessions', updatedSessions);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-error';
    if (passwordStrength < 60) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return 'Fraca';
    if (passwordStrength < 60) return 'Média';
    return 'Forte';
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  return (
    <div className="p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Configurações de Segurança</h2>
            <p className="text-sm text-muted-foreground">Gerencie sua senha, 2FA e sessões ativas</p>
          </div>
        </div>
        
        <Button
          onClick={onSave}
          disabled={!hasUnsavedChanges}
          size="sm"
          iconName="Save"
        >
          Salvar Alterações
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Change Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Alterar Senha</h3>
            <div className="text-xs text-muted-foreground">
              Última alteração: {profile?.lastPasswordChange?.toLocaleDateString('pt-BR')}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                label="Senha Atual"
                type={showPasswords?.current ? "text" : "password"}
                value={passwordForm?.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.current ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            <div className="relative">
              <Input
                label="Nova Senha"
                type={showPasswords?.new ? "text" : "password"}
                value={passwordForm?.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.new ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            {/* Password Strength Indicator */}
            {passwordForm?.newPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Força da senha:</span>
                  <span className={`text-sm font-medium ${
                    passwordStrength < 30 ? 'text-error' :
                    passwordStrength < 60 ? 'text-warning': 'text-success'
                  }`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Input
                label="Confirmar Nova Senha"
                type={showPasswords?.confirm ? "text" : "password"}
                value={passwordForm?.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
                error={passwordForm?.confirmPassword && passwordForm?.newPassword !== passwordForm?.confirmPassword 
                  ? 'As senhas não coincidem' : ''}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.confirm ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            <Button
              onClick={handlePasswordSubmit}
              disabled={!passwordForm?.currentPassword || !passwordForm?.newPassword || 
                       passwordForm?.newPassword !== passwordForm?.confirmPassword ||
                       passwordStrength < 60}
              size="sm"
              iconName="Lock"
              fullWidth
            >
              Alterar Senha
            </Button>
          </div>

          {/* Password Requirements */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-sm text-foreground mb-2">Requisitos da Senha</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className={`flex items-center space-x-2 ${
                passwordForm?.newPassword?.length >= 8 ? 'text-success' : ''
              }`}>
                <Icon name={passwordForm?.newPassword?.length >= 8 ? "Check" : "X"} size={12} />
                <span>Pelo menos 8 caracteres</span>
              </li>
              <li className={`flex items-center space-x-2 ${
                /[A-Z]/?.test(passwordForm?.newPassword) ? 'text-success' : ''
              }`}>
                <Icon name={/[A-Z]/?.test(passwordForm?.newPassword) ? "Check" : "X"} size={12} />
                <span>Pelo menos uma letra maiúscula</span>
              </li>
              <li className={`flex items-center space-x-2 ${
                /[a-z]/?.test(passwordForm?.newPassword) ? 'text-success' : ''
              }`}>
                <Icon name={/[a-z]/?.test(passwordForm?.newPassword) ? "Check" : "X"} size={12} />
                <span>Pelo menos uma letra minúscula</span>
              </li>
              <li className={`flex items-center space-x-2 ${
                /[0-9]/?.test(passwordForm?.newPassword) ? 'text-success' : ''
              }`}>
                <Icon name={/[0-9]/?.test(passwordForm?.newPassword) ? "Check" : "X"} size={12} />
                <span>Pelo menos um número</span>
              </li>
              <li className={`flex items-center space-x-2 ${
                /[^A-Za-z0-9]/?.test(passwordForm?.newPassword) ? 'text-success' : ''
              }`}>
                <Icon name={/[^A-Za-z0-9]/?.test(passwordForm?.newPassword) ? "Check" : "X"} size={12} />
                <span>Pelo menos um caractere especial</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Autenticação de Dois Fatores</h3>
          
          <div className={`p-4 rounded-lg border ${
            profile?.twoFactorEnabled 
              ? 'bg-success/10 border-success/30' :'bg-warning/10 border-warning/30'
          }`}>
            <div className="flex items-start space-x-3">
              <Icon 
                name={profile?.twoFactorEnabled ? "Shield" : "AlertTriangle"} 
                size={20} 
                className={profile?.twoFactorEnabled ? "text-success" : "text-warning"}
              />
              <div className="flex-1">
                <h4 className={`font-medium ${
                  profile?.twoFactorEnabled ? "text-success" : "text-warning"
                }`}>
                  2FA {profile?.twoFactorEnabled ? 'Habilitada' : 'Desabilitada'}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {profile?.twoFactorEnabled 
                    ? 'Sua conta está protegida com autenticação de dois fatores'
                    : 'Recomendamos habilitar 2FA para maior segurança'
                  }
                </p>
              </div>
            </div>

            <div className="mt-3">
              <Button
                onClick={handle2FAToggle}
                loading={isGenerating2FA}
                size="sm"
                variant={profile?.twoFactorEnabled ? "destructive" : "default"}
                iconName={profile?.twoFactorEnabled ? "ShieldOff" : "Shield"}
              >
                {profile?.twoFactorEnabled ? 'Desabilitar 2FA' : 'Habilitar 2FA'}
              </Button>
            </div>
          </div>

          {/* Recovery Codes */}
          {profile?.twoFactorEnabled && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground text-sm mb-2">Códigos de Recuperação</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Guarde esses códigos em um local seguro. Você pode usá-los para acessar sua conta se perder seu dispositivo 2FA.
              </p>
              <Button variant="outline" size="xs" iconName="Download">
                Baixar Códigos
              </Button>
            </div>
          )}

          {/* Active Sessions */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Sessões Ativas</h3>
            
            <div className="space-y-2">
              {profile?.activeSessions?.map((session) => (
                <div key={session?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      session?.current ? 'bg-success' : 'bg-muted-foreground'
                    }`} />
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {session?.device}
                        {session?.current && (
                          <span className="ml-2 text-xs text-success">(Atual)</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {session?.location} • {session?.lastActive?.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  
                  {!session?.current && (
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => handleSessionTerminate(session?.id)}
                      iconName="X"
                    >
                      Finalizar
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              iconName="LogOut"
              onClick={() => {
                if (confirm('Isso finalizará todas as outras sessões. Deseja continuar?')) {
                  onUpdate('activeSessions', profile?.activeSessions?.filter(s => s?.current));
                }
              }}
            >
              Finalizar Todas as Outras Sessões
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;