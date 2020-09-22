import React, { Component } from 'react';
import './App.css';
import { getOrders, deleteOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
    }
  }

  componentDidMount() {
    getOrders()
      .then(response => this.setState({orders: response.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  orderUp = (id) => {
    deleteOrder(id)
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>

        <Orders 
          orders={this.state.orders}
          orderUp={this.orderUp}  
        />
      </main>
    );
  }
}


export default App;
