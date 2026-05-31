import { createContext, useState } from 'react';

export const ThemeContext = createContext();

// 1. создаём провайдер темы
export const ThemeProvider = ({ defaultTheme = 'light', children }) => {
  // 4. в данном случае значением контекста является сама тема
  // плюс функция обновления этой темы
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};