import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfileSection = ({ profile, onUpdate, onSave, hasUnsavedChanges }) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    if (file?.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Arquivo muito grande. O tamanho máximo é 5MB.');
      return;
    }

    setIsUploadingImage(true);
    
    // Simulate image upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpdate('profilePicture', e?.target?.result);
      setIsUploadingImage(false);
    };
    reader?.readAsDataURL(file);
  };

  const departments = [
    'Segurança da Informação',
    'Tecnologia da Informação',
    'Operações',
    'Compliance',
    'Auditoria',
    'Risco',
    'Administração'
  ];

  const roles = [
    'Analista de Segurança Junior',
    'Analista de Segurança',
    'Analista de Segurança Senior',
    'Especialista em Segurança',
    'Coordenador de Segurança',
    'Gerente de Segurança',
    'Diretor de Segurança',
    'CISO'
  ];

  const timezones = [
    'America/Sao_Paulo',
    'America/New_York',
    'Europe/London',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai'
  ];

  const languages = [
    { code: 'pt-BR', name: 'Português (Brasil)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Español' },
    { code: 'fr-FR', name: 'Français' }
  ];

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`?.toUpperCase();
  };

  return (
    <div className="p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Informações do Perfil</h2>
            <p className="text-sm text-muted-foreground">Gerencie suas informações pessoais e profissionais</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <div className="lg:col-span-1">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              {profile?.profilePicture ? (
                <img
                  src={profile?.profilePicture}
                  alt={`${profile?.firstName} ${profile?.lastName}`}
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
              ) : (
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl font-bold text-primary-foreground">
                    {getInitials(profile?.firstName, profile?.lastName)}
                  </span>
                </div>
              )}
              
              {/* Upload Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Icon name="Camera" size={24} className="text-white" />
              </div>
            </div>

            <div>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                asChild
                variant="outline"
                size="sm"
                loading={isUploadingImage}
                iconName="Upload"
              >
                <label htmlFor="profile-picture" className="cursor-pointer">
                  {isUploadingImage ? 'Enviando...' : 'Alterar Foto'}
                </label>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              JPG, PNG ou GIF. Máximo 5MB.
            </p>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome"
                value={profile?.firstName}
                onChange={(e) => onUpdate('firstName', e?.target?.value)}
                required
              />
              
              <Input
                label="Sobrenome"
                value={profile?.lastName}
                onChange={(e) => onUpdate('lastName', e?.target?.value)}
                required
              />
            </div>

            <Input
              label="Email"
              type="email"
              value={profile?.email}
              onChange={(e) => onUpdate('email', e?.target?.value)}
              required
            />

            <Input
              label="Telefone"
              type="tel"
              value={profile?.phone}
              onChange={(e) => onUpdate('phone', e?.target?.value)}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Biografia
              </label>
              <textarea
                value={profile?.bio}
                onChange={(e) => onUpdate('bio', e?.target?.value)}
                rows={3}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Conte um pouco sobre sua experiência e especialidades..."
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-medium text-foreground">Informações Profissionais</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Departamento *
              </label>
              <select
                value={profile?.department}
                onChange={(e) => onUpdate('department', e?.target?.value)}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {departments?.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Cargo *
              </label>
              <select
                value={profile?.role}
                onChange={(e) => onUpdate('role', e?.target?.value)}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {roles?.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <Input
              label="Localização"
              value={profile?.location}
              onChange={(e) => onUpdate('location', e?.target?.value)}
              placeholder="Cidade, País"
            />
          </div>

          {/* Regional Settings */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-medium text-foreground">Configurações Regionais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Fuso Horário
                </label>
                <select
                  value={profile?.timezone}
                  onChange={(e) => onUpdate('timezone', e?.target?.value)}
                  className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {timezones?.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Idioma
                </label>
                <select
                  value={profile?.language}
                  onChange={(e) => onUpdate('language', e?.target?.value)}
                  className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {languages?.map(lang => (
                    <option key={lang?.code} value={lang?.code}>
                      {lang?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Reset form to original values
            window.location?.reload();
          }}
        >
          Descartar Alterações
        </Button>
        
        <Button
          onClick={onSave}
          disabled={!hasUnsavedChanges}
          size="sm"
          iconName="Save"
        >
          Salvar Perfil
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;