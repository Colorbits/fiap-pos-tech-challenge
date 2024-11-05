# Imagem base. Estamos usando uma imagem baseada no alpine para otimizar o tamanho da imagem do container.
FROM node:20-alpine3.20

# Criando diretório base da aplicação.
WORKDIR /usr/src/app

# Instalando curl para usar comando de health check.
RUN apk add curl

# Copiando arquivos do projeto para gerar distribuição. Nem todos os arquivos são copiados, somente os necessários para
# buildar o projeto. Arquivos ignorados são especificados no arquivo .dockerignore.
COPY ../../ .

# Instalando dependencias do projeto. Usando `npm ci` ao invés de `npm install` porque ele é otimizado para ambientes
# de distribuição e não instala as dependencias do ambiente de desenvolvimento, deixando a imagem do container otimizada.
RUN npm ci

## Buildando o projeto
RUN npm run build

# Por padrão o projeto executa na porta 5000.
EXPOSE 3000

## Start the server using the production build
CMD [ "node", "dist/main.js" ]

