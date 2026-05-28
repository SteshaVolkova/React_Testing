import { render, screen } from '@testing-library/react';
import { Title } from './Title';

const text = 'Hello world!';

describe('Title', () => {
    it('should render title with children', () => {
        // метод render позволяет рендерить react компоненты,
        // передавая в него пропсы
        render(<Title>{text}</Title>);


        // метод screen позволяет нам искать элементы
        // за счёт доп методов getBy...
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render title with the correct tag', () => {
        const { container } = render(<Title level={2}>{text}</Title>);

        expect(container.querySelector('h2')).toBeInTheDocument();
    });

    it('should render title with the correct className', () => {
        render(<Title className='title-test'>{text}</Title>);

        const element = screen.getByText(text);


        // toBeInTheDocument и toHaveClass дополнительные
        // матчеры для react 
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('title-test');
        expect(element).toHaveClass('title');
    });
});