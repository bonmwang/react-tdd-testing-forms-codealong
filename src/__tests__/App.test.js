import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

describe('App Component', () => {
  // Size select element tests
  describe('Size Selection', () => {
    test("select element initially displays 'small'", () => {
      render(<App />);
      const sizeSelect = screen.getByRole('combobox', { name: /select size/i });
      expect(sizeSelect).toHaveValue('small');
    });

    test("can change size to medium", () => {
      render(<App />);
      const sizeSelect = screen.getByRole('combobox', { name: /select size/i });
      userEvent.selectOptions(sizeSelect, 'medium');
      expect(sizeSelect).toHaveValue('medium');
    });

    test("can change size to large", () => {
      render(<App />);
      const sizeSelect = screen.getByRole('combobox', { name: /select size/i });
      userEvent.selectOptions(sizeSelect, 'large');
      expect(sizeSelect).toHaveValue('large');
    });
  });

  // Your Selection text tests
  describe('Selection Display', () => {
    test("initially displays 'small cheese'", () => {
      render(<App />);
      expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
    });

    test("updates to show pepperoni when checked", () => {
      render(<App />);
      const pepperoniCheckbox = screen.getByRole('checkbox', { name: /add pepperoni/i });
      userEvent.click(pepperoniCheckbox);
      expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();
    });

    test("updates to show large size when selected", () => {
      render(<App />);
      const sizeSelect = screen.getByRole('combobox', { name: /select size/i });
      userEvent.selectOptions(sizeSelect, 'large');
      expect(screen.getByText(/large cheese/i)).toBeInTheDocument();
    });
  });

  // Contact Info tests
  describe('Contact Information', () => {
    test("text input has correct placeholder", () => {
      render(<App />);
      expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    });

    test("can update contact info", () => {
      render(<App />);
      const emailInput = screen.getByRole('textbox', { name: /enter your email address/i });
      userEvent.type(emailInput, 'test@example.com');
      expect(emailInput).toHaveValue('test@example.com');
    });
  });

  // Submit Order button tests
  describe('Order Submission', () => {
    test("submit button exists", () => {
      render(<App />);
      expect(screen.getByRole('button', { name: /submit order/i })).toBeInTheDocument();
    });

    test("shows thank you message after submission", () => {
      render(<App />);
      const submitButton = screen.getByRole('button', { name: /submit order/i });
      userEvent.click(submitButton);
      expect(screen.getByText(/thanks for your order/i)).toBeInTheDocument();
    });
  });
});