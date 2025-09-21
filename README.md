# Microserviço de Listas de Compras - Trabalho 03

## Descrição

Este projeto implementa um sistema de listas de compras baseado em microserviços, utilizando Node.js e Express. O sistema é composto por:
- **user-service**: Gerenciamento de usuários, autenticação JWT
- **item-service**: Catálogo de itens
- **list-service**: CRUD de listas de compras e manipulação de itens nas listas
- **api-gateway**: Roteamento, agregação, service discovery, circuit breaker, health check
- **shared/serviceRegistry.js**: Registro e descoberta de serviços baseada em arquivo
- **client-demo.js**: Cliente de teste automatizado

## Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd trabalho03
```

2. **Instale as dependências em cada serviço:**
```bash
cd api-gateway && npm install && cd ..
cd services/user-service && npm install && cd ../..
cd services/item-service && npm install && cd ../..
cd services/list-service && npm install && cd ../..
```

## Como rodar os serviços

Abra 4 terminais (um para cada serviço):

```bash
# Terminal 1: API Gateway
cd api-gateway
npm start

# Terminal 2: User Service
cd services/user-service
npm start

# Terminal 3: Item Service
cd services/item-service
npm start

# Terminal 4: List Service
cd services/list-service
npm start
```

Os serviços se registram automaticamente no service registry e fazem health check periódico.

## Testando com o client-demo.js

Com todos os serviços rodando, execute na raiz do projeto:

```bash
node client-demo.js
```

O script irá:
1. Registrar um usuário (ou continuar se já existir)
2. Fazer login e obter o token JWT
3. Buscar itens (exemplo: "arroz")
4. Criar uma lista de compras
5. Adicionar um item à lista
6. Consultar o dashboard do usuário

A saída será exibida em blocos separados para cada etapa.

## Endpoints principais

- **User Service**
  - POST `/auth/register` - Registro de usuário
  - POST `/auth/login` - Login (retorna JWT)
  - GET `/users/:id` - Dados do usuário (JWT)

- **Item Service**
  - GET `/items` - Listar itens
  - GET `/items/:id` - Detalhe do item
  - GET `/search?q=termo` - Buscar itens por nome
  - POST `/items` - Criar item (JWT)

- **List Service**
  - GET `/lists` - Listar listas do usuário (JWT)
  - POST `/lists` - Criar lista (JWT)
  - POST `/lists/:id/items` - Adicionar item à lista (JWT)
  - PUT/DELETE `/lists/:id` - Atualizar/Remover lista (JWT)

- **API Gateway**
  - Todos os endpoints acima via `/api/`
  - GET `/api/dashboard` - Dashboard agregado do usuário (JWT)
  - GET `/api/search?q=termo` - Busca global (listas + itens, JWT)
  - GET `/health` - Health check dos serviços
  - GET `/registry` - Serviços registrados

## Service Registry
- Registro automático de serviços
- Descoberta por nome
- Health checks periódicos
- Cleanup automático na saída

## Vídeo de Demonstração

Um vídeo de demonstração do sistema estará disponível na pasta `video-apresentacao` deste repositório.

## Observações
- Todos os serviços usam autenticação JWT para rotas protegidas.
- O gateway implementa circuit breaker e health check distribuído.
- O banco de dados é um arquivo JSON simples (NoSQL).
- Para testar manualmente, utilize também a collection Postman disponível em `API-Lista-de-compras.postman_collection.json`.

---

