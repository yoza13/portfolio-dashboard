import { createContext } from "react";

interface ApplicationContext {
  isDarkTheme: boolean;
  setIsDarkTheme?: (active: boolean) => void;
}

const AppContext = createContext<ApplicationContext>({
  isDarkTheme: false,
});

export const AppContextProvider = AppContext.Provider;

export default AppContext;
