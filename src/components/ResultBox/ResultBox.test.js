import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';

  describe('Component ResultBox', () => {

    const testCases = [
      { amount: 350 },
      { amount: 160 },
      { amount: 500 },
      { amount: 10 },
    ];

    const minusCases = [
      { amount: -20, from: 'PLN', to: 'USD' },
      { amount: -540, from: 'PLN', to: 'USD' },
      { amount: -100, from: 'USD', to: 'PLN' },
      { amount: -89, from: 'USD', to: 'PLN' },
    ];

    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {
      for(const testObj of testCases) {
        render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency((testObj.amount / 3.5), 'USD')}`);
        cleanup();
      };
    });
    it('should render proper info about conversion when USD -> PLN', () => {
      for(const testObj of testCases) {
        render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency((testObj.amount * 3.5), 'PLN')}`);
        cleanup();
      };
    });
    it('should render equal value when PLN -> PLN', () => {
      for(const testObj of testCases) {
        render(<ResultBox from="PLN" to="PLN" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency(testObj.amount, 'PLN')}`);
      cleanup();
      }
    });
    it('should render equal value when USD -> USD', () => {
      for(const testObj of testCases) {
        render(<ResultBox from="USD" to="USD" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency(testObj.amount, 'USD')}`);
      cleanup();
      };
    });
    it('should render warning when value is less than 0', () => {
      for(const minusObj of minusCases) {
        render(<ResultBox from={minusObj.from} to={minusObj.to} amount={minusObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value');
      cleanup();
      };
    });
  });