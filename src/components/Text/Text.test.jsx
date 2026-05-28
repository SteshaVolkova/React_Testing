import { render, screen } from "@testing-library/react";
import { Text } from "./Text";

const text = 'Some text to test.';

describe('Text', () => {
    it('should render text with children', () => {
        render(<Text>{text}</Text>);

        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render text with the correct className', () => {
        render(<Text className='text-test'>{text}</Text>);

        const element = screen.getByText(text);

        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('text-test');
        expect(element).toHaveClass('text');
    });

    it('should render text with error className if isError', () => {
        render(<Text isError={true}>{text}</Text>);

        const element = screen.getByText(text);

        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('error');
        expect(element).toHaveClass('text');
    });

    it('should render text with success className if isSuccess', () => {
        render(<Text isSuccess={true}>{text}</Text>);

        const element = screen.getByText(text);

        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('success');
        expect(element).toHaveClass('text');
    });
});