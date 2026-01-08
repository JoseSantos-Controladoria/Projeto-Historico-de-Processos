# Análise Arquitetural do Projeto: Sistema de Investigação de Colaboradores

## 📋 Visão Geral do Projeto

Este é um **sistema de investigação de colaboradores** (ou "Histórico de Processos"), construído como uma aplicação web full-stack. O frontend é desenvolvido em **React 18 com TypeScript**, utilizando **Vite** como bundler e **Tailwind CSS** para estilização. O backend é uma **API REST em Express.js com TypeScript**, conectada a um banco de dados **PostgreSQL**. O sistema permite consultas a dossiês de funcionários e processos administrativos/disciplinares de forma intuitiva e organizada.

A arquitetura segue princípios de **separação de responsabilidades** (frontend/backend), **componentização modular** (features-based), e **padrões de design** como MVC no backend e hooks customizados no frontend. É um projeto educacional/prático, demonstrando boas práticas de desenvolvimento moderno em um contexto corporativo de gestão de recursos humanos e compliance.

## 🎯 Objetivo e Finalidade

- **Objetivo**: Demonstrar uma aplicação completa de investigação interna, com foco em usabilidade, performance e manutenibilidade.
- **Finalidade**: Facilitar consultas rápidas a dados sensíveis de colaboradores, promovendo transparência e eficiência em processos disciplinares/administrativos.

## 🚀 Tecnologias e Arquitetura

### Core
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React (ícones), Recharts (gráficos).
- **Backend**: Express.js, TypeScript, PostgreSQL (via pg), CORS, dotenv.
- **Build/Dev**: ESLint, PostCSS, Autoprefixer.

### Arquitetura
- **Frontend**: SPA (Single Page Application) com roteamento por estado, organizada em features (investigation, dashboard).
- **Backend**: API REST seguindo padrão MVC (Controllers → Services → Repositories).
- **Banco**: PostgreSQL para persistência de processos, funcionários e históricos.
- **Comunicação**: HTTP/JSON entre frontend e backend.

## 📁 Documentação Detalhada de Cada Pasta/Arquivo

Abaixo, uma análise completa de **cada pasta e arquivo**, incluindo propósito, objetivo e finalidade. Baseada em exploração direta do código.

### Arquivos na Raiz do Projeto
1. **index.html**
   - **Propósito**: Arquivo HTML base que serve como ponto de entrada para a aplicação React, contendo o elemento `<div id="root">` onde o app é montado.
   - **Objetivo**: Fornecer a estrutura HTML mínima necessária para uma SPA (Single Page Application) em Vite.
   - **Finalidade**: Permite que o Vite injete o bundle JavaScript e renderize a interface React, conectando frontend e navegador.

2. **package.json** (Raiz)
   - **Propósito**: Define dependências, scripts e metadados do projeto frontend (React/Vite). Inclui scripts como `dev`, `build`, `lint`.
   - **Objetivo**: Gerenciar dependências do frontend (React, Tailwind, Lucide) e scripts de build/desenvolvimento.
   - **Finalidade**: Facilita instalação de pacotes via npm/yarn e execução de tarefas como desenvolvimento local ou produção. (Nota: Contém "express" como dependência, o que parece um erro de configuração, pois o backend tem seu próprio package.json.)

3. **postcss.config.js**
   - **Propósito**: Configuração do PostCSS para processar CSS, incluindo Autoprefixer para adicionar prefixos CSS automaticamente.
   - **Objetivo**: Otimizar e compatibilizar estilos CSS gerados pelo Tailwind.
   - **Finalidade**: Garante que o CSS funcione em navegadores antigos, integrando-se ao pipeline de build do Vite.

4. **tailwind.config.js**
   - **Propósito**: Configuração do Tailwind CSS, definindo temas, cores e utilitários personalizados.
   - **Objetivo**: Personalizar o framework CSS para o design system do projeto (cores slate, blue, etc.).
   - **Finalidade**: Permite estilização consistente e rápida via classes utilitárias, evitando CSS customizado excessivo.

