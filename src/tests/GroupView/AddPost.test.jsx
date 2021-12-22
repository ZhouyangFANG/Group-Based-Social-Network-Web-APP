import { render, screen } from '@testing-library/react';
import AddPost from '../../ReactComponents/GroupView/AddPost';

jest.mock('../../fetch.js');
const lib2 = require('../../fetch.js');

describe('test add post function', () => {
    test('test add post function', () => {
      render(<AddPost />);
      const btn = document.getElementById('addBtn');
      btn.click();
    });

    test('test add post function', () => {
      render(<AddPost />);
      lib2.addPost.mockResolvedValue(200);
      const btn = document.getElementById('addBtn');
      btn.click();
    });

    test('test add post function', () => {
      render(<AddPost />);
      const btn = document.getElementById('btn1');
      btn.click();
    });

    test('test add post function', () => {
      render(<AddPost />);
      const btn = document.getElementById('btn0');
      btn.click();
    });
})