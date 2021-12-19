import { render, screen } from '@testing-library/react';
import MainView from '../ReactComponents/MainView';
import { BrowserRouter } from "react-router-dom";

test('renders learn react link', () => {
  render(<BrowserRouter>
    <MainView />
  </BrowserRouter>);
  const element = screen.getByText(/Public Group/i);
  expect(element).toBeInTheDocument();
  const btn = document.getElementById('groupList');
  btn.click();
  const btn1 = document.getElementById('btn1');
  btn1.click();
  const btn2 = document.getElementById('btn2');
  btn2.click();
  const btn3 = document.getElementById('btn3');
  btn3.click();

});