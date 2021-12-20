import { render, screen } from '@testing-library/react';
import App from '../App';
import LeftPanel from '../ReactComponents/LeftPanel';
import { BrowserRouter } from "react-router-dom";

test('test render app function', () => {
  render(<App />);
  
});

test('test left panel', () => {
  render(
  	<BrowserRouter>
  		<LeftPanel />
  	</BrowserRouter>);
});
