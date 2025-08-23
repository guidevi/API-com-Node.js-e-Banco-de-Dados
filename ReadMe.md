### Projeto: API REST com Node.js, Express e MongoDB (via Prisma)

### Sobre o projeto

Este repositório contém o backend de uma **API REST construída do zero**, em **Node.js**, utilizando **Express** como framework, com persistência de dados em **MongoDB**, acessado via **Prisma** (ORM). A API fornece funcionalidades de **CRUD completo** para usuários — criação, listagem, edição e remoção — e me serviu como base de aprendizado e aplicação prática dos principais conceitos de backend.
**Observação**: Esse projeto é a parte 1 de um projeto maior de Cadastro de Usuários, essa primeira parte é só a criação da API, em meu github(https://github.com/guidevi?tab=repositories) no repositório 'CadastroDeUsuarios(React)' está a segundo(e ultima) parte do projeto onde conecto a API à uma página Front feita com React(via Vite). 

---

### Tecnologias usadas

* **Node.js** — execução do servidor e ambiente JavaScript no backend.
* **Express** — framework web para definição de rotas e tratamento HTTP (GET, POST, PUT, DELETE).
* **MongoDB** — banco de dados NoSQL para armazenamento persistente de dados.
* **Prisma** — ORM para modelagem e comunicação com o MongoDB (incluindo Prisma Client e Prisma Studio).
* **npm** — gerenciador de dependências do projeto.

---

### Pré-requisitos

* Node.js (preferencialmente versão LTS)
* Conta no MongoDB Atlas (plano grátis)

---

### Configuração inicial(Caso queira implementa-lo em seu projeto)

1. **Clone o repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <PASTA_DO_PROJETO>
   ```

2. **Instale dependências**

   ```bash
   npm install
   ```

3. **Configure a conexão com o MongoDB Atlas**

   * Crie um cluster gratuito no Atlas e um banco de dados (ex: `users`).
   * Permita acesso de qualquer IP (em desenvolvimento).
   * Defina um usuário e senha para o banco.
   * Copie a **connection string** e cole em um arquivo `.env` com a variável:

     ```
     DATABASE_URL="mongodb+srv://<USUARIO>:<SENHA>@<CLUSTER>.mongodb.net/users?retryWrites=true&w=majority"
     ```

4. **Configure o Prisma**

   * Inicialize o Prisma:

     ```bash
     npx prisma init
     ```
   * No `schema.prisma`, cole a connection string em `datasource` e defina o modelo `User` (com campos como `id`, `email`, `name?`, `age` etc.).
   * Gere o banco com:

     ```bash
     npx prisma db push
     ```

5. **Instale o Prisma Client** (dependência de produção para uso no código):

   ```bash
   npm install @prisma/client
   ```

---

### Modelos e banco

Exemplo de modelo de usuário no `schema.prisma`:

```prisma
model User {
  id    String @id @default(auto()) @map("_id")
  email String @unique
  name  String?
  age   String
}
```

Esse modelo garante que cada usuário tenha um **ID único gerado automaticamente**, um **e-mail único**, e campos para `name` (opcional) e `age`.

---

### Endpoints da API

| Método   | Rota         | Ação                                                                   |
| -------- | ------------ | ---------------------------------------------------------------------- |
| `POST`   | `/users`     | Cria um novo usuário (body: `email`, `name`, `age`)                    |
| `GET`    | `/users`     | Lista todos os usuários (com possibilidade de filtro via query params) |
| `PUT`    | `/users/:id` | Atualiza um usuário específico pelo ID                                 |
| `DELETE` | `/users/:id` | Remove um usuário específico pelo ID                                   |

A API utiliza **status codes** adequados (ex: 201 para criação, 200 para sucesso, 404 para não encontrado, etc.) e responde em JSON.

---

### Como executar

1. Inicie o servidor com *hot reload* durante o desenvolvimento:

   ```bash
   npm run dev
   ```

   *(ou use `node --watch server.js` se preferir)*

2. Se necessário, abra a interface visual com Prisma Studio para explorar os dados:

   ```bash
   npx prisma studio
   ```

3. Use ferramentas como **Thunder Client** ou **Postman** para testar os endpoints:

   * **Criar usuário (POST /users)**
     Exemplo de corpo JSON:

     ```json
     {
       "email": "usuario@exemplo.com",
       "name": "Usuário",
       "age": "30"
     }
     ```

   * **Listar usuários (GET /users)**
     Pode incluir filtros, por exemplo:

     ```
     GET /users?name=Joao&age=25
     ```

   * **Editar usuário (PUT /users/\:id)**
     Envie no corpo os campos a atualizar.

   * **Deletar usuário (DELETE /users/\:id)**

---

### Extras

* **Filtros**: usando query params (como `name`, `age`) para filtrar resultados via Prisma `findMany({ where: { ... } })`.
* **Responsividade**: respostas com JSON e códigos HTTP adequados.
* **Boa prática**: uso de **await/async** nas operações de banco (Evita race condition e mantém sincronização correta).


