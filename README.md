#  Kanban API - Desafio Técnico

API para gerenciamento de quadros Kanban utilizando **Node.js**, **TypeScript** e **PostgreSQL**.

---

#  Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/henriquelsx/api-kanban.git
cd api-kanban
```

## 2. Configurar o Ambiente

Renomeie o arquivo:

```
.env.example
```

para:

```
.env
```

Certifique-se de que as credenciais coincidem com as do seu banco local ou Docker.

## 3. Subir a Infraestrutura (Docker)

```bash
docker compose up -d
```

## 4. Instalar Dependências e Rodar

```bash
npm install
npm run dev
```

---

# 🧠 1. Processo de Pensamento

## Endpoints Criados

A API segue os princípios **REST**, estruturada em torno dos seguintes recursos:

### Users
```
POST /api/users
```
Registro de autores dos cards.

### Boards
```
POST /api/boards
```
Criação dos quadros de projeto.

### Columns
```
POST /api/columns
```
Definição das etapas do Kanban (ex: To Do, Doing, Done).

### Cards

Criar card:

```
POST /api/cards
```

Cria uma tarefa vinculada a um autor e a uma coluna.

Mover card entre colunas:

```
PATCH /api/cards/:id/move
```

Endpoint principal responsável pela movimentação lógica entre colunas.

---

# Estrutura do Projeto

Optei por uma **Arquitetura em Camadas (Layered Architecture)** para garantir separação clara de responsabilidades e facilitar manutenção e evolução do sistema.

### Routes
Definição dos endpoints e verbos HTTP.

### Controllers
Manipulação de entrada/saída, validação de dados com **Zod** e orquestração de chamadas.

### Services
Concentração da **lógica de negócio** e interface direta com o driver de banco de dados.

### Models / Schemas
Definição de **interfaces TypeScript** e contratos de validação.

---

# Trade-offs Considerados

## Raw SQL vs ORM

Optei por **não utilizar ORMs** (como Prisma ou Sequelize).

Como DevOps Engineer, prefiro **controle total sobre as queries**, garantindo maior previsibilidade de performance e demonstrando domínio de **SQL puro** através da biblioteca **pg**.

## TSX vs TS-Node-Dev

Durante o desenvolvimento com **Node.js v24**, o executor `ts-node-dev` apresentou instabilidades com **ES Modules (ESM)**.

A solução adotada foi migrar para **tsx**, que possui suporte nativo a ESM e oferece um ciclo de desenvolvimento mais rápido e estável.

---

# O que pode ainda ser implementado no projeto

### Autenticação
Implementaria **proteção de rotas com JWT**.

### CI/CD
Criaria um pipeline no **GitHub Actions** para rodar testes automatizados a cada push.

### Observabilidade
Adicionaria **logs estruturados** e **métricas de tempo de resposta**.

---

#  2. Uso de Inteligência Artificial

Este projeto contou com o suporte técnico do **Gemini (Google)** como único colaborador de IA.

### Ferramenta
Gemini 3 Flash

### Tarefas

**Boilerplate e Tipagem**

Auxílio na geração rápida de:

- Interfaces TypeScript
- Configuração do `tsconfig.json`
- Suporte a módulos modernos

**SQL Schema**

Estruturação do `init.sql` com foco em **chaves estrangeiras (`REFERENCES`)** para garantir **integridade referencial**.

**Troubleshooting de Ambiente**

Diagnóstico do erro de carregamento de módulos **ESM no Node.js v24**, o que fundamentou a transição para o executor **tsx**.

---

# Validação e Adaptação

Nenhuma sugestão foi aplicada sem revisão manual.

As queries SQL foram ajustadas manualmente para incluir a cláusula:

```sql
RETURNING *
```

Isso permite que o **Controller responda com o estado atualizado do banco imediatamente após a movimentação de um card**.

---
##  Testes Unitários

O projeto utiliza **Vitest** para garantir a integridade das regras de negócio e validação de dados. 

### O que é testado?
- **Schemas de Validação (Zod):** Garante que e-mails, nomes e IDs sigam o formato correto.
- **Regras de Movimentação:** Valida se a lógica de transição entre colunas respeita os tipos de dados esperados.

### Como rodar os testes
Para executar a suíte de testes unitários:
```bash
npm test
```

# ✅ Checklist de Entrega

- [x] Repositório público no GitHub  
- [x] README completo e instrutivo  
- [x] Projeto executável via Docker  
- [x] Endpoint de movimentação de cards validado de ponta a ponta

---

<img width="1809" height="407" alt="diagram-export-11-03-2026-17_18_10" src="https://github.com/user-attachments/assets/45dc174c-7291-4306-9550-f1672a95dbc8" />


