import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

const testPlaceholder = 'test plaseholder';

// у нас есть одинаковые функции в тестах,
// котороые рендерят каждый раз примерно одно и то же.
// Мы можем создать внешнюю функцию с рендером.
function renderComponent(props) {
    return render(<Input placeholder={testPlaceholder} {...props} />);
}

describe('Input',() => {
    it('should render the input', () => {
        // Теперь вместо рендера каждый раз мы вызываем функцию.
        renderComponent();
        // render(<Input placeholder={testPlaceholder} />);

        expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument();
    });

    it('should render the input with the correct type', () => {
        renderComponent({type: 'checkbox'});
        // render(<Input placeholder={testPlaceholder} type="checkbox" />);

        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should render the input with the correct className', () => {
        renderComponent({inputClassName: 'input-test', containerClassName: 'container-test'});
        // const { container } = render(
        //     <Input
        //      placeholder={testPlaceholder}
        //      inputClassName="input-test"
        //      containerClassName="container-test"
        //     />);

        // const containerContainer = container.querySelector('.formControl.container-test');
        const containerContainer = screen.getByRole('group');
        const containerInput = screen.getByPlaceholderText(testPlaceholder);

        expect(containerContainer).toBeInTheDocument();
        expect(containerInput).toHaveClass('input-test');
        expect(containerInput).toHaveClass('input');
    });

    it('should render the input without a label', () => {
        renderComponent();
        // render(<Input placeholder={testPlaceholder} />);

        // если мы отрисовываем асинхронно по условию,
        // используем query - queryByTestId
        expect(screen.queryByTestId('input-label')).not.toBeInTheDocument();
    });

    it('should render the input with the correct label', () => {
        const labelText = 'test label text';

        render(<Input placeholder={testPlaceholder} label={labelText} />);

        expect(screen.getByLabelText(labelText)).toBeInTheDocument();
    });

    it('should render the input with the correct value', () => {
        render(
            <Input
             placeholder={testPlaceholder}
             value={123}
             onChange={jest.fn()}
            />
        );

        expect(screen.getByDisplayValue('123')).toBeInTheDocument();
    });

    it('should invoke the onChange callback', async () => {
        const onChange = jest.fn();

        render(
            <Input
             placeholder={testPlaceholder}
             value={123}
             onChange={onChange}
            />
        );

        const element = screen.getByPlaceholderText(testPlaceholder);

        // 1-st Variant:
        // базовый подход, который позволяет
        // запустить любой валидный элемент в документе.
        // В fireEvent есть разные действия, можно посмотреть их после точки
        // !!!
        // fireEvent.change(element, { target: { value: '12345' }});

        // 2-nd variant:
        // install node package @testing-library/user-event
        // в нашем случае для печатанья мы ипользуем type
        // в данном случае сколько символов мы передадим,
        // столько раз вызовется и onChange
        // первым параметром userEvent.type(element, '67')
        // мы указываем - где печатаем, а вторым - чот печатаем
        // userEvent - асинхронные,
        // потому перед вызовом колбэка мы укажем async,
        // а перед функцией мы дожидаемся выполнения с помощью await
        await userEvent.type(element, '67');

        expect(onChange).toHaveBeenCalledTimes(2);
    });
});