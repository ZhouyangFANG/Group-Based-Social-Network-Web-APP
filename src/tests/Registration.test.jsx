import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
import Registration from '../ReactComponents/Registration.jsx';
import { BrowserRouter } from "react-router-dom";

jest.mock('../fetch.js');
const lib2 = require('../fetch.js');

beforeEach(async () => {
  await waitFor(() => {
    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>);
  });
});


afterEach(() => {
  cleanup();
});

describe('show start page correctly', () => {

  test('component rendered', async () => {
    // const listNode = await screen.getByTestId('2');
    // expect(screen.getByText('player2:10')).toBeInTheDocument();
    window.alert = () => { };  // provide an empty implementation for window.alert

    expect(screen.getByText('Already have an account? Login')).toBeInTheDocument();

    lib2.register.mockResolvedValue(201);
    const pwd = document.getElementById('password');
    const user = document.getElementById('userName');
    pwd.value = '11111111';
    user.value = '1111111';
    const btn = document.getElementById('registerBtn');
    btn.click();


    // expect(screen.getByText('player1:5')).toBeInTheDocument();
  });
  test('button click', async () => {
    window.alert = () => { };  // provide an empty implementation for window.alert
    const pwd = document.getElementById('password');
    const user = document.getElementById('userName');
    pwd.value = '11111111';
    user.value = '1111111';
    const btn = document.getElementById('registerBtn');
    btn.click();
  })
  test('registeration failed', async () => {
    window.alert = () => { };  // provide an empty implementation for window.alert
    const btn = document.getElementById('registerBtn');
    btn.click();
  })
})