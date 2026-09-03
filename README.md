---

### 2. `README.md` para a pasta do Front-end (`src/frontend/README.md` ou `docs/03-frontend/README.md`)

```markdown
# 🎨 Traveline — Front-end

> Interface de usuário (Web App / Dashboard) do SaaS **Traveline**, focada em usabilidade ágil para operadoras de turismo e um portal intuitivo para o viajante.

---

## 🚀 Sobre o Módulo

Este diretório contém o código-fonte da interface gráfica do Traveline. O front-end consome a API do back-end para renderizar dashboards de controle de viagens, o editor de roteiros (tipo *drag & drop*) e as telas de gerenciamento de clientes e reservas.

---

## 🛠️ Tecnologias Utilizadas

* **Biblioteca / Framework:** [Ex: React / Next.js / Angular / Vue]
* **Estilização:** [Ex: Tailwind CSS / Styled Components / CSS Modules]
* **Gerenciamento de Estado / Rotas:** [Ex: React Router / Context API]

---

## 🗂️ Estrutura de Pastas

```text
src/frontend/
├── src/
│   ├── assets/        # Imagens, ícones e fontes globais
│   ├── components/    # Componentes reutilizáveis (botões, cards, modais)
│   ├── pages/         # Telas principais da aplicação (Dashboard, Roteiros, Login)
│   ├── services/      # Configuração de chamadas HTTP (Axios para a API)
│   └── App.jsx        # Componente raiz e rotas
├── public/            # Arquivos estáticos
└── package.json       # Dependências do projeto
