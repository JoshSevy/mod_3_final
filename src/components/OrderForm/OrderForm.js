import React, { Component } from 'react';

import { postOrder } from '../../apiCalls'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      isFormValid: false
    };
  }
  handleIngredientChange = e => {
    e.preventDefault();
    const burritoIngredients = [...this.state.ingredients] || [];
    burritoIngredients.push(e.target.name)
    this.setState({ingredients: burritoIngredients});
  }

  handleNameChange = e => {
    this.setState({name: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.formValidation()
    if (this.state.isFormValid) {
    postOrder({name: this.state.name, ingredients: this.state.ingredients});
    this.clearInputs() 
    this.setState({isFormValid: false})
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  formValidation = () => {
    if (this.state.ingredients.length > 0 && this.state.name.length > 0) {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
