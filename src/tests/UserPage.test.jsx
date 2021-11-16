import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
import UserProfile from '../ReactComponents/UserProfile';
import { BrowserRouter } from "react-router-dom";

beforeEach(async () => {
  await waitFor(() => {
    render(<BrowserRouter>
      <UserProfile />
    </BrowserRouter>);
  });
});

afterEach(() => {
  cleanup();
});

describe('test user profile page', () => {
  
  test('component rendered', async () => {

    expect(screen.getByText('User Profile')).toBeInTheDocument();

  });
})