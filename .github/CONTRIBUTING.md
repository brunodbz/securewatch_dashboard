# Guia de Contribuição

Obrigado por considerar contribuir para o SecureWatch Dashboard! Este documento contém diretrizes para contribuir com o projeto.

## 🚀 Como Contribuir

### 1. Fork e Clone
```bash
# Fork o repositório no GitHub
# Clone seu fork localmente
git clone https://github.com/seu-usuario/securewatch-dashboard.git
cd securewatch-dashboard
```

### 2. Configuração do Ambiente
```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### 3. Faça suas Alterações
- Crie uma nova branch para sua feature/correção
- Siga os padrões de código estabelecidos
- Adicione testes quando apropriado
- Mantenha a documentação atualizada

### 4. Teste suas Alterações
```bash
# Execute os testes
npm test

# Verifique a build
npm run build
```

### 5. Envie um Pull Request
- Descreva claramente as mudanças realizadas
- Inclua screenshots se aplicável
- Referencie issues relacionadas

## 📝 Padrões de Código

### JavaScript/React
- Use functional components com hooks
- Implemente optional chaining (?.) para acesso seguro a propriedades
- Mantenha componentes pequenos e focados
- Use nomes descritivos para variáveis e funções

### CSS/Styling
- Use Tailwind CSS para estilização
- Mantenha classes organizadas e reutilizáveis
- Prefira utility classes sobre CSS customizado

### Commits
Use o padrão Conventional Commits:
```
feat: adiciona nova funcionalidade de exportação
fix: corrige bug no filtro de departamentos
docs: atualiza documentação de instalação
style: ajusta formatação do código
refactor: reestrutura componente de header
test: adiciona testes para componente de métricas
```

## 🐛 Reportando Bugs

Ao reportar bugs, inclua:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots/logs quando aplicável
- Informações do ambiente (OS, browser, versão)

## 💡 Sugerindo Melhorias

Para sugerir melhorias:
- Use o template de issue apropriado
- Explique o caso de uso
- Forneça exemplos quando possível
- Considere a viabilidade técnica

## 🎯 Áreas Prioritárias

Contribuições são especialmente bem-vindas em:
- Melhorias de performance
- Acessibilidade
- Testes automatizados
- Documentação
- Internacionalização
- Novos componentes de visualização

## 📚 Recursos

- [Documentação do React](https://reactjs.org/docs)
- [Guia do Tailwind CSS](https://tailwindcss.com/docs)
- [Padrões de Commit](https://www.conventionalcommits.org/)

## ⚡ Configuração de Desenvolvimento Rápida

```bash
# Com Docker
docker-compose --profile dev up

# Sem Docker
npm install && npm start
```

## 🔍 Code Review

Todo código passa por review. Critérios incluem:
- Funcionalidade correta
- Código limpo e legível
- Performance adequada
- Testes apropriados
- Documentação atualizada

Obrigado por contribuir! 🎉