import { render, screen } from '@testing-library/react';
import MainView from '../ReactComponents/MainView';

test('renders learn react link', () => {
  render(<MainView />);
  const element = screen.getByText(/Public Groups/i);
  expect(element).toBeInTheDocument();
});