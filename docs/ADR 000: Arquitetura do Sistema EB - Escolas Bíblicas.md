# 📄 ADR 001: Arquitetura do Sistema EB - Escolas Bíblicas
## 1. Contexto e Problema 🚩
Instituições de ensino bíblico necessitam de uma ferramenta de gestão que opere de forma totalmente offline, garantindo a privacidade dos dados e a disponibilidade em locais com conectividade limitada. O sistema precisa gerenciar estruturas complexas de dados (grades curriculares, turmas, vínculos de alunos e professores) e permitir a geração de documentos físicos (PDFs) para suporte às aulas.

### Principais desafios:

- Necessidade de persistência local robusta sem dependência de nuvem.

- Complexidade de relacionamentos entre entidades (Grades, Módulos, Turmas, Alunos).

- Versionamento de conteúdo (atualizações de grades sem perda de histórico).

## 2. Solução Proposta 💡
Desenvolver uma aplicação desktop multiplataforma utilizando o modelo Local-First. O app centralizará toda a inteligência e armazenamento no dispositivo do usuário, permitindo a gestão modular de turmas e a manipulação dinâmica de grades curriculares.

## 3. Stack Tecnológica 🛠️
### 🏗️ Core da Aplicação
- <b>Electron:</b> Framework para execução do app em ambiente Desktop, permitindo acesso nativo ao sistema de arquivos (Node.js) e janelas de interface (Chromium).

- <b>Vite:</b> Tooling de build de última geração para garantir um desenvolvimento rápido (HMR) e bundles otimizados.

- <b>React:</b> Biblioteca para construção da interface modular e declarativa, facilitando a gestão de estados complexos (como a edição de grades).

## 🗄️ Camada de Dados e Persistência
- <b>SQLite:</b> Banco de dados relacional embarcado. Os dados são armazenados em um único arquivo local, facilitando backups manuais e garantindo integridade referencial (ACID).

- <b>Prisma ORM:</b> Camada de abstração de dados que fornece Type Safety total. Utilizado para gerenciar migrações de esquema e simplificar consultas complexas de vínculos entre alunos, professores e matérias.

## 4. Arquitetura de Dados (Modelagem Modular) 🗂️
O sistema deve ser estruturado em módulos interdependentes:

- <b>Módulo de Conteúdo:</b> Gestão de Grades Curriculares e suas versões (Edição de exercícios, aulas e tópicos).

- <b>Módulo Acadêmico:</b> Criação de Turmas, enturmação de Alunos e designação de Professores.

- <b>Módulo de Atividades:</b> Registro de frequências, notas e envio de designações.

- Módulo de Saída:</b> Motor de geração de PDFs para impressões de materiais de apoio e relatórios.

## 5. Requisitos de Implementação Local 🔒
- <b>Isolamento de Rede:</b> O app não deve realizar chamadas externas, exceto para verificação opcional de atualizações do binário.

- <b>Caminho de Dados:</b> O arquivo SQLite deve residir obrigatoriamente no diretório de dados do usuário (userData), garantindo persistência entre atualizações do software.

- <b>Comunicação IPC:</b> O fluxo de dados deve seguir o padrão de segurança do Electron, utilizando ContextBridge para comunicação entre o processo Main (Prisma/SQLite) e o Renderer (React).

## 6. Consequências ⚖️
- <b>Positivas:</b> Performance extrema (latência zero), total privacidade do usuário, facilidade de portabilidade (basta copiar o arquivo do banco).

- <b>Compromissos:</b> A responsabilidade de backup é do usuário final. Mudanças no esquema do banco exigem gestão cuidadosa de migrações via Prisma no processo de atualização do app.

- <b>Nota para IA Auxiliar:</b> Ao gerar código para este projeto, priorize a tipagem rigorosa do TypeScript baseada no schema.prisma e utilize padrões de comunicação assíncrona via IPC (Inter-Process Communication) para garantir que a interface React permaneça fluida durante operações de I/O no banco de dados.

## 7. Arquitetura do projeto
```
src/
├── main/                 # Lógica de "Back-end" (Node.js)
│   ├── services/         # Onde a mágica acontece (PDF, Banco, FS)
│   ├── database/         # Configuração do Prisma Client
│   └── ipcHandlers.ts    # Ponte de comunicação (Escuta os pedidos do Front)
│
├── renderer/             # Lógica de "Front-end" (Vite + React)
│   ├── src/
│   │   ├── components/   # Shared Components (Botões, Modais, Inputs)
│   │   ├── layouts/      # BaseLayout (Nav, Header, Sidebar)
│   │   ├── modules/      # Lógica Modular por Tela (Ex: Alunos, Turmas)
│   │   │   ├── Alunos/
│   │   │   │   ├── components/ # Componentes exclusivos da tela
│   │   │   │   ├── hooks/      # Lógica de estado e chamadas API
│   │   │   │   └── AlunosPage.tsx
│   │   ├── hooks/        # Hooks globais (Theme, Auth)
│   │   └── theme/        # Configurações de estilo e cores
│
├── preload/              # Ponte de segurança (ContextBridge)
└── shared/               # Tipagens (Interfaces) usadas em ambos os lados
```