# 📱 Taskly

Aplicativo mobile para gestão de tarefas. Com o Taskly, o usuário pode organizar suas atividades, estabelecer prazos, definir prioridades e personalizar seu perfil. Este projeto foi desenvolvido como parte de um desafio proposto pelos instrutores da trilha de React Native e AWS do Programa de Bolsas da Compass.UOL.

O front-end que a minha equipe desenvolveu interage com uma API que foi disponibilizada por um instrutor do estágio. Após a primeira etapa do desenvolvimento, cada membro da equipe, individualmente, fez o deploy da API usada pelo app no EC2 da AWS e fez o app consumir as imagens dos avatares do S3, seguindo as orientações do instrutor.

Para fazer o deploy da API no EC2 e disponibilizar as imagens dos avatares no S3, eu, Natan, usei uma conta feita com um e-mail criado pela Compass.UOL. Ao término do estágio, esse e-mail foi excluído, o que significa que a conta da AWS que usei foi desativada. Assim, a API e as imagens dos avatares estão indisponíveis e o aplicativo que está neste repositório do GitHub referenciado abaixo não está funcional. Este repositório contém apenas o front-end do aplicativo.

---

## 📚 Sumário

- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Design e Temas](#-design-e-temas)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Licença](#-licença)
- [Desenvolvedores](#-desenvolvedores)

---

## 🏗️ Arquitetura do Projeto

A arquitetura foi planejada para garantir **clareza, escalabilidade e manutenibilidade**, com base em três pilares:

- **Clean Code**: código limpo, legível e de fácil manutenção.
- **Layer-Based Architecture**: separação entre camadas (componentes, navegação, telas, utilitários).
- **Atomic Design**: componentes organizados em `atoms`, `molecules` e, futuramente, `organisms`.

---

## 📁 Estrutura de Pastas

```text
📦 RN-MAR25-MOBILE-MAVERICKS
├── 📁 src
│   ├── 📁 assets
│   │   └── 📁 avatars
│   ├── 📁 components
│   │   ├── 📁 atoms
│   │   └── 📁 molecules
│   ├── 📁 context
│   ├── 📁 data
│   ├── 📁 domain
│   ├── 📁 hooks
│   ├── 📁 navigation
│   └── 📁 screens
│       ├── 📁 modal
│       │   └── AvatarSelectionScreen.tsx
│       ├── EditProfileScreen.tsx
│       ├── EditTaskScreen.tsx
│       ├── ErrorScreen.tsx
│       ├── HomePage.tsx
│       ├── LoginScreen.tsx
│       ├── PreferencesScreen.tsx
│       ├── ProfileScreen.tsx
│       ├── RegisterScreen.tsx
│       ├── SplashScreen.tsx
│       ├── TaskDetailScreen.tsx
│       └── TermsScreen.tsx
├── 📁 utils
└── 📄 .package.json

```

---

## 🧰 Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)** — framework para desenvolvimento mobile.
- **[TypeScript](https://www.typescriptlang.org/)** — tipagem estática.
- **[React Navigation](https://reactnavigation.org/)** — navegação entre telas.
- **[Axios](https://axios-http.com/)** — requisições HTTP.
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** — armazenamento local.
- **[React Native Biometrics](https://github.com/SelfLender/react-native-biometrics)** — autenticação biométrica.
- **[React Native Masked Text](https://github.com/benhurott/react-native-masked-text)** — máscaras para entradas do usuário.

---

## 🎨 Design e Temas

O layout segue o [Figma oficial](https://www.figma.com/design/4CRUTjHYX89xCfdUhFl8ft/Taskly-UI?node-id=0-1&t=jDE70ppySE29bZ7f-1), com padronização de cores, fontes e componentes reutilizáveis com base em Atomic Design.

O app suporta **tema claro e escuro**, alternando conforme a preferência do usuário.

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão LTS recomendada)
- React Native CLI (`npm install -g react-native-cli`)
- Android Studio (com um AVD configurado) ou Xcode (macOS) para iOS
- Java JDK instalado
- Dispositivo físico com depuração USB ativada (opcional)

### Passos para rodar

```bash
# 1. Clone o repositório
git clone https://github.com/Natan-Oliveira-da-Silva/RN-Mar25-Mobile-Mavericks.git

# 2. Posicione-se na pasta do projeto
cd RN-Mar25-Mobile-Mavericks

# 3. Instale as dependências
npm install

# 4. Inicie o Metro Bundler
npm start
```

### Para rodar no Android

Certifique-se de que um emulador está rodando no Android Studio ou que um dispositivo com depuração USB está conectado.

```bash
npx react-native run-android
```

### Para rodar no iOS (apenas no macOS)

Certifique-se de que você tem o Xcode instalado.

```bash
npx react-native run-ios
```

---

## 📝 Licença

Projeto privado, desenvolvido exclusivamente para fins educacionais e internos.

---

## 👨‍💻 Desenvolvedores

- [**Czarena Wealth Nana Afia Agyei**](https://github.com/wealthczarena)  
- [**Jessica Woytuski**](https://github.com/Jessiwoy)  
- [**João Vitor Iuncks**](https://github.com/Iuncks)  
- [**Lorenzo Giuseppe Oliveira Baroni**](https://github.com/lorenzobaroni)  
- [**Natan Oliveira da Silva**](https://github.com/Natan-Oliveira-da-Silva)
