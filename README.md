# SecureWatch Dashboard

Um painel corporativo moderno de segurança cibernética construído com React, oferecendo insights estratégicos e operacionais para equipes de segurança e liderança executiva.

## 🛡️ Funcionalidades

- **React 18** - Versão mais recente com recursos de renderização melhorados e concorrência
- **Vite** - Ferramenta de build ultra-rápida e servidor de desenvolvimento
- **Redux Toolkit** - Gerenciamento de estado com configuração Redux simplificada
- **TailwindCSS** - Framework CSS utility-first com ampla customização
- **React Router v6** - Roteamento declarativo para aplicações React
- **Visualização de Dados** - D3.js e Recharts integrados para visualizações poderosas
- **Gerenciamento de Formulários** - React Hook Form para manipulação eficiente de formulários
- **Animações** - Framer Motion para animações suaves de UI
- **Testes** - Configuração Jest e React Testing Library

## 🎯 Painéis Disponíveis

### 📊 Resumo Executivo de Segurança
- Métricas estratégicas e KPIs de segurança
- Tendências de postura de segurança
- Mapa de calor de riscos por departamento
- Status de conformidade e relatórios executivos

### 🛡️ Visão Geral do SOC (Centro de Operações de Segurança)
- Monitoramento em tempo real de eventos de segurança
- Feed de alertas ao vivo
- Métricas operacionais e KPIs
- Timeline de ameaças e análise de incidentes

### 🔍 Inteligência de Ameaças e Analytics
- Análise avançada de ameaças e investigação
- Tipos de ataques e distribuição de severidade
- Matriz de correlação de ameaças
- Interface de caça a ameaças

### ⚠️ Gestão de Vulnerabilidades
- Inventário de ativos e rastreamento de vulnerabilidades
- Fila de remediação e priorização
- Métricas de vulnerabilidades por criticidade
- Painéis de filtros e análise detalhada

## 📋 Pré-requisitos

- Node.js (v16.x ou superior)
- npm ou yarn
- Docker (para containerização)
- Git (para controle de versão)

## 🚀 Instalação e Execução

### Método 1: Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/securewatch-dashboard.git
cd securewatch-dashboard

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

A aplicação estará disponível em `http://localhost:5173`

### Método 2: Docker (Recomendado)

```bash
# Construir e executar com Docker Compose
docker-compose up --build

# Ou apenas executar se já foi construído
docker-compose up
```

A aplicação estará disponível em `http://localhost:3000`

### Método 3: Desenvolvimento com Docker

```bash
# Para desenvolvimento com hot-reload
docker-compose --profile dev up
```

## 🐳 Comandos Docker

```bash
# Construir imagem de produção
docker build -t securewatch-dashboard .

# Executar container
docker run -p 3000:80 securewatch-dashboard

# Construir para desenvolvimento
docker build -f Dockerfile.dev -t securewatch-dev .

# Executar em modo desenvolvimento
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules securewatch-dev
```

## 📁 Estrutura do Projeto

```
securewatch-dashboard/
├── public/                    # Arquivos estáticos
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/              # Componentes de interface
│   │   ├── AppIcon.jsx      # Componente de ícones
│   │   └── AppImage.jsx     # Componente de imagens
│   ├── pages/               # Componentes de páginas
│   │   ├── executive-security-summary/     # Resumo executivo
│   │   ├── security-operations-center-overview/  # SOC
│   │   ├── threat-intelligence-analytics/  # Inteligência de ameaças
│   │   └── vulnerability-management-dashboard/  # Gestão de vulnerabilidades
│   ├── styles/              # Estilos globais e configuração Tailwind
│   ├── utils/               # Funções utilitárias
│   ├── App.jsx              # Componente principal da aplicação
│   ├── Routes.jsx           # Configuração de rotas
│   └── index.jsx            # Ponto de entrada da aplicação
├── .env                     # Variáveis de ambiente
├── Dockerfile               # Configuração Docker para produção
├── Dockerfile.dev           # Configuração Docker para desenvolvimento
├── docker-compose.yml       # Orquestração de containers
├── nginx.conf              # Configuração do servidor web
├── package.json            # Dependências e scripts do projeto
└── tailwind.config.js      # Configuração do Tailwind CSS
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm start              # Inicia servidor de desenvolvimento
npm run build          # Constrói para produção
npm run preview        # Preview da build de produção

# Docker
docker-compose up      # Executa aplicação em container
docker-compose down    # Para e remove containers
docker-compose build   # Reconstrói imagens
```

## 🌐 Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações da Aplicação
VITE_APP_TITLE="SecureWatch Dashboard"
VITE_API_BASE_URL=https://api.securewatch.local

# Configurações de Segurança (opcional)
VITE_ENABLE_ANALYTICS=true
VITE_LOG_LEVEL=info
```

## 🎨 Personalização

### Temas e Cores
O projeto utiliza Tailwind CSS com sistema de cores customizável. Edite `tailwind.config.js` para personalizar:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Componentes
Todos os componentes estão localizados em `src/components/` para implementação padronizada de UI.

## 🚀 Deployment

### Produção com Docker
```bash
# Construir e executar em produção
docker-compose -f docker-compose.yml up -d
```

### Build Manual
```bash
# Construir para produção
npm run build

# Os arquivos estarão em /dist
```

## 🔐 Segurança

O projeto inclui configurações de segurança:
- Headers de segurança configurados no Nginx
- Content Security Policy (CSP)
- Proteção XSS
- Headers anti-clickjacking

## 📊 Monitoramento

- Logs de acesso e erro configurados
- Métricas de performance habilitadas
- Monitoramento de saúde do container

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

- **Documentação**: Consulte este README e comentários no código
- **Issues**: Use o sistema de issues do GitHub para reportar bugs
- **Contato**: Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para profissionais de segurança cibernética**

🛡️ **SecureWatch Dashboard** - Transformando dados de segurança em insights acionáveis