import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Form } from './Form';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Form', () => {
    it('should render Form with children', () => {
        renderWithProviders(
            <Form>
                <div data-testid="my-child" />
            </Form>,
        );

        expect(screen.getByTestId('my-child')).toBeInTheDocument();
        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('should invoke the onSubmit callback', () => {
        const onSubmit = jest.fn();

        renderWithProviders(<Form onSubmit={onSubmit} />);

        const myForm = screen.getByRole('form');

        fireEvent.submit(myForm);

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should invoke the onSuccess callback', async () => {
        const onSuccess = jest.fn();

        renderWithProviders(<Form onSubmit={jest.fn()} onSuccess={onSuccess} />);

        const myForm = screen.getByRole('form');

        fireEvent.submit(myForm);

        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalledTimes(1);
        });
    });

    it('should invoke the onError callback', async () => {
        const onError = jest.fn();

        renderWithProviders(
            <Form onSubmit={() => Promise.reject()} onError={onError} />,
        );

        const myForm = screen.getByRole('form');

        fireEvent.submit(myForm);

        await waitFor(() => {
            expect(onError).toHaveBeenCalledTimes(1);
        });
    });
});