5. **tsconfig.json**
   - **Propósito**: Configuração do TypeScript para o frontend, definindo target ES2020, JSX React, e opções de linting.
   - **Objetivo**: Compilar TypeScript para JavaScript compatível, com checagem de tipos rigorosa.
   - **Finalidade**: Garante segurança de tipos no frontend, prevenindo erros em runtime e melhorando manutenibilidade.

6. **tsconfig.node.json**
   - **Propósito**: Configuração TypeScript específica para arquivos de build (como vite.config.ts).
   - **Objetivo**: Separar configurações para código de aplicação vs. build tools.
   - **Finalidade**: Otimiza compilação e evita conflitos entre configurações.

7. **vite.config.ts**
   - **Propósito**: Configuração do Vite, incluindo plugin React para transformação de JSX.
   - **Objetivo**: Definir como o bundler processa e serve a aplicação em desenvolvimento/produção.
   - **Finalidade**: Habilita hot-reload rápido, build otimizado e integração com React.

### Pasta `backend/`
   - **Propósito**: Contém o código do servidor backend (API REST em Express/TypeScript).
   - **Objetivo**: Implementar lógica de negócio, acesso a dados e endpoints para o frontend.
   - **Finalidade**: Separa responsabilidades, permitindo escalabilidade e manutenção independente do frontend.

1. **package.json** (Backend)
   - **Propósito**: Define dependências do backend (Express, pg para PostgreSQL, cors, dotenv).
   - **Objetivo**: Gerenciar pacotes específicos do servidor, como banco de dados e middlewares.
   - **Finalidade**: Permite instalação isolada e scripts como `dev` (ts-node) e `start` (produção).

2. **tsconfig.json** (Backend)
   - **Propósito**: Configuração TypeScript para o backend, focada em Node.js (target ES2020, module CommonJS).
   - **Objetivo**: Compilar código TypeScript para execução em Node.js.
   - **Finalidade**: Garante tipagem e compatibilidade no servidor.

