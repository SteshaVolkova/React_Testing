import { useContext } from 'react';
import { ThemeContext } from './themeProvider';

// это некий хук для тёмной темы
export const useTheme = () => {
  // 3. он позволяет вытащить значение из контекста
  const context = useContext(ThemeContext);

  // 5. если этот хук используется там где нет контекста,
  // выбрасывается ошибка (стандартное поведение при работе с контекстами)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};