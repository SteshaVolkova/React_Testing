/* eslint-disable react/display-name */
import { render, renderHook } from '@testing-library/react';
import { ThemeProvider } from '../providers/themeProvider';

// 2. Но сейча я хочу вынести это в отдельную фуекцию,
// потому что мы этот провайдер будем переиспользовать.
// Тема у нас по умолчанию light и она передаётся в defaultTheme
const getWrapper =
  (theme) =>
  ({ children }) => {
    return <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>;
  };

export const renderWithProviders = (
  ui,
  { theme = 'light', ...options } = {},
) => {
  // 1. В данном случае мы создавали провайдер явным образом.
  // const Wrapper = ({ children }) => {
  //   return <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>;
  // };
  const Wrapper = getWrapper(theme);

  return render(ui, { wrapper: Wrapper, ...options });
};

// для хуков создадим свою функцию,
// она принимает конкретный хук, этот хук мы
// передаём в нашу функцию renderHook, которая импортируется
// из @testing-library/react и так же добавляем созданный врапер,
// и дополнительные опции тоже могут быть.
// И теперь мы можем использовать в тех местах,
// где используется какое-то чтение из контекста, мы можем
// использовать это и на уровне тестовых кейсов.
export const renderHookWithProviders = (
  hook,
  { theme = 'light', ...options } = {},
) => {
  const Wrapper = getWrapper(theme);

  return renderHook(hook, { wrapper: Wrapper, ...options });
};