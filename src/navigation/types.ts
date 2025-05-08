export type RootStackParamList = {
  ProfileScreen: undefined;
  PreferencesScreen: {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  };
  TermsScreen: undefined;
};
