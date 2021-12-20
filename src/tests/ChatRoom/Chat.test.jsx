import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
import Chat from '../../ReactComponents/ChatRoom/Chat';
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Chat
        friendName='testUser'
      />
    </BrowserRouter>
  )

});

afterEach(() => {
  cleanup();
});
describe('Get players', () => {

  test('component rendered', async () => {

    expect(screen.getByTestId('send')).toHaveTextContent('Send');
  })
  // test('button click', async () => {
  //   fireEvent.click(screen.getByTestId('correct'));
  //   expect(screen.getByTestId('info')).toHaveTextContent('Your Current Score:');
  //   // await waitFor(() => fireEvent.click(display));
  //   // expect(screen.getByText('Delete Account')).toBeInTheDocument();
  //   // expect(screen.getByTestId('info')).toHaveTextContent('10');
  //   // expect(screen.getByTestId('info')).toHaveTextContent('3');
  // })
})