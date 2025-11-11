
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';

test('renders Button', () => {
  render(<Button>Test</Button>);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