3. **Pasta `src/` (Backend)**
   - **Propósito**: Código fonte do backend, organizado em camadas (controllers, repositories, services, etc.).
   - **Objetivo**: Estruturar o código de forma modular e seguindo MVC.
   - **Finalidade**: Facilita testes, manutenção e separação de responsabilidades (ex.: controllers lidam com HTTP, services com lógica).

   1. **app.ts**
      - **Propósito**: (Arquivo vazio na leitura; provavelmente placeholder.) Configuraria middlewares Express.
      - **Objetivo**: Centralizar configuração da app Express.
      - **Finalidade**: Preparar o app para rotas e middlewares.

   2. **routes.ts**
      - **Propósito**: Define rotas da API (ex.: /api/investigation/search, /api/dashboard/kpis).
      - **Objetivo**: Mapear endpoints para controllers (InvestigationController, DashboardController).
      - **Finalidade**: Organiza a API REST, conectando requisições HTTP à lógica de negócio.

   3. **server.ts**
      - **Propósito**: Ponto de entrada do servidor, configura Express, CORS, JSON parsing e inicia na porta 3000.
      - **Objetivo**: Inicializar e executar o servidor.
      - **Finalidade**: Conecta o backend ao mundo externo, servindo a API.

   4. **Pasta `config/`**
      - **Propósito**: Configurações do projeto, como conexão com banco.
      - **Objetivo**: Centralizar settings (ex.: database.ts para PostgreSQL).
      - **Finalidade**: Facilita mudanças de ambiente (dev/prod) via variáveis.

      1. **database.ts**
         - **Propósito**: Configura conexão com PostgreSQL usando pg.
         - **Objetivo**: Abstrair acesso ao banco.
         - **Finalidade**: Permite queries seguras e reutilizáveis.

   5. **Pasta `controllers/`**
      - **Propósito**: Lida com requisições HTTP, validando e respondendo.
      - **Objetivo**: Controlar fluxo de entrada/saída da API.
      - **Finalidade**: Separa lógica HTTP de negócio, seguindo MVC.

      1. **DashboardController.ts**
         - **Propósito**: Endpoints para dashboard (KPIs, analytics como gráficos de evolução).
         - **Objetivo**: Fornecer dados para métricas e visualizações.
         - **Finalidade**: Alimenta o frontend com estatísticas em tempo real.

      2. **InvestigationController.ts**
         - **Propósito**: Endpoints para busca de pessoas/processos e histórico.
         - **Objetivo**: Gerenciar consultas de investigação.
         - **Finalidade**: Conecta frontend à lógica de busca no banco.

   6. **Pasta `repositories/`**
      - **Propósito**: Acesso direto ao banco de dados (queries SQL).
      - **Objetivo**: Abstrair operações de dados.
      - **Finalidade**: Isola queries, facilitando testes e mudanças de DB.

      1. **DashboardRepository.ts**
         - **Propósito**: Queries para KPIs e analytics (ex.: evolução, distribuição).
         - **Objetivo**: Buscar dados agregados para dashboard.
         - **Finalidade**: Fornece dados para gráficos e métricas.

      2. **InvestigationRepository.ts**
         - **Propósito**: Queries para processos e pessoas.
         - **Objetivo**: Recuperar dados de investigação.
         - **Finalidade**: Suporta buscas e históricos.

   7. **Pasta `services/`**
      - **Propósito**: Lógica de negócio, processando dados dos repositories.
      - **Objetivo**: Aplicar regras e transformações.
      - **Finalidade**: Mantém controllers limpos, centralizando lógica.

      1. **InvestigationService.ts**
         - **Propósito**: Processa buscas e históricos de processos.
         - **Objetivo**: Validar e formatar dados de investigação.
         - **Finalidade**: Conecta repositories a controllers.

   8. **Pasta `types/`**
      - **Propósito**: Definições de tipos TypeScript para o backend.
      - **Objetivo**: Garantir tipagem consistente.
      - **Finalidade**: Previne erros e melhora DX.

      1. **Dashboard.ts**
         - **Propósito**: Tipos para dados de dashboard (KPIs, charts).
         - **Objetivo**: Definir interfaces para analytics.
         - **Finalidade**: Alinha frontend/backend.

      2. **Investigation.ts**
         - **Propósito**: Tipos para processos, funcionários, atributos (ex.: ProcessDTO).
         - **Objetivo**: Modelar entidades de investigação.
         - **Finalidade**: Facilita integração com frontend/backend.

   9. **Pasta `utils/`**
      - **Propósito**: Utilitários compartilhados (ex.: formatters).
      - **Objetivo**: Funções auxiliares reutilizáveis.
      - **Finalidade**: Reduz duplicação de código.

      1. **formatters.ts**
         - **Propósito**: Formatar datas, strings, etc.
         - **Objetivo**: Padronizar saída de dados.
         - **Finalidade**: Melhora UX com dados legíveis.

### Pasta `src/` (Frontend)
   - **Propósito**: Código fonte do frontend React.
   - **Objetivo**: Renderizar a interface e gerenciar estado.
   - **Finalidade**: Fornece a experiência do usuário para investigação/dashboard.

1. **App.tsx**
   - **Propósito**: Componente raiz, gerencia navegação por estado (investigation/dashboard) com sidebar.
   - **Objetivo**: Estruturar layout principal e roteamento.
   - **Finalidade**: Centraliza a app, alternando entre features.

2. **index.css**
   - **Propósito**: Estilos globais, importando Tailwind.
   - **Objetivo**: Reset e base CSS.
   - **Finalidade**: Consistência visual.

3. **main.tsx**
   - **Propósito**: Ponto de entrada, renderiza App no DOM.
   - **Objetivo**: Inicializar React.
   - **Finalidade**: Conecta código a HTML.

