import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    SplashScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    BiometricModal: undefined;
    AvatarSelectionScreen: undefined;
    HomeScreen: undefined;
    TaskDetail: { task: Task };
    EditTask: { task: Task };
    AuthStack: undefined;
    TaskStack: { screen: keyof TaskStackParamList; params: { task: Task } } | undefined;
    HomePage: undefined;
    EditProfileScreen: undefined;
    ProfileScreen: undefined;
    PreferencesScreen: undefined;
    TermsScreen: undefined;
};

export type AuthStackParamList = {
    SplashScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    BiometricModal: undefined;
  };

  export type TaskStackParamList = {
    HomePage: undefined;
    TaskDetail: { task: Task };
    EditTask: { task: Task };
    AvatarSelectionScreen: undefined;
    ProfileScreen: undefined;
    PreferencesScreen: undefined;
    TermsScreen: undefined;
    EditProfileScreen: undefined;
  };

  export interface Task {
    id: string;
    title: string;
    description: string;
    tags: string[];
    done: boolean;
    createdAt: string;
    status: 'pendente' | 'concluida';
    prioridade?: string;
    prazo: string;
  }

export type TaskDetailRouteProp = RouteProp<TaskStackParamList, 'TaskDetail'>;
