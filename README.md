# 📱 Taskly

Aplicativo mobile para gestão de tarefas. Com o Taskly, o usuário pode organizar suas atividades, estabelecer prazos, definir prioridades e personalizar seu perfil. Este projeto foi desenvolvido como parte de um desafio proposto pelos instrutores da trilha de React Native e AWS do Programa de Bolsas da Compass.UOL.

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
RN-MAR25-MOBILE-MAVERICKS/
├── src/
│   ├── assets/
│   │   └── avatars/
│   │       ├── avatar1.jpg
│   │       ├── ellipse1.png
│   │       ├── Vector.png
│   │       └── Vector1.png
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   └── Input.tsx
│   │   └── molecules/
│   │       ├── Header.tsx
│   │       └── TabBar.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthStack.tsx
│   │   ├── TabNavigator.tsx
│   │   ├── TaskStack.tsx
│   │   └── types.ts
│   ├── screens/
│   │   ├── modal/
│   │   │   └── BiometricModal.tsx
│   │   ├── AvatarSelectionScreen.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── SplashScreen.tsx
│   │   ├── SubTaskScreen.tsx
│   │   └── TaskDetailScreen.tsx
│   └── utils/
│       ├── colors.ts
│       ├── constants.ts
│       └── typography.ts
└── App.tsx
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
git clone https://github.com/seu-usuario/taskly.git
cd taskly

# 2. Instale as dependências
npm install
# ou
yarn

# 3. Inicie o Metro Bundler em um terminal separado
npx react-native start
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