4. **Pasta `components/`**
   - **Propósito**: Componentes compartilhados (ex.: Sidebar).
   - **Objetivo**: Reutilização.
   - **Finalidade**: Modularidade.

   1. **Sidebar.tsx**
      - **Propósito**: Navegação lateral com botões para tabs.
      - **Objetivo**: Navegação principal.
      - **Finalidade**: UX intuitiva.

5. **Pasta `features/`**
   - **Propósito**: Organiza por funcionalidades (investigation, dashboard).
   - **Objetivo**: Separação por domínio.
   - **Finalidade**: Escalabilidade.

   1. **Pasta `investigation/`**
      - **Propósito**: Feature de investigação (busca, timeline, etc.).
      - **Objetivo**: Consultar dossiês.
      - **Finalidade**: Core do sistema.

      1. **index.tsx**
         - **Propósito**: Componente principal, integra busca, grid e lista.
         - **Objetivo**: Orquestrar investigação.
         - **Finalidade**: Interface central.

      2. **Pasta `components/`**
         - **Propósito**: Componentes específicos (SearchHero, ProcessList, etc.).
         - **Objetivo**: UI modular.
         - **Finalidade**: Reutilização e manutenção.

         - **DossierHeader.tsx**: Cabeçalho do dossiê.
         - **OccurrenceTimeline.tsx**: Timeline visual.
         - **PersonCard.tsx**: Card de pessoa.
         - **PersonGrid.tsx**: Grid de resultados.
         - **PointHistory.tsx**: Histórico de pontos.
         - **ProcessFilters.tsx**: Filtros.
         - **ProcessItem.tsx**: Item de processo.
         - **ProcessList.tsx**: Lista de processos.
         - **RiskAnalysis.tsx**: Análise de risco.
         - **SearchHero.tsx**: Barra de busca.
         - **StatusBadge.tsx**: Badge de status.

      3. **Pasta `dashboard/`**
         - **Propósito**: Subfeature de dashboard dentro de investigation.
         - **Objetivo**: Visualizar métricas.
         - **Finalidade**: Analytics.

         1. **index.tsx**
            - **Propósito**: Dashboard com gráficos (Recharts) e KPIs.
            - **Objetivo**: Exibir dados agregados.
            - **Finalidade**: Insights visuais.

         2. **Pasta `hooks/`**
            - **Propósito**: Hook customizado (useDashboard).
            - **Objetivo**: Gerenciar estado de dashboard.
            - **Finalidade**: Separa lógica.

   2. **Pasta `data/`**
      - **Propósito**: Dados mock (ex.: mockData.ts).
      - **Objetivo**: Simular API em desenvolvimento.
      - **Finalidade**: Desenvolvimento sem backend.

   3. **Pasta `hooks/`**
      - **Propósito**: Hooks customizados (useInvestigation).
      - **Objetivo**: Lógica de estado reutilizável.
      - **Finalidade**: Separação de concerns.

   4. **Pasta `services/`**
      - **Propósito**: Chamadas API (ex.: investigation.ts).
      - **Objetivo**: Comunicação com backend.
      - **Finalidade**: Abstração de HTTP.

   5. **Pasta `types/`** (Nota: Não existe na raiz src/; está em features/investigation/types/)
      - **Propósito**: Tipos compartilhados (Process, PersonProfile).
      - **Objetivo**: Tipagem consistente.
      - **Finalidade**: Integração frontend/backend.

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 16+)
- PostgreSQL (para backend)

### Instalação e Execução
1. **Frontend**: `npm install` na raiz, depois `npm run dev`.
2. **Backend**: `npm install` em backend/, configurar .env para DB, `npm run dev`.
3. Acesse `http://localhost:5173` (frontend) e `http://localhost:3000` (backend).

## 🔄 Recomendações de Remoção/Refatoração
Como Arquiteto Sênior, sugiro remover:
- `backend/src/app.ts` (vazio).
- Dependência "express" no package.json raiz.
- `src/data/mockData.ts` (se backend estiver ativo).
- Verificar componentes não utilizados.

Isso reduz complexidade e foca no core.

## 📝 Licença
Projeto educacional. Análise realizada em janeiro de 2026.

