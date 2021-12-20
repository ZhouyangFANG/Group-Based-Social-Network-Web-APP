import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
import Login from '../ReactComponents/Login';
import { BrowserRouter } from "react-router-dom";

jest.mock('../fetch.js');
const lib2 = require('../fetch.js');


beforeEach(async () => {
  await waitFor(() => {
    render(
      <Login />);
  });
});

afterEach(() => {
  cleanup();
});

describe('show start page correctly', () => {
  
  // test('component rendered', async () => {
  //   // const listNode = await screen.getByTestId('2');
  //   // expect(screen.getByText('player2:10')).toBeInTheDocument();

  //   expect(screen.getByText('Already have an account? Login')).toBeInTheDocument();

    
  //   // expect(screen.getByText('player1:5')).toBeInTheDocument();
  // });
  test('button click', async () => {
  //   fireEvent.change(screen.getByRole('textbox'), {
  //     target: { value: '^' },
  //   });
    // fireEvent.submit(screen.getByRole('button'));
    lib2.login.mockResolvedValue(200);
    const username = document.getElementById('email');
    expect(username).not.toBeNull();
    username.value = 'testUser102';
    const pwd = document.getElementById('password');
    expect(pwd).not.toBeNull();
    pwd.value = '123456';
    const btn = document.getElementById('loginBtn');
    btn.click();

    // expect(handleSubmit).toHaveBeenCalled();
  //   expect(screen.getByText('Invalid User Name!!')).toBeInTheDocument();
  //   // const display = screen.getByText('Display Leaders');
  //   // console.log(display);
  //   // xpect(screen.getByText('Stop display leaders')).toBeInTheDocument();
  //   // // expect(screen.getByText('cicici')).toBeInTheDocument();
  })

  test('login failed', async () => {
    const btn = document.getElementById('loginBtn');
    btn.click();
  })
})