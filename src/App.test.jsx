import { render, screen, fireEvent, act, within } from "@testing-library/react";
import App from "./App";
import * as waitMock from './helpers/wait';

// создаём шпиона, он будет шпионить за методом await
const waitSpy = jest.spyOn(waitMock, 'wait');

describe('App', () => {
    it('test within', () => {
        // Чтобы увидеть подсказку нужно нажать Ctrl + пробел
        render(<App />);

        // within хорошая замена контейнеру, которую мы использовали обычно
        const form = screen.getByTestId('form');
        const userNameInput = within(form).getByLabelText(/User name/);
        const passwordInput = within(form).getByLabelText(/Password/);
        const submitButton = within(form).getByRole('button', {name: /Create user/});

        expect(userNameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('should render App with form elements and a title', () => {
        const { container } = render(<App />);

        // сгенерировать и заполнить песочницу
        // на https://testing-playground.com/ своим html,
        // для генерации нужно запустить тест
        // !!! TESTING !!!
        // screen.logTestingPlaygroundURL();

        // импортируем logRoles из @testing-library/react
        // и запускаем тесты, подсказки будут в консоли
        // !!! TESTING !!!
        // const { baseElement } = render(<App />);
        // logRoles(baseElement);

        expect(screen.getByTestId('app')).toBeInTheDocument();

        const userNameInput = screen.getByLabelText(/User name/);
        const passwordInput = screen.getByLabelText(/Password/);
        const submitButton = screen.getByRole('button', {name: /Create user/});
        const title = container.querySelector('h1');

        expect(userNameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });

    it('should render error message when form was submit with weak password', async () => {
        render(<App />);

        const userNameInput = screen.getByLabelText(/User name/);
        const passwordInput = screen.getByLabelText(/Password/);
        const submitButton = screen.getByRole('button', {name: /Create user/});

        const successMessage = screen.queryByText(/created with password/);
        const errorMessage = screen.queryByText(
            /Password must be at least 8 characters long/
        );

        // сначала мы проверяем что сообщений нет на странице
        expect(successMessage).not.toBeInTheDocument();
        expect(errorMessage).not.toBeInTheDocument();

        // с эелементами формы сделали определённые операции
        act(() => {
            fireEvent.change(userNameInput, {target: {value: 'John'}});
            fireEvent.change(passwordInput, {target: {value: '123'}});
            fireEvent.click(submitButton);
        });

        // в неё будет сохраняться значение при поиске через screen,
        // но через метод find, все методы find предполагают
        // асинхронный поиск с задержкой появления какого-то
        // элемента.
        const errorMessageAfterSubmit = await screen.findByText(/Password must be at least 8 characters long/);
        
        // потом мы ожидаем, так как пароль слабый, сообщения об ошибке
        expect(errorMessageAfterSubmit).toBeInTheDocument();
    });

    it('should render success message after successful submit', async () => {
        render(<App />);

        const userNameInput = screen.getByLabelText(/User name/);
        const passwordInput = screen.getByLabelText(/Password/);
        const submitButton = screen.getByRole('button', {name: /Create user/});

        const successMessage = screen.queryByText(/created with password/);
        const errorMessage = screen.queryByText(
            /Password must be at least 8 characters long/
        );

        // сначала мы проверяем что сообщений нет на странице
        expect(successMessage).not.toBeInTheDocument();
        expect(errorMessage).not.toBeInTheDocument();

        const promise = Promise.resolve();

        // мы добавляем функцию шпион, так как в
        // use-create-user мы можем увидеть await wait(1000);
        // таким образом мы делаем моковую имплементацию,
        // нам нужно самим решить, когда он закончит свою работу:
        // тут мы ображаемся к своему шпиончику и добавляем
        // ему разово моковую имплементацию. Мы говорим: "когда тебя кто-либо
        // вызовет, верни просто наш промис, который сразу зарезолвится"
        waitSpy.mockImplementationOnce(() => promise);

        act(() => {
            fireEvent.change(userNameInput, {target: {value: 'John'}});
            fireEvent.change(passwordInput, {target: {value: 'Qwe2134#@$'}});
            fireEvent.click(submitButton);
        });

        const successMessageAfterSubmit = await screen.findByText(/created with password/);

        expect(successMessageAfterSubmit).toBeInTheDocument();
    });
});