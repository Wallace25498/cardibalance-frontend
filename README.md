# 📱 CardiBalance - Front-End

Aplicativo móvel desenvolvido em **React Native + Expo**, voltado para diabéticos e hipertensos, com interface simples e acessível para monitoramento de glicemia e pressão arterial.

---

## 🚀 Visão Geral

O aplicativo oferece:

- Cadastro e login com e-mail e senha (autenticação JWT).
- Cadastro de dados do paciente (CPF, data de nascimento, dados clínicos).
- Registro de glicemia e pressão arterial com contexto da medição.
- Histórico de medições com gráficos de linha.
- Dicas de saúde.

> Funcionalidades ainda **não implementadas** no front-end: login com Google, alertas
> automáticos por faixa de risco, exportação de relatórios (PDF/Excel), notificações push
> e área de parceiros de saúde.

---

## 🏗️ Arquitetura e Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Framework | [React Native](https://reactnative.dev/) `0.81.4` + [Expo SDK 54](https://expo.dev/) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) `~5.9` (modo `strict`) |
| UI | React `19.1` + componentes nativos do React Native (`StyleSheet`) |
| Navegação | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing, typed routes) + [React Navigation](https://reactnavigation.org/) (`bottom-tabs`) |
| Gerenciamento de estado | Context API do React (`AuthContext`) + hooks |
| HTTP / Integração back-end | [Axios](https://axios-http.com/) consumindo a REST API em Spring Boot |
| Persistência local | [`@react-native-async-storage/async-storage`](https://react-native-async-storage.github.io/async-storage/) (token JWT e dados do usuário) |
| Gráficos | [`react-native-chart-kit`](https://github.com/indiespirit/react-native-chart-kit) + `react-native-svg` |
| Máscaras de input | [`react-native-mask-text`](https://github.com/akinncar/react-native-mask-text) |
| Ícones | [`@expo/vector-icons`](https://icons.expo.fyi/) (Material Community Icons) e [`lucide-react-native`](https://lucide.dev/) |
| Animação / gestos | `react-native-reanimated`, `react-native-gesture-handler`, `react-native-worklets` |
| Web | `react-native-web` (export estático via `expo start --web`) |
| Lint | ESLint `9` com `eslint-config-expo` |
| Build / distribuição | [EAS Build](https://docs.expo.dev/build/introduction/) (Android e iOS) |

Configurações relevantes do `app.json`:

- **New Architecture** (Fabric/TurboModules) habilitada (`newArchEnabled: true`).
- **React Compiler** e **typed routes** habilitados em `experiments`.
- Package Android: `com.cardibalance` · scheme: `cardibalancefront`.

---

## 🔧 Requisitos

- [Node.js](https://nodejs.org/) LTS (18+) e npm
- [Expo CLI](https://docs.expo.dev/more/expo-cli/) (via `npx expo`)
- App **Expo Go** ou um **development build** (`expo-dev-client`)
- Android Studio / Xcode (para emuladores) — opcional
- [EAS CLI](https://docs.expo.dev/eas/) `>= 16.19.3` para gerar builds
- Back-end CardiBalance (Spring Boot) rodando em `http://localhost:8080`

---

## ⚙️ Instalação e Execução

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/cardibalance-frontend.git
cd cardibalance-frontend/cardibalance-front

# 2. Instalar dependências
npm install

# 3. Rodar o app (escaneie o QR Code com o Expo Go)
npx expo start
```

Outros comandos disponíveis:

```bash
npm run android   # abre no emulador/dispositivo Android
npm run ios       # abre no simulador iOS
npm run web       # abre no navegador
npm run lint      # roda o ESLint
```

### Gerar build com EAS

```bash
eas login
eas build:configure
eas build -p android --profile preview
```

Perfis definidos em `eas.json`: `development` (dev client, distribuição interna),
`preview` (distribuição interna) e `production` (auto-increment de versão).

---

## 🔌 Integração com o Back-End

O app consome a API REST via Axios. Endpoints atualmente utilizados:

| Método | Endpoint | Uso |
| --- | --- | --- |
| `POST` | `/auth/register` | Cadastro de usuário |
| `POST` | `/auth/login` | Login (retorna o token JWT) |
| `POST` | `/paciente` | Cadastro dos dados do paciente |
| `POST` | `/medicao` | Registro de uma medição |
| `GET` | `/medicoes` | Listagem do histórico de medições |

O token JWT é salvo no AsyncStorage e enviado no header `Authorization: Bearer <token>`.

> ⚠️ A URL base está fixa como `http://localhost:8080` no código das telas. Para testar em
> dispositivo físico, é necessário trocar por um IP acessível na rede — idealmente
> centralizando isso em uma instância do Axios configurada por variável de ambiente.

---

## 📂 Estrutura do Projeto

```
cardibalance-frontend/
└── cardibalance-front/
    ├── app/                      # Rotas (Expo Router) e telas
    │   ├── _layout.tsx           # Layout raiz (Stack + AuthProvider)
    │   ├── index.tsx             # Tab navigator principal
    │   ├── LoginPage.tsx
    │   ├── RegisterScreen.tsx
    │   ├── PatientDataScreen.tsx
    │   ├── HealthRegisterScreen.tsx
    │   ├── HistoryScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── DicasScreen.tsx
    │   ├── Navigation/_layout.tsx
    │   ├── context/AuthContext.tsx   # Estado de autenticação (Context API)
    │   └── styles/                   # StyleSheets por tela
    ├── storage/                  # Persistência local (AsyncStorage)
    │   ├── storageAuthToken.ts
    │   └── storageConfigs.ts
    ├── assets/images/            # Ícones, splash e imagens
    ├── app.json                  # Configuração do Expo
    ├── eas.json                  # Perfis de build do EAS
    ├── eslint.config.js
    ├── tsconfig.json
    └── package.json
```

> Não há suíte de testes automatizados configurada no projeto até o momento.

---

## 🛡️ Acessibilidade

- Interface adaptada para idosos.
- Fontes grandes e alto contraste.
- Ícones intuitivos e feedback por cores.

---

## 🤝 Contribuindo

```bash
git checkout -b feature/nome-da-feature
git add .
git commit -m "feat: descreve a alteração"
git push origin feature/nome-da-feature
```

Em seguida, abra um Pull Request no GitHub.
