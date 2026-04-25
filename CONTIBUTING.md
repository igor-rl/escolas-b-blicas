# React + TypeScript + Vite

# START APP

```cmd
npm run dev
```

# Desenvolvimento
npm run dev:electron

# Gerar instalador macOS:
```bash
rm -rf dist dist-electron release
npm run build:electron
open release/EB-0.0.0-arm64.dmg
```

# Gerar instalador Windows (a partir do macOS):
*Nota: Requer wine instalado (`brew install --cask wine-stable` ou similar)*

```bash
# Instalador padrão (NSIS)
rm -rf dist dist-electron release
npm run build:electron-win

# Versão Portátil (Executável único)
rm -rf dist dist-electron release
npm run build:electron-win-portable
```


# Habilitar o gemini cli:

```bash
docker compose -f docker-compose-ia.yaml up -d
docker exec -it ai-clis bash
# depois de abrir o bash execute o gemini e siga as instruções de autenticação com sua conta
gemini
```

# Gerar versões automatizadas:

```bash
# Bump a versão no package.json (ex: 0.0.0 → 1.1.0)
# Depois:
git add .
git commit -m "chore: "
git push origin main
git tag v0.0.0
git push origin main --tags
```

# Usar mesma TAG para build:
```bash
git add .
git commit -m "chore: "
```

# Delete a tag antiga se já existir, recriar e subir
```bash
git tag -d v0.0.0
git push origin :refs/tags/v0.0.0
git tag v0.0.0
git push origin main --tags
```

# Git pull
O git flow automaticamente altera a versao do arquivo README.md para a versao mais recente. Por isso, apos executar `git push`, aguarde alguns segundos e execute o `git pull` para ter a versão do codigo atualizado do README.md.


