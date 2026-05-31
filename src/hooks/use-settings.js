import { useTheme } from '../providers/useTheme';

// посмотрим пример, когда кастомный хук использует
// что-то из провайдеров
const useSettings = () => {
  // в данном случае мы берем тот же провайдер темы
  // и спользуем значения для каких-то абстрактных сетингов
  const { theme } = useTheme();

  // и полагаясь на определённое значение мы хотим что-то делать
  return {
    showSpecialFeature: theme === 'dark',
  };
};

export { useSettings };