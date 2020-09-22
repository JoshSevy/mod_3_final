import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import OrderForm from './OrderForm';

describe('OrderForm Component', () => {
  it('should render OrderForm Component correctly', () => {
    render (
      <OrderForm />
    )
    const nameInput = screen.getByRole('textbox');
    const beansBtn = screen.getByRole('button', {name: /beans/i});
    const lettuceBtn = screen.getByRole('button', {name: /lettuce/i});
    const allBtns = screen.getAllByRole('button');

    expect(nameInput).toBeInTheDocument();
    expect(beansBtn).toBeInTheDocument();
    expect(lettuceBtn).toBeInTheDocument();
    expect(allBtns).toHaveLength(13);
  })

  it('should check text input', () => {
    render(
      <OrderForm />
    )

    const nameInput = screen.getByRole('textbox');

    fireEvent.change(nameInput, {target: {value: 'Sammies'}});

    const inputUpdate = screen.getByDisplayValue(/sammies/i);

    expect(inputUpdate).toBeInTheDocument();
  })

  it('should add to order message on button click', () => {
    render(
      <OrderForm />
    )

    const noOptions = screen.getByText(/order: nothing/i);
    const beansBtn = screen.getByRole('button', { name: /beans/i });
    const lettuceBtn = screen.getByRole('button', { name: /lettuce/i });

    expect(noOptions).toBeInTheDocument();
    expect(beansBtn).toBeInTheDocument();
    expect(lettuceBtn).toBeInTheDocument();

    fireEvent.click(beansBtn);
    fireEvent.click(lettuceBtn);

    const orderIngredients = screen.getByText(/order: beans, lettuce/i);

    expect(orderIngredients).toBeInTheDocument();
  })
})