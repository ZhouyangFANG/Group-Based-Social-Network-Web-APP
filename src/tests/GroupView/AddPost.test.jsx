import { render, screen } from '@testing-library/react';
import AddPost from '../../ReactComponents/GroupView/AddPost';

test('test add post function', () => {
  render(<AddPost />);
  const btn = document.getElementById('addBtn');
  btn.click();
  
});