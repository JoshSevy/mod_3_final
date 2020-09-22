import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../../apiCalls');
import { getOrders, postOrder } from '../../apiCalls';
import App from './App';

describe('App Component', () => {
  it('should render App Component Correctly', () => {
    getOrders.mockResolvedValue({orders: []})
    render(
      <App />
    )
    
    const title = screen.getByRole('heading', {name: /burrito builder/i});
    const noOrderMessage = screen.getByText(/no orders/i);
    const beansBtn = screen.getByRole('button', {name: /beans/i});
    const submitBtn = screen.getByRole('button', {name: /submit/i});
    const allBtns = screen.getAllByRole('button');
    const orderMessage = screen.getByText(/order: nothing/i);

    expect(title).toBeInTheDocument();
    expect(noOrderMessage).toBeInTheDocument();
    expect(beansBtn).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(orderMessage).toBeInTheDocument();
    expect(allBtns).toHaveLength(13);
  })

  it('should fetch orders and display on mount', async () => {
    getOrders.mockResolvedValue({
      orders: [
        {name: 'Josh', ingredients: ['steak', 'hot sauce']},
        {name: 'Miles', ingredients: ['beans', 'sour cream']}
      ]
    })

    render(
      <App />
    )

    const order1 = await waitFor(() => screen.getByText(/josh/i));
    const order2 = await waitFor(() => screen.getByText(/miles/i));

    expect(order1).toBeInTheDocument();
    expect(order2).toBeInTheDocument();
  })

  it('should add order to orders on submit', async () => {
    postOrder.mockResolvedValueOnce({ name: "sammies", ingredients: ['beans', 'lettuce'] });

    getOrders.mockResolvedValueOnce({orders: [{ name: "it worked", ingredients: ['beans', 'lettuce'] }]})
    render(
      <App />
    )

    const noOrders = screen.getByText(/no orders yet/i);
    const nameInput = screen.getByRole('textbox');
    const beansBtn = screen.getByRole('button', { name: /beans/i });
    const lettuceBtn = screen.getByRole('button', { name: /lettuce/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    expect(noOrders).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'Sammies' } });
    fireEvent.click(beansBtn);
    fireEvent.click(lettuceBtn);

    const checkInput = screen.getByDisplayValue(/sammies/i)
    const orderIngredients = screen.getByText(/order: beans, lettuce/i);

    expect(checkInput).toBeInTheDocument()
    expect(orderIngredients).toBeInTheDocument();

    fireEvent.click(submitBtn);

    const orderAdded = await waitFor(() => screen.getByText(/it worked/));

    expect(orderAdded).toBeInTheDocument();
  });

})
