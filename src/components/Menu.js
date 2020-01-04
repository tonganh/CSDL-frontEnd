import React, { Component } from 'react';
import '../Css/menu.css';
import axios from '../axios';
import NavBar from './NavBar';
import SearchField from './SearchField';

class Menu extends Component {
    state={
        category:'pizza',
        products:[],
        activeField: [true,false,false],
        searchText:''
    }

    componentDidMount(){
        axios.get(`/product/list?pageNumber=1&pageSize=12&keyword=${this.state.searchText}`)
        .then(data => {
            this.setState({
                products: data.data.data.recordset
            })
        })
        .catch(err => console.log(err))
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSearch = text => {
        this.setState({
            searchText:text
        })
    }

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
                            products: data.data.data.recordset
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
                            <img src={`http://localhost:5000/image/products/${item.Image}.png`} alt={item.Name}/>
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
                <NavBar products={this.props.state.products} menu={this.state.menu} Total={this.props.state.Total} count={this.props.state.count}/>
                <div id="content">
                    <div className="content-top">
                    <a href="/">Trang chủ</a>
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
                                <span className="sort-label">Bộ lọc</span>
                                <div className="sort-option">
                                    <div className="option-item"
                                        style={this.state.activeField[0] ? {
                                            color: "white",
                                            backgroundColor: "#f7462e"
                                        } : {}}
                                        onClick={this.handleSort}>Sản phẩm</div>
                                    <div className="option-item"
                                        style={this.state.activeField[1] ? {
                                            color: "white",
                                            backgroundColor: "#f7462e"
                                        } : {}}
                                        onClick={this.handleSort}>Bán chạy</div>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            style={this.state.activeField[2] ? {
                                                color: "white",
                                                backgroundColor: "#f7462e"
                                            } : {}}>
                                            Giá tăng dần
                                            </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <div className="dropdown-item" onClick={this.handleSort}>Giá tăng dần</div>
                                            <div className="dropdown-item" onClick={this.handleSort}>Giá giảm dần</div>
                                        </div>
                                        <SearchField handleSearch={this.handleSearch}/>
                                    </div>
                                </div>
                            </div>
                            <div className="sort-menu-right">
                                <div className="price-range">
                                    <div className="price-range-header">Khoảng giá:</div>
                                    <div className="price-range-value">
                                        <input type="text" placeholder="từ" name='from' onChange={this.handleChange} />
                                        <div>-</div>
                                        <input type="text" placeholder="đến" name='to' onChange={this.handleChange} />
                                    </div>
                                    <button onClick={(event) => { this.handleFilter(1, event); }} className="price-range-confirm btn btn-primary">Lọc</button></div>
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
            </div>
        );
    }
}

export default Menu;