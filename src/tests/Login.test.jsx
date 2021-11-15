import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
import Login from '../ReactComponents/Login';
import { BrowserRouter } from "react-router-dom";


beforeEach(async () => {
  await waitFor(() => {
    render(<BrowserRouter>
      <Login />
    </BrowserRouter>);
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
    fireEvent.submit(screen.getByTestId('submit'));
    // expect(handleSubmit).toHaveBeenCalled();
  //   expect(screen.getByText('Invalid User Name!!')).toBeInTheDocument();
  //   // const display = screen.getByText('Display Leaders');
  //   // console.log(display);
  //   // xpect(screen.getByText('Stop display leaders')).toBeInTheDocument();
  //   // // expect(screen.getByText('cicici')).toBeInTheDocument();
  })
})