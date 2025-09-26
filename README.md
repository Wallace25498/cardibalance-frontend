# 📱 CardiBalance - Front-End

Aplicativo móvel desenvolvido em **Flutter/FlutterFlow**, voltado para diabéticos e hipertensos, com interface simples e acessível para monitoramento de glicemia e pressão arterial.

---

## 🚀 Visão Geral

O aplicativo oferece:

- Cadastro/login com e-mail, CPF e Google.
- Registro de glicemia e pressão arterial com contexto (jejum, pós-refeição, exercícios).
- Histórico de medições com gráficos interativos.
- Alertas inteligentes (verde, amarelo, laranja, vermelho).
- Relatórios exportáveis em PDF/Excel.
- Dicas de saúde atualizadas periodicamente.
- Acesso a parceiros de saúde (clínicas, laboratórios, farmácias).

---

## 🏗️ Arquitetura

- **Framework:** React Native + Expo
- **State Management:** Provider / Riverpod
- **UI/UX:** Material Design + acessibilidade (alto contraste, fontes grandes)
- **Integração Back-End:** REST API (Spring Boot)
- **Notificações:** Firebase Cloud Messaging
- **Build:** Android e iOS

---

## 🔧 Requisitos

- React Native
- Expo
- Android Studio ou VS Code
- EAS CLI

---

## ⚙️ Instalação e Execução

```bash
# Clonar repositório
git clone https://github.com/seu-org/cardibalance-frontend.git
cd cardibalance-frontend

# Instalar dependências


# Executar no emulador/dispositivo
npx expo start
```

---

## 📂 Estrutura do Projeto

```
cardibalance-frontend/
 ├── lib/
 │   ├── screens/       # Telas principais (login, dashboard, histórico, etc.)
 │   ├── widgets/       # Componentes reutilizáveis
 │   ├── models/        # Modelos de dados
 │   ├── services/      # Comunicação com a API
 │   ├── providers/     # Gerenciamento de estado
 │   └── utils/         # Funções auxiliares
 ├── assets/            # Ícones, imagens e fontes
 ├── pubspec.yaml       # Dependências
 └── test/              # Testes unitários
```

---

## 🛡️ Acessibilidade

- Interface adaptada para idosos.
- Fontes grandes e alto contraste.
- Ícones intuitivos e feedback por cores (verde, amarelo, laranja, vermelho).

---

## 🗺️ Roadmap

- [x] Estrutura inicial (cadastro/login).
- [x] Registro de medições (glicemia/pressão).
- [x] Dashboard com gráficos.
- [ ] Relatórios exportáveis em PDF/Excel.
- [ ] Notificações inteligentes baseadas em algoritmos de risco.
- [ ] Integração com parceiros de saúde.

---

👨‍💻 Desenvolvido com ❤️ para facilitar a vida de quem precisa monitorar sua saúde todos os dias.
