import React, { Component } from 'react';
import axios from './axios.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './containers/Home';
import Product from './components/Product';
import Menu from './components/Menu';
import MenuPizza from './components/MenuPizza';
import MenuBurger from './components/MenuBurger';
import MenuMilktea from './components/MenuMilktea';
import Cart from './components/Cart';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';

import Footer from '../src/components/Footer';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

class App extends Component {
  state = {
    products: [],
    count: 0,
    Total: 0
  }

  componentDidMount() {
    axios.get(`/cart/${localStorage.getItem('username')}`)
      .then(data => {
        this.setState({
          products: data.data.data,
          count: data.data.data.length
        })
        this.state.products.map(item => {
          this.setState({
            Total: this.state.Total + item.Price * item.Quantity
          })
        })
      })
      .catch(err => console.log(err))
  }

  _onLogin = (username, password) => {
    axios.post('/customer/login', {
      username: username,
      password: password
    })
      .then(response => {
        if (response.data.success !== false) {
          this.setState({
            username: response.data.username,
            id: response.data.id
          })
          console.log(this.state)
          localStorage.setItem('username', response.data.username)
          console.log(response.data.username)
          window.location.href = '/';
        }
        else {
          alert("Wrong username or password");
        }
      })
      .catch(err => console.log(err))
  }

  _addtoCart = (item, quantity, event) => {
    event.preventDefault();
    const username = localStorage.getItem('username');
    if (username) {
      axios.post('/cart/add', {
        username: username,
        productID: item.ProductID,
        quantity: quantity,
        name: item.Name,
        image: item.Image
      })
        .then(response => {
          console.log(response.data.success)
        })
        .catch(err => console.log(err));
      axios.get(`/cart/${localStorage.getItem('username')}`)
        .then(data => {
          this.setState({
            products: data.data.data,
            count: data.data.data.length
          })
          this.state.products.map(item => {
            this.setState({
              Total: this.state.Total + item.Price * item.Quantity
            })
          })
        })
        .catch(err => console.log(err))
    }
    else {
      alert('You must log in first');
    }
  }

  _handleSearch = text => {
    this.setState({
      searchText: text
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} /> */}
              <Route exact path="/" render={(props) => {
                return <Home {...props} handleSearch={this._handleSearch} addtoCart={this._addtoCart} state={this.state} />
              }} />
              <Route exact path="/signin" render={(props) => {
                return <SignIn {...props} handleSearch={this._handleSearch} state={this.state} _onLogin={this._onLogin} />
              }} />
              <Route exact path="/product/:productID" render={(props) => {
                return <Product {...props} handleSearch={this._handleSearch} addtoCart={this._addtoCart} state={this.state} />
              }} />
              <Route exact path="/signup" render={(props) => {
                return <SignUp {...props} handleSearch={this._handleSearch} state={this.state} />
              }} />
              <Route exact path="/cart" render={(props) => {
                return <Cart {...props} handleSearch={this._handleSearch} state={this.state} />
              }} />
              <Route exact path="/order-list" render={(props) => {
                return <OrderList {...props} handleSearch={this._handleSearch} state={this.state} />
              }} />
              <Route exact path="/order-list/:orderID" render={(props) => {
                return <OrderDetail {...props} handleSearch={this._handleSearch} state={this.state} />
              }} />
              <Route exact path="/menu" render={(props) => {
                return <Menu {...props} addtoCart={this._addtoCart} handleSearch={this._handleSearch} state={this.state} />
              }} />
              <Route exact path="/menupizza" render={(props) => {
                return <MenuPizza {...props} addtoCart={this._addtoCart} handleSearch={this._handleSearch} state={this.state} />
              }} />
              <Route exact path="/menuburger" render={(props) => {
                return <MenuBurger {...props} addtoCart={this._addtoCart} handleSearch={this._handleSearch} state={this.state} />
              }} />
              <Route exact path="/menumilktea" render={(props) => {
                return <MenuMilktea {...props} addtoCart={this._addtoCart} handleSearch={this._handleSearch} state={this.state} />
              }} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
        <Footer/>
      </div>

    );
  }
}

export default App;
