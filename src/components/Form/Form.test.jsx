import { fireEvent, render, waitFor } from "@testing-library/react";
import { Form } from "./Form";

describe('Form', () => {
    it('should render form with children', () => {
        const { container, getByTestId } = render(<Form>
            <div data-testid="my-child"></div>
        </Form>);

        expect(getByTestId('my-child')).toBeInTheDocument();
        expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('should invoke the onSubmit callback', () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const myForm = container.querySelector('form');

        fireEvent.submit(myForm);

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should invoke the onSuccess callback', async () => {
        const onSuccess = jest.fn();

        const { container } = render(<Form onSubmit={jest.fn()} onSuccess={onSuccess} />);

        const myForm = container.querySelector('form');

        fireEvent.submit(myForm);
        
        // так как onSuccess - это следствие успешной
        // отправки формы, мы не просто указываем await,
        // но ещё и используем специальную утилиту waitFor, которая говорит:
        // "Дождиcь пожалуйста, пока onSuccess был вызван"
        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalledTimes(1);
        });
    });

    it('should invoke the onError callback', async () => {
        const onError = jest.fn();

        // для ошибки в onSubmit что-то должно пойти не так, поэтому используем Promise.reject()
        const { container } = render(<Form onSubmit={() => Promise.reject()} onError={onError} />);

        const myForm = container.querySelector('form');

        fireEvent.submit(myForm);
        
        await waitFor(() => {
            expect(onError).toHaveBeenCalledTimes(1);
        });
    });
});