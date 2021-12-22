import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
import GroupPage from '../../ReactComponents/GroupView/GroupPage';
import { BrowserRouter } from "react-router-dom";


beforeEach(async () => {
  await waitFor(() => {
    render(<BrowserRouter>
      <GroupPage />
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

    // expect(screen.getByTestId('submit')).toBeInTheDocument();
    // expect(screen.getByText('Leave This Group')).toBeInTheDocument();

    
    // expect(screen.getByText('player1:5')).toBeInTheDocument();
  });
})