import {fireEvent, render, screen} from '@testing-library/react';
import App from "./App";
import handleUpdateOther from './helper';


test('Test case for functional module 1', () => { 
render(<App/>);
const btn = screen.getByTestId("btn1");
fireEvent.click(btn);
expect(screen.getByText("hello")).toBeInTheDocument();
});

test("Test functional module from helper file", ()=> {
  expect(handleUpdateOther()).toMatch('Hello From Helper');
})

test("Test input box byrole", ()=>{
  render(<App/>);
  const inputField = screen.getByTestId("inputHello");
  expect(inputField).toBeInTheDocument();
  expect(inputField).toHaveValue("Hello");
  expect(inputField).toBeDisabled();
})