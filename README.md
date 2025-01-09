
# Documentação - Tech Challenge FIAP
### Grupo 66 - 9SOAT

 - Bruno Zanella
 - Gabriel Ferreira Umbelino
 - Michael Dougras da Silva
 - Victor Zaniquelli

## Introdução
Este projeto almeja atender as necessidades destacadas para a *Lanchonete Evans*, da qual, devido a seu crescimento, se viu na necessidade de um sistema sólido e coeso de pedidos que atenda suas necessidades. Este sistema de autoatendimento permitirá que os clientes façam seus pedidos de forma autônoma, utilizando dispositivos e interfaces intuitivas. Com isso, espera-se melhorar a precisão dos pedidos, reduzir o tempo de espera e aumentar a satisfação dos clientes.
A implementação deste sistema visa resolver problemas comuns em lanchonetes em expansão, como a confusão na comunicação entre atendentes e cozinha, atrasos na preparação dos pedidos e insatisfação dos clientes.

## Escopo do Sistema


### Pedido
- Interface de seleção para clientes:
  - Identificação via CPF, cadastro com nome e e-mail, ou anonimato.
  - Montagem de combo em sequência opcional:
    1. Lanche
    2. Acompanhamento
    3. Bebida
    4. Sobremesa
  - Exibição de nome, descrição e preço de cada produto em cada etapa.

### Pagamento
- Opção de pagamento integrada para MVP:
  - Pagamento via QRCode do Mercado Pago.

### Acompanhamento
- Após confirmação e pagamento do pedido:
  - Envio para a cozinha.
  - Monitor para cliente acompanhar progresso:
    - Recebido
    - Em preparação
    - Pronto
    - Finalizado

### Entrega
- Notificação ao cliente quando o pedido estiver pronto para retirada.
- Atualização do pedido para status finalizado após retirada.

### Acesso Administrativo
- **Gerenciar clientes**:
  - Identificação para campanhas promocionais.
- **Gerenciar produtos e categorias**:
  - Definição de nome, categoria, preço, descrição e imagens.
  - Categorias fixas:
    - Lanche
    - Acompanhamento
    - Bebida
    - Sobremesa
- **Acompanhamento de pedidos**:
  - Acompanhamento de pedidos em andamento e tempo de espera.
- **Painel administrativo**:
  - Gerenciamento das informações do sistema de pedidos.

### Diagramas

##### Arquitetura Hexagonal

![Arquitetura Hexagonal](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/arquitetura-hexagonal.png?raw=true)

##### Domain Storytelling

![Diagrama 1 - Cadastro de cliente](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Domain%20Storytelling/01%20-%20Cadastro%20cliente_2024-09-14.png?raw=true)

![Diagrama 2 - Pedido](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Domain%20Storytelling/02%20-%20Pedido_2024-09-26.png?raw=true)

![Diagrama 3 - Pagamento](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Domain%20Storytelling/03%20-%20Pagamento_2024-09-25.png?raw=true)

![Diagrama 4 - Acompanhamento do Pedido](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Domain%20Storytelling/04%20-%20Acompanhamento%20de%20pedido_2024-09-25.png?raw=true)

![Diagrama 5 - Acompanhamento (cozinha)](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Domain%20Storytelling/05%20-%20Acompanhamento%20(cozinha)_2024-09-25.png?raw=true)

![Diagrama 6 - Entrega](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Domain%20Storytelling/06%20-%20Entrega_2024-09-25.png?raw=true)


![Diagrama 7 - Gerenciar produtos e categorias](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Domain%20Storytelling/07%20-%20Gerenciar%20produtos%20e%20categorias_2024-09-15.png?raw=true)


##### Event Storming (Miro)
![Diagrama 1](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Event%20Storming/Event%20Storming%20P%C3%93S%20TECH%20FIAP%20(2).jpg?raw=true)

[Veja esse diagrama no Miro](https://miro.com/app/board/uXjVKiHE9p8=/?moveToViewport=-273,173,5636,1057&embedId=817689355251)



![Diagrama 2](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Event%20Storming/Event%20Storming%20P%C3%93S%20TECH%20FIAP.jpg?raw=true)

[Veja esse diagrama no Miro](https://miro.com/app/live-embed/uXjVKiHE9p8=/?moveToViewport=-645,2257,5324,2449&embedId=118695308647)



![Diagrama 3](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/development/docs/Fase%201/Event%20Storming/Event%20Storming%20P%C3%93S%20TECH%20FIAP%20(3).jpg?raw=true)

[Veja esse diagrama no Miro](https://miro.com/app/live-embed/uXjVKiHE9p8=/?moveToViewport=5518,2442,1255,1365&embedId=549875798417)


### Dicionário de linguagem Ubíqua

 - Cliente: É a entidade responsável por realizar pedidos na lanchonete.

 - Sistema: Programa de computador onde clientes e funcionários interagem para gerenciar pedidos, produtos, clientes e pagamentos.

 - Lanchonete: Entidade responsável por interagir com o cliente e o sistema capaz de criar pedidos e gerenciar clientes.

 - Produto: Item produzido pela lanchonete podendo pertencer a uma das seguintes categorias: lanche, bebida, acompanhamento, sobremesa.

 - Cozinha: Entidade responsável por receber pedidos e atualizar o status dos mesmos no sistema de cozinha.

 - Pedido: Conjunto de produtos selecionados pelo cliente e que será produzido pela cozinha da lanchonete.

 - Mercado Pago: Entidade responsável por processar os pagamentos do sistema da lanchonete.

 - Cozinheiro: pessoa responsável por produzir os pedidos recebidos pelo restaurante.

 - Sistema Cozinha: Parte do sistema utilizado para gerenciar pedidos, acessível somente pelos funcionários da cozinha.

 - Comprovante de compra: Recibo gerado pelo sistema após a confirmação do pagamento no mercado pago.

 - Lista de produtos: Tela no sistema onde a lanchonete pode visualizar os produtos cadastrados.


### Tech Stack

- Node.js 20
- TypeScript 5.1.3
- NestJS 10
- PostgreSQL 17
- Alpine 3.20
- Docker


## Instalação do projeto
### DOCKER
Este projeto pode ser executado em um ambiente Docker, dispensando qualquer instalação adicional.
Se você não possui o Docker instalado, siga as instruções para seu sistema operacional na [documentação oficial do Docker](https://docs.docker.com/get-docker).

#### 1 - Crie um arquivo .env.local em na pasta /envs localizada na raiz do projeto

#### 2 - Adicione o seguinte conteudo ao arquivo criado

```
ENV=local
PORT=3000
URL=localhost
POSTGRES_HOST=localhost
POSTGRES_PORT=3306
POSTGRES_USER=fiapuser
POSTGRES_PASSWORD=123456
POSTGRES_DATABASE=fiap-pos-tech-challenge
```

#### 3 - Inicialize o projeto executando o seguinte comando no terminal
```
npm run start:docker
```

## Comandos Docker

-   `npm run start:docker`: Inicializa a aplicação da API e um contêiner de banco de dados integrados.

-   `npm run stop:docker`: Desliga os contêineres da aplicação e banco de dados sem destruir os volumes associados aos contêineres, preservando os dados no banco.

-   `npm run purge:docker`: Desliga os contêineres e descarta os volumes associados, eliminando todos os dados gerados. Útil para reiniciar com um banco limpo.


A composição de contêineres foi construída para garantir que o contêiner da API só inicie quando o banco de dados estiver pronto para receber conexões, assegurando a correta inicialização do ambiente.


### Kubernetes
Este projeto pode ser executado em um ambiente kubernetes, dispensando qualquer instalação adicional.
Se você não possui o Kubernetes instalado, siga as instruções para seu sistema operacional na [documentação oficial do Kubernetes](https://kubernetes.io/docs/tasks/tools/).

#### 1 - Inicialize o projeto executando o seguinte comando no terminal
```
npm run start:kubernetes
```


### Node.js
Este projeto pode ser executado utilizando node.js em sua maquina.
Se você não possui o Node.js instalado, siga as instruções para seu sistema operacional na [documentação oficial do Node.js](https://nodejs.org/en/download).

#### 1 - Inicialize o projeto executando o seguinte comando no terminal
```
npm install

npm run start
```


## Execução via Postman

Se você já completou um dos passos anteriores ([Instalação do projeto](#instala%C3%A7%C3%A3o-do-projeto) ou [Desenvolvimento](#desenvolvimento)), é possível importar uma coleção JSON do Postman com todos os endpoints já configurados para testar diretamente a API.

Caso não tenha o Postman instalado, siga as instruções para o seu sistema operacional na [documentação oficial do Postman](https://learning.postman.com/docs/getting-started/installation/installation-and-updates/).

A coleção do Postman está disponível [neste link](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Postman/fiap-app.postman_collection.json). Você pode baixá-la e importar diretamente no seu Postman para realizar os testes necessários.

Se precisar de orientação, a documentação oficial do Postman possui um [passo a passo de como importar dados](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/).

## Swagger 

Todos os endpoints da API do projeto também podem ser consultados via Swagger.

Se o projeto estiver sendo executado localmente, o Swagger estará disponível na URL:  
[http://localhost:3000/api](http://localhost:3000/api)

Além disso, você pode acessar o JSON de especificação OpenAPI, que estará disponível na URL:  
[http://localhost:3000/api-json](http://localhost:3000/api-json)