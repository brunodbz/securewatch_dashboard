# Dockerfile para aplicação React com Vite
FROM node:18-alpine as build

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Construir aplicação
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar arquivos construídos para nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração personalizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]