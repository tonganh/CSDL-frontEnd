import React, { Component } from 'react';
import '../Css/menu.css';
import axios from '../axios';
import NavBar from './NavBar';
import Footer from './Footer';

class Menu extends Component {
    state={
        category:'pizza',
        products:[],
        menu:true
    }

    componentWillReceiveProps(){
        var keyword = this.props.state.searchText ? this.props.state.searchText : '';
        axios.get(`/product/list?pageNumber=1&pageSize=12&keyword=${keyword}`)
        .then(data => {
            this.setState({
                products: data.data.data.recordset
            })
        })
        .catch(err => console.log(err))
    }

    handleChange = (event) => {{
        this.setState({
            [event.target.name]:event.target.value
        })
    }}

    handleCategory = (category,event) => {
        event.preventDefault();
        this.setState({category:category});
        axios.get(`/product/list?pageNumber=1&pageSize=12&keyword=${category}`)
        .then(data => {
            this.setState({
                products: data.data.data.recordset
            })
        })
        .catch(err => console.log(err))
    }

    handleSort = (event) => {
        event.preventDefault();
        if(this.state.from && this.state.to){
            if(this.state.sortDirection){
                axios.get(`filter/price?from=${this.state.from}&to=${this.state.to}&pageNumber=1&pageSize=10&sortField=Price&sortDirection=${this.state.sortDirection}`)
                .then(data => {
                    this.setState({
                        products: data.data.data.recordset
                    })
                })
                .catch(err => console.log(err))
            } else{
                    axios.get(`filter/price?from=${this.state.from}&to=${this.state.to}&pageNumber=1&pageSize=10`)
                    .then(data => {
                        this.setState({
                            products: data.data.data.recordsset
                        })
                    })
                    .catch(err => console.log(err))
            }
        }
        else if(this.state.sortDirection){
            axios.get(`/product/list?pageNumber=1&pageSize=10&keyword=${this.state.category}&sortField=Price&sortDirection=${this.state.sortDirection}`)
            .then(data => {
                this.setState({
                    products: data.data.data.recordset
                })
            })
            .catch(err => console.log(err))
        } 
    }

    render() {
        const Products = this.state.products.map(item => (
            <div key={item.ProductID} className='trending-item-root'> 
                <div className="trending-item" data-aos="fade-right" data-aos-delay="500">
                    <div className="trending-item-img">
                        <a href={`/product/${item.ProductID}`} target="__blank">
                            <img src={`./Images/${item.Image}.png`} alt="image"/>
                        </a>
                    </div>
                    <div className="trending-item-text">
                        <a href={`/product/${item.ProductID}`} target="__blank">
                            <h2>{item.Name}</h2>
                        </a>
                    </div>
                        <div className="trending-item-cost">
                        <span>{item.Price}đ</span>
                    </div>
                    <a href='/menu' onClick={(event) => {this.props.addtoCart(item,1,event)}}>
                        <div className="trending-item-expand">
                            <div className="expand-cart">
                                <i className="fas fa-cart-plus"></i>
                                <p>Add to cart</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        ))

        return (
            <div>
                <NavBar products={this.props.state.products} handleCategory={this.handleCategory} handleSearch={this.props.handleSearch} menu={this.state.menu} Total={this.props.state.Total} count={this.props.state.count}/>
                <div id="content">
                    <div className="content-top">
                    <a href="/">City fun</a>
                    <i className="fas fa-chevron-right" />
                    <a href="/menu">Menu</a>
                    </div>
                    {/* main-menu */}
                    <div className="main-menu">
                    <div className="main-menu-header">
                        <div className="main-menu-top">ALWAY TASTY FOOD</div>
                        <div className="main-menu-center">Choose &amp; enjoy</div>
                        <div className="main-menu-bottom">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus.
                        </div>
                    </div>
                    {/* pagination */}
                    <div className="pagination">
                        <div className="pagination-item pag-1" onClick={(event) => {this.handleCategory('pizza',event)}} >
                            <i className="fas fa-pizza-slice"></i>
                            <h2>Pizza</h2>
                        </div>
                        <div className="pagination-item pag-2" onClick={(event) => {this.handleCategory('burger',event)}}>
                            <i className="fas fa-hamburger"></i>
                            <h2>Burger</h2>
                        </div>
                        <div className="pagination-item pag-3" onClick={(event) => {this.handleCategory('milktea',event)}}>
                            <i className="fas fa-cocktail"></i>
                            <h2>Milk Tea</h2>
                        </div>
                    </div>
                    {/* sort menu */}
                    <div className="sort-menu">
                        <div className="sort-menu-left">
                        <span className="sort-label">Sort by</span>
                        <div className="sort-option">
                            <div className="option-item">New</div>
                            <div className="option-item">Best seller</div>
                            <div className="option-item">Most view</div>
                            <div className=" item-4">
                            <select id='selectbox' name='sortDirection' onChange={this.handleChange} onClick={this.handleSort}>
                                <option defaultValue disabled hidden> 
                                    Price
                                </option>
                                <option value={1}>Thap den cao</option>
                                <option value={0}>Cao den thap</option>
                            </select>
                            </div>
                        </div>
                        </div>
                        <div className="sort-menu-right">
                        <div className="price-range">
                            <div className="price-range-header">Price range</div>
                            <div className="price-range-value">
                            <input type="text" placeholder="From" name='from' onChange={this.handleChange}/>
                            <div>-</div>
                            <input type="text" placeholder="To" name='to' onChange={this.handleChange}/>
                            </div>
                            <button onClick={this.handleSort} className="price-range-confirm btn btn-primary">Confirm</button></div>
                        </div>
                    </div>
                    </div>
                    {/* main-manu-display */}
                    <div className="main-menu-display-container area-1">
                        <div className="sub-main-menu-display-container">
                            {Products}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Menu;