# Sistema de Doações - Lar de Idosos Francisco de Assis

Uma aplicação fullstack moderna para gerenciamento de doações e voluntários do Lar de Idosos Francisco de Assis, desenvolvida como projeto extensionista do curso de Análise e Desenvolvimento de Sistemas.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** - Framework JavaScript para interfaces de usuário
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **Framer Motion** - Biblioteca de animações para React
- **React Hook Form** - Gerenciamento de formulários com validação
- **Heroicons** - Ícones SVG otimizados
- **Axios** - Cliente HTTP para requisições API

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Middleware para compartilhamento de recursos

## 📋 Funcionalidades

### Dashboard
- 📊 Visualização de estatísticas gerais
- 📈 Contadores de doações e voluntários
- 🎨 Interface moderna e responsiva

### Gerenciamento de Doações
- ➕ Cadastro de novas doações
- ✏️ Edição de doações existentes
- 🗑️ Exclusão de doações
- 🔍 Busca em tempo real
- 📱 Interface responsiva

### Gerenciamento de Voluntários
- ➕ Cadastro de novos voluntários
- ✏️ Edição de voluntários existentes
- 🗑️ Exclusão de voluntários
- 🔍 Busca em tempo real
- 📱 Interface responsiva

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- MongoDB (local ou Atlas)

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/sistema-doacoes.git
cd sistema-doacoes
```

### 2. Instale as dependências do frontend
```bash
npm install
```

### 3. Configure o backend
```bash
cd server
npm install
```

### 4. Configure as variáveis de ambiente

#### Backend (.env no diretório server/)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sistema-doacoes
NODE_ENV=development
```

#### Frontend (.env na raiz do projeto)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Inicie o MongoDB
Certifique-se de que o MongoDB está rodando localmente ou configure a conexão com MongoDB Atlas.

### 6. Execute a aplicação

#### Terminal 1 - Backend
```bash
cd server
npm start
# ou para desenvolvimento com nodemon
npm run dev
```

#### Terminal 2 - Frontend
```bash
npm start
```

A aplicação estará disponível em:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📡 API Endpoints

### Doações
- `GET /api/doacoes` - Listar todas as doações
- `POST /api/doacoes` - Criar nova doação
- `PUT /api/doacoes/:id` - Atualizar doação
- `DELETE /api/doacoes/:id` - Deletar doação

### Voluntários
- `GET /api/voluntarios` - Listar todos os voluntários
- `POST /api/voluntarios` - Criar novo voluntário
- `PUT /api/voluntarios/:id` - Atualizar voluntário
- `DELETE /api/voluntarios/:id` - Deletar voluntário

## 🎨 Design System

### Cores Principais
- **Azul**: #3B82F6 (ações de doações)
- **Verde**: #10B981 (ações de voluntários)
- **Roxo**: #8B5CF6 (dashboard)
- **Cinza**: #6B7280 (textos e elementos neutros)

### Componentes
- **Botões**: Bordas arredondadas, hover effects, estados de loading
- **Inputs**: Foco com ring, validação visual
- **Cards**: Sombras suaves, transições
- **Ícones**: Heroicons para consistência visual

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:
- 📱 Dispositivos móveis
- 📟 Tablets
- 💻 Desktops
- 🖥️ Telas grandes

## 🔧 Scripts Disponíveis

### Frontend
```bash
npm start          # Inicia o servidor de desenvolvimento
npm run build      # Cria build de produção
npm test           # Executa testes
npm run eject      # Remove ferramentas de build (irreversível)
```

### Backend
```bash
npm start          # Inicia o servidor
npm run dev        # Inicia com nodemon (desenvolvimento)
```

## 🚀 Deploy

### Frontend (Vercel/Netlify)
1. Execute `npm run build`
2. Faça upload da pasta `build` para sua plataforma de hospedagem
3. Configure as variáveis de ambiente

### Backend (Heroku/Render)
1. Configure o banco MongoDB Atlas
2. Faça deploy do código do backend
3. Configure as variáveis de ambiente no serviço de hospedagem

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: [Seu Nome]
- **Orientação**: Professor [Nome do Professor]
- **Instituição**: [Nome da Instituição]

## 🙏 Agradecimentos

- Lar de Idosos Francisco de Assis pela oportunidade
- Professores e colegas do curso de Análise e Desenvolvimento de Sistemas
- Comunidade open source pelas ferramentas utilizadas

---

**Status do Projeto**: ✅ Concluído e pronto para uso profissional
