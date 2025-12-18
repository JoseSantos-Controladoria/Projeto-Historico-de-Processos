# Projeto Histórico de Processos

## 📋 Sobre o Projeto

Este é um sistema de investigação de colaboradores desenvolvido em **React** com **TypeScript**, utilizando **Vite** como bundler e **Tailwind CSS** para estilização. O projeto permite consultar dossiês de funcionários e processos administrativos/disciplinares de forma intuitiva e organizada.

## 🎯 Objetivo Educacional

Este projeto serve como exemplo prático de desenvolvimento de uma aplicação React moderna, demonstrando conceitos como:

- **Componentização**: Separação de responsabilidades em componentes reutilizáveis
- **Gerenciamento de Estado**: Uso de hooks customizados para lógica de negócio
- **Tipagem Forte**: Implementação de TypeScript para maior segurança e manutenibilidade
- **Design System**: Utilização de Tailwind CSS para criação de interfaces consistentes
- **Estrutura de Pastas**: Organização modular do código por features

## 🚀 Tecnologias Utilizadas

### Core
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Ferramenta de build rápida e moderna

### Estilização
- **Tailwind CSS** - Framework CSS utilitário
- **PostCSS** - Processador CSS
- **Autoprefixer** - Adição automática de prefixos CSS

### Desenvolvimento
- **ESLint** - Linter para JavaScript/TypeScript
- **Lucide React** - Biblioteca de ícones

## 📁 Estrutura do Projeto

```
src/
├── App.tsx                 # Componente principal da aplicação
├── main.tsx               # Ponto de entrada da aplicação
├── index.css              # Estilos globais
└── features/
    └── investigation/     # Feature principal de investigação
        ├── index.tsx      # Componente principal da feature
        ├── components/    # Componentes da interface
        │   ├── SearchHero.tsx        # Barra de busca para dossiês
        │   ├── ProcessFilters.tsx    # Filtros para processos
        │   ├── DossierHeader.tsx     # Cabeçalho do dossiê
        │   ├── OccurrenceTimeline.tsx # Timeline de ocorrências
        │   ├── PointHistory.tsx      # Histórico de pontos
        │   ├── RiskAnalysis.tsx      # Análise de risco
        │   └── ProcessList.tsx       # Lista de processos
        ├── hooks/         # Hooks customizados
        │   └── useInvestigation.ts  # Lógica de busca e estado
        ├── data/          # Dados mockados
        │   └── mockData.ts           # Dados de exemplo
        └── types/         # Definições de tipos
            └── index.ts              # Interfaces TypeScript
```

## ✨ Funcionalidades Implementadas

### 🔍 Consulta de Dossiês de Colaboradores

- **Busca Inteligente**: Pesquisa por nome, CPF, matrícula ou e-mail
- **Informações Completas**: Dados pessoais, cargo, departamento, status
- **Análise de Risco**: Nível de risco calculado baseado em fatores diversos
- **Histórico de Ocorrências**: Timeline cronológica de eventos disciplinares
- **Controle de Pontos**: Registro de faltas, atrasos e horas extras por mês

### 📄 Gestão de Processos

- **Filtros Avançados**: Busca por nome do funcionário, datas, tipo de processo
- **Listagem Organizada**: Visualização clara de todos os processos
- **Informações Detalhadas**: Número do processo, status, solicitante, descrição

### 🎨 Interface do Usuário

- **Design Responsivo**: Interface adaptável a diferentes tamanhos de tela
- **Navegação por Abas**: Separação clara entre dossiês e processos
- **Componentes Reutilizáveis**: Elementos de UI consistentes e modulares
- **Feedback Visual**: Estados de carregamento e tratamento de erros

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Instalação

1. **Clone o repositório** (se aplicável) ou navegue até a pasta do projeto

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Abra o navegador** e acesse `http://localhost:5173`

### Outros Comandos Disponíveis

- **`npm run build`** - Gera a versão de produção otimizada
- **`npm run preview`** - Visualiza a versão de produção localmente
- **`npm run lint`** - Executa verificação de código com ESLint

## 📊 Dados de Exemplo

O projeto utiliza dados mockados para demonstração, incluindo:

- **3 Dossiês de Funcionários** com diferentes perfis e históricos
- **Diversos Processos** administrativos e disciplinares
- **Ocorrências Variadas** (advertências, suspensões, feedbacks)
- **Histórico de Pontos** simulando controle de frequência

## 🎓 Conceitos Demonstrados

### React Hooks
- `useState` para gerenciamento de estado local
- `useCallback` para otimização de funções
- Hooks customizados para lógica reutilizável

### TypeScript
- Interfaces para definição de tipos de dados
- Tipos union para valores enumerados
- Tipagem opcional com `?`

### Componentização
- Separação de responsabilidades
- Props para comunicação entre componentes
- Composição de componentes

### Estilização
- Classes utilitárias do Tailwind CSS
- Design responsivo com Grid e Flexbox
- Tema consistente com cores e espaçamentos

## 🔄 Próximos Passos Sugeridos

Para expandir este projeto, considere implementar:

- **Integração com API**: Substituir dados mockados por chamadas reais
- **Autenticação**: Sistema de login e controle de permissões
- **Banco de Dados**: Persistência de dados
- **Testes**: Cobertura com Jest e React Testing Library
- **Deploy**: Publicação em plataformas como Vercel ou Netlify

## 📝 Licença

Este projeto é para fins educacionais e de demonstração.

---

