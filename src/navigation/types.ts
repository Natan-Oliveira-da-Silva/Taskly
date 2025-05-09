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
  };

  export type Task = {
    id: string;
    titulo: string;
    descricao: string;
    tags: string[];
    status: 'pendente' | 'concluida';
    prazo?: string;
    prioridade?: string;
  };

export type TaskDetailRouteProp = RouteProp<TaskStackParamList, 'TaskDetail'>;
