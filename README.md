  # 🌱 CarbonApp – Backend

API do **CarbonApp** para registrar ações sustentáveis, calcular EcoPontos e fornecer dados para o frontend.

---

## 🚀 Tecnologias

- Node.js + Express
- Firebase Auth (ou outro método de autenticação)
- MongoDB ou PostgreSQL
- REST API (com endpoints para ações, usuários e rankings)
- Node Cron / Jobs para cálculos periódicos

---

## 📂 Estrutura de pastas sugerida

 backend/
│── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ └── app.js
│── package.json
│── .env.example
│── .gitignore


---

## 🔧 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Git
- Banco de dados (MongoDB ou PostgreSQL)

### Passos
```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

O servidor rodará por padrão em http://localhost:3000.

📝 Contribuição

Crie uma branch a partir de main:

git checkout -b feature/nome-da-feature


Faça commits claros:

feat: adicionar endpoint de registro de ação
fix: correção de cálculo de EcoPontos


Abra Pull Request para revisão.

📜 Licença

MIT


---

### 🔹 Próximo passo no seu backend

1. Salve esse conteúdo em `backend/README.md`.  
2. Se ainda não puxou o remoto, rode:

```powershell
git pull origin main --allow-unrelated-histories
