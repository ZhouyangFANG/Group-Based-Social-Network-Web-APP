import { render, screen } from '@testing-library/react';
import CreateGroup from '../../ReactComponents/createGroup/CreateGroup';

test('test create group function', () => {
  render(<CreateGroup />);
  const btn = document.getElementById('btn1');
  btn.click();
});