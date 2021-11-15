import { render, screen } from '@testing-library/react';
import MainView from '../ReactComponents/MainView';
import { BrowserRouter } from "react-router-dom";

test('renders learn react link', () => {
  render(<BrowserRouter>
    <MainView />
  </BrowserRouter>);
  const element = screen.getByText(/Public Groups/i);
  expect(element).toBeInTheDocument();
});