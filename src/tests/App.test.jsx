import { render, screen } from '@testing-library/react';
import App from '../App';
import LeftPanel from '../ReactComponents/LeftPanel'

test('test render app function', () => {
  render(<App />);
  
});

test('test left panel', () => {
  render(<LeftPanel />);
});
