import { render, screen } from '@testing-library/react';
import CreateGroup from '../../ReactComponents/createGroup/CreateGroup';

jest.mock('../../fetch.js');
const lib2 = require('../../fetch.js');

describe('test create group', () => {
    test('test create group function', () => {
      render(<CreateGroup />);
      const groupName = document.getElementById('groupName');
      groupName.value = '1';
      const btn = document.getElementById('btn1');
      btn.click();
    });

    test('test create group function', () => {
      render(<CreateGroup />);
      lib2.createGroup.mockResolvedValue(200);
      const groupName = document.getElementById('groupName');
      groupName.value = '1';
      const btn = document.getElementById('btn1');
      btn.click();
    });
})