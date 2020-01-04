import React, { Component } from 'react';
import '../Css/header.css';
import logo from '../logo.png';
import pizza from '../pizaa-1.jpg';
import burger from '../hamburger-nav.png';
import milktea from '../milktea-nav.jpg';

class NavBar extends Component {

    state={
        searchText:''
    }

    handleChange = e => {
        // if(this.props.menu){
        //     this.props.handleSearch(e.target.value)
        // }
        // this.setState({
        //     searchText: e.target.value
        // })
        this.props.handleSearch(e.target.value)
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.handleSearch(this.state.searchText);
    }

    SignOut = () => {
        localStorage.removeItem("username")
        localStorage.removeItem('cart')
        this.props.username = null
        window.location.href='/'
    }

    render() {
        const displayItems = this.props.products ? this.props.products.map(item => (
            <a href={`/product/${item.ProductID}`}>
                <div key={item.ProductID} className="list-item">
                    <i className="fas fa-times" area-hidden="true"></i>
                    <img src={`./Images/${item.Image}.png`} alt={item.Name}/>
                    <div className="content-item-order">
                        <h3>{item.Name}</h3>
                        <p>{item.Price}đ*{item.Quantity}</p>
                    </div>
                </div>
            </a>
        )) : ''

        var username = localStorage.getItem('username')
        let SignIn
        let SignUp
        let LogOut
        if (username == null)
            SignIn = (
                <a href="signin">
                    <div className="sign-in">
                        <div className="sign-in-icon">
                            <i className="fas fa-sign-in-alt"></i>
                        </div>
                        <div className="sign-in-text">Sign in</div>
                    </div>
                </a>
            )
        else
            SignIn = (
                <div className="sign-in">
                    <div className="sign-up-icon">
                        <i className="far fa-user"></i>
                    </div>
                    <div className="sign-in-text">Welcome,{username}</div>
                </div>
            )
        if (username == null)
            SignUp = (
                <a href="/signup">
                <div className="sign-up">
                    <div className="sign-up-icon">
                        <i className="far fa-user"></i>
                    </div>
                    <div className="sign-up-text">Sign up</div>
                </div>
                </a>
            )
        if (username != null)
            LogOut = (
                <a href='/' onClick={this.SignOut}>
                    <div className="sign-up">
                        <div className="sign-in-icon">
                            <i className="fas fa-sign-in-alt"></i>
                        </div>
                        <div className="sign-up-text">Log Out</div>
                    </div>
                </a>
            )       
        return (
            <div className="header">
                <div className="top-header">
                    <div className="support">
                        <i className="fas fa-headset"></i>
                        <span className="title-support">Support</span>
                        <span className="phone-support">19001009</span>
                        <span className="support">|</span>
                        <span>
                            Follow us
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                        </span>
                    </div>
                    <div className="user">
                        {SignUp}
                        {SignIn}
                        {LogOut}
                    </div>
                </div>
                {/* bottom-header */}
                <div className="bottom-header">
                    <div className="logo">
                        <a href="/">
                            <img src={logo} alt="logo"/>
                        </a>
                        
                    </div>
                    <div className="nav">
                        <ul className="nav-ul">
                            <li><a href="/"><b>HOME</b></a></li>
                            <li><a href='/menu'>
                                <b>MENU</b>
                                <i className="fas fa-sort-down"></i>
                                <div id="sub-nav">
                                    <div className="sub-nav-item-container">
                                        <div className="sub-nav-item">
                                            <a href='/menuPizza'><img src={pizza} alt=""/></a>
                                            <span>Pizza</span>
                                        </div>
                                        <div className="sub-nav-item">
                                            <a href='/menuBurger'><img src={burger} alt=""/></a>
                                            <span>Hamburger</span>
                                        </div>
                                        <div className="sub-nav-item">
                                            <a href='/menuMilktea'><img src={milktea} alt=""/></a>
                                            <span>Milk Tea</span>
                                        </div>
                                    </div>
                                </div>
                            </a></li>
                            <li><a href="/order-list" target="__blank"><b>ORDER</b></a></li>
                        </ul>
                    </div>

                    <form className="input-form">
                        <input type="text" name="productSearch" id="productSearch" onChange={this.handleChange} placeholder="Search for products"/>
                        <a href='/menu'>
                            <button className="i-2" onClick={(e) => this.onSubmit(e)}>
                                <i className="fas fa-search search-icon"></i>
                            </button>
                        </a>
                        <input type="text" name="orderSearch" id="orderSearch" placeholder="Search for orders"/>
                        <a href='/order-detail'>
                            <button className="i-1" onClick={(e) => this.onSubmit(e)}>
                                <i className="fas fa-search search-icon"></i>
                            </button>
                        </a>
                    </form>
                    {/* <div className="hot-words">
                        <div className="hot-words-list">
                            <a href="/product">Pizaa</a>
                            <a href="/product">Chicken</a>
                            <a href="/product">Hamburger</a>
                            <a href="/product">Milk tea</a>
                            <a href="/product">Pizaa</a>
                            <a href="/product">Chicken</a>
                            <a href="/product">Hamburger</a>
                            <a href="/product">Milk tea</a>
                        </div>
                    </div> */}
                    <div className="cart">
                        <div className="ic-cart">
                                <a href='/cart'><i className="fas fa-cart-plus"></i></a>
                                <span className="number-cart">{this.props.count}</span>
                        </div>
                        <div className="text-cart">
                                <h5 className="txt-small">My cart</h5>
                                <h4 className="txt-medium">
                                    {this.props.Total}đ
                                    <i className="fas fa-sort-down"></i>
                                </h4>
                        </div>
                        <div className="list-cart">
                            {displayItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;