import MainView from '../ReactComponents/MainView';
import { BrowserRouter } from "react-router-dom";
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';

jest.mock('../api.js');
const lib2 = require('../api.js');

beforeEach(async () => {
  await waitFor(() => {
    render(
    <BrowserRouter>
      <MainView />
    </BrowserRouter>);
  });
});

afterEach(() => {
  cleanup();
});

test('sort function', () => {
  const element = screen.getByText(/Public Group/i);
  expect(element).toBeInTheDocument();
  
  const var1 = {id:0,type:1,num_members:1,num_posts:1,name:"1"};
  const var2 = {id:1,type:1,latest:0,num_members:0,num_posts:0,name:"1"};
  const var3 = {id:2,type:1,latest:0,num_members:0,num_posts:0,name:"1"};
  const var4 = {id:3,type:1,latest:2,num_members:2,num_posts:2,name:"1"};
  lib2.getGroupList.mockResolvedValue([var3,var1, var2, var4]);
  const btn = document.getElementById('groupList');
  btn.click();
  const btn1 = document.getElementById('btn1');
  btn1.click();
  const btn2 = document.getElementById('btn2');
  btn2.click();
  const btn3 = document.getElementById('btn3');
  btn3.click();

});