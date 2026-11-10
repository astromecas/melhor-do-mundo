# 🏆 Prêmio Melhor do Mundo - Sistema de Votação e Apuração

Aplicação web completa desenvolvida para eleger o melhor atleta do mundo através de votação interativa e apuração estatística em tempo real.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** com hooks customizados (`useState`, `useEffect`, `useCallback`, `useMemo`).
- **Vite** para build rápido e Hot Module Replacement (HMR).
- **CSS3 Moderno** com Design Tokens, Glassmorphism, animações e responsividade total.
- **Google Fonts** (Plus Jakarta Sans & Space Grotesk).

### Backend
- **Node.js** com **Express**.
- **Prisma ORM** para modelagem e mapeamento objeto-relacional.
- **PostgreSQL** para persistência dos dados de votação e candidatos.
- **CORS** para integração segura com a interface web.

---

## 📁 Estrutura do Projeto

```text
melhor-do-mundo.moana/
├── public/                 # Arquivos públicos e ícones
├── src/                    # Código-fonte da aplicação React
│   ├── components/         # Componentes modulares da interface
│   │   ├── AddCandidateModal.jsx  # Modal de cadastro de novos atletas com live preview
│   │   ├── CandidateCard.jsx      # Card individual do candidato com barra de progresso
│   │   ├── CandidateGrid.jsx      # Grade de exibição e estados de busca vazia
│   │   ├── FilterControls.jsx     # Barra de pesquisa, filtro por modalidade e ordenação
│   │   ├── Footer.jsx             # Rodapé informativo
│   │   ├── HeroBanner.jsx         # Destaque com métricas e card do líder atual
│   │   ├── Navbar.jsx             # Barra de navegação e ações rápidas
│   │   ├── Podium.jsx             # Pódio 3D com os 3 primeiros colocados (Ouro, Prata, Bronze)
│   │   └── ToastContainer.jsx     # Sistema de notificações flutuantes
│   ├── hooks/
│   │   └── useVotingSystem.js     # Hook central com toda lógica de estado e apuração
│   ├── services/
│   │   └── athleteApi.js          # Camada de comunicação HTTP com a API
│   ├── App.jsx                    # Composição principal da interface
│   ├── index.css                  # Folha de estilo e design system
│   └── main.jsx                   # Ponto de montagem da raiz React
│
├── server/                 # Backend Node.js / Express
│   ├── prisma/
│   │   ├── schema.prisma   # Esquema da tabela 'candidatos'
│   │   └── seed.js         # Script de carga inicial de atletas
│   └── src/
│       ├── database/
│       │   └── client.js   # Instância do cliente Prisma
│       ├── controllers/
│       │   ├── candidatesController.js # Lógica de negócio dos candidatos e votos
│       │   └── statsController.js      # Métricas e contagem de votos
│       ├── routes/
│       │   ├── candidatesRouter.js     # Rotas REST de candidatos
│       │   └── statsRouter.js          # Rota de estatísticas da apuração
│       └── server.js       # Inicialização do servidor Express
│
├── index.html              # HTML base da aplicação
├── package.json            # Dependências do frontend
└── vite.config.js          # Configuração do Vite
```

---

## 🛠️ Como Executar o Projeto

### 1. Inicializar o Backend

Abra um terminal e acesse a pasta `server`:

```bash
cd server
npm install
```

Configure o arquivo `.env` com a URL do seu banco PostgreSQL:
```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/melhor_do_mundo?schema=public"
```

Gere as migrações e popule o banco (se necessário):
```bash
npx prisma db push
npm run prisma:seed
```

Inicie o servidor da API:
```bash
npm run dev
# Servidor disponível em http://localhost:3001
```

---

### 2. Inicializar o Frontend

Em outro terminal, na pasta raiz do projeto:

```bash
npm install
npm run dev
# Aplicação disponível em http://localhost:5173
```

---

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/candidatos` | Lista todos os indicados ordenados por votos |
| `GET` | `/api/candidatos/:id` | Retorna os detalhes de um candidato específico |
| `POST` | `/api/candidatos` | Cadastra um novo atleta para a votação |
| `PATCH` | `/api/candidatos/:id/votar` | Incrementa em +1 o voto do atleta informado |
| `DELETE` | `/api/candidatos/:id` | Remove um candidato do sistema |
| `POST` | `/api/candidatos/zerar-votos` | Zera a contagem de votos de todos os candidatos |
| `GET` | `/api/stats` | Retorna total de votos, atleta líder e contagem geral |
