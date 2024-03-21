// Include unit test for App.js here

import App from "./App";
import { render, screen } from "@testing-library/react";

test("Is Heading displayed", () => {
  render(<App />);
  const text = screen.getByText(/Find a Train/i);
  expect(text).toBeInTheDocumnet();
});

test("Is input element for train number is displayed", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  const placeholder = screen.getByPlaceholderText(/Enter train number/i);
  expect(input).toBeInTheDocumnet();
  expect(placeholder).toBeInTheDocumnet();
});

test("Is button to find train is displayed", () => {
  render(<App />);
  const btn = screen.getByRole("button");
  expect(btn).toHaveClass("btn-primary");
});
