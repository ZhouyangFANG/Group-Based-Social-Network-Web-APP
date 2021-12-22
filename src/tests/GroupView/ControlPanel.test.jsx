import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
import ControlPanel from '../../ReactComponents/GroupView/ControlPanel';
import { BrowserRouter } from "react-router-dom";

jest.mock('../../api.js');
const lib = require('../../api.js');

beforeEach(async () => {
  await waitFor(() => {
    render(<BrowserRouter>
      <ControlPanel />
    </BrowserRouter>);
  });
});

afterEach(() => {
  cleanup();
});

describe('show control panel correctly', () => {

  test('add post', async () => {
    const btn2 = document.getElementById('btn4');
    btn2.click();
  });

  test('leave', async () => {
    lib.leaveGroup.mockResolvedValue(200);
    const btn2 = document.getElementById('btn5');
    btn2.click();
  });

})

describe('show control panel correctly', () => {
  
  test('add admin', async () => {
    lib.addAdmin.mockResolvedValue(200);
    const inpt = document.getElementById('inpt');
    inpt.value = "testUser";
    const btn = document.getElementById('btn1');
    btn.click();
  });

  test('delete admin', async () => {
    lib.removeAdmin.mockResolvedValue(200);
    const inpt = document.getElementById('inpt2');
    inpt.value = "testUser";
    const btn2 = document.getElementById('btn2');
    btn2.click();
  });


  test('invite', async () => {
    lib.inviteUser.mockResolvedValue(200);
    const inpt = document.getElementById('inpt3');
    inpt.value = "testUser";
    const btn2 = document.getElementById('btn3');
    btn2.click();
  });

})
