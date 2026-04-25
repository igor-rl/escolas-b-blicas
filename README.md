# EB - Escolas Bíblicas 🗺️

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/igor-rl/escolas-biblicas?style=flat-square&color=blue)](https://github.com/igor-rl/escolas-biblicas/releases/latest)
[![Build & Release](https://github.com/igor-rl/escolas-biblicas/actions/workflows/release.yml/badge.svg)](https://github.com/igor-rl/escolas-biblicas/actions/workflows/release.yml)

Aplicativo desktop para gestão de turmas das Escolas Bíblicas Teocráticas das Testemunhas de Jeová.


## Instalar dependências (uma vez):
```
npm install
```

## Subir app em modo desenvolvimento (Vite + Electron):
```
npm run dev:electron
```

## Se quiser só a versão web no navegador (sem Electron):
```
npm run dev
```
abrir http://localhost:5173

## Para testar build de produção local:
```
npm run build
```
## Para testar build de produção local e gerar os instaladores na pasta releases
```
npm run build:electron
```

## 📥 Download e Instalação

Baixe sempre a versão mais recente na [Página de Releases](https://github.com/igor-rl/escolas-biblicas/releases/latest).

| Sistema | Arquivo |
|---|---|
| **macOS** (M1/M2/M3) | `EB-macOS-0.0.0-arm64.dmg` |
| **macOS** (Intel) | `EB-macOS-0.0.0-x64.dmg` |
| **Windows** (Setup) | `EB-windows-installer-0.0.0.exe` |
| **Windows** (portátil) | `EB-windows-portable-0.0.0.exe` |
| **Linux** | `EB-linux-0.0.0.AppImage` |

### macOS
1. Abra o arquivo `.dmg`
2. Arraste o **EB** para a pasta Aplicativos
3. Na primeira abertura, clique com o botão direito → **Abrir** (necessário apenas uma vez, por ser de fora da App Store)

### Windows
1. Execute o instalador `.exe` e siga os passos
2. O app criará um atalho na Área de Trabalho e no Menu Iniciar
3. Se preferir não instalar, use a versão **portable** — basta executar o `.exe` diretamente

### Linux
1. Torne o arquivo executável: `chmod +x EB-linux-0.0.0.AppImage`
2. Execute: `./EB-linux-0.0.0.AppImage`


## ✨ Funcionalidades Principais

- **🗺️ Importação Inteligente:** Suporte total a KML (Google Maps/Earth).
- **📂 Organização:** Pastas e categorias com sistema de arrastar e soltar.
- **🛰️ Visualização Avançada:** Mapa satélite interativo com suporte a rotação e etiquetas personalizadas.
- **📄 Relatórios PDF:** Geração automática de cartões S-12 e formulários S-13.
- **🔄 Atualizações Automáticas:** O app se mantém atualizado em segundo plano.
- **🔒 Privacidade Total:** Funcionamento 100% offline. Seus dados nunca saem do seu computador.

## 🛠️ Para Desenvolvedores

Se você deseja contribuir ou rodar o projeto localmente:

1. **Clone o repositório:** `git clone ...`
2. **Instale as dependências:** `npm install`
3. **Configure as variáveis:** Crie um arquivo `.env.local` e adicione seu `VITE_MAPBOX_TOKEN`.
4. **Inicie o modo dev:** `npm run dev`

Para detalhes sobre como contribuir, veja o arquivo `CONTRIBUTING.md` (opcional).

## 🛡️ Suporte e Feedback

Encontrou um erro ou tem uma sugestão?
Abra uma [**Issue**](https://github.com/igor-rl/escolas-biblicas/issues) detalhando o ocorrido.

<br/>

<div align="center">

<p align="center">
<img src="https://img.shields.io/static/v1?label=IRL&message=FULLSTACK%20DEVOPS&color=2d2d2d&style=for-the-badge&logo=GitHub">
</p>

[![GitHub](https://img.shields.io/badge/GitHub-Igor_Lage-blue?style=social&logo=github)](https://github.com/igor-rl) 
<br/>
![Static Badge](https://img.shields.io/badge/01--04--2026-black)

</div>