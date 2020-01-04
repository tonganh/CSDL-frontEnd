import React, { Component } from 'react';
import '../Css/cart.css';
import axios from '../axios';
import NavBar from './NavBar';
import Footer from './Footer';

class Cart extends Component {
    state = {
        // products: [],
        userInfo: [],
        cartInfo: [],
        total: 0
    }

    async UNSAFE_componentWillMount() {
        const username = localStorage.getItem('username');
        try {
            const userData = await fetch(`http://localhost:5000/customer/info/${username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            ).then((res) => { return res.json(); });
            console.log(userData.data);
            const cartData = await fetch(`http://localhost:5000/cart/${username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            ).then((res) => { return res.json(); });
            console.log(cartData.data);
            let total = 0;
            for (const item of cartData.data) {
                total += item.Price * item.Quantity
            }
            this.setState({
                userInfo: userData.data,
                cartInfo: cartData.data,
                total: total
            });

        } catch (err) {
            console.log(err.message);
        }
    }

    handlePurchase = async (event) => {
        event.preventDefault();
        let orderList = [];
        for (const item of this.state.cartInfo) {
            const newItem = {
                productID: item.ProductID,
                quantity: item.Quantity
            };
            orderList.push(newItem);
        }
        console.log(orderList);
        try {
            const data = await fetch("http://localhost:5000/order/new-order/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username: localStorage.getItem('username'),
                    orderList: orderList,
                    total: this.state.total * 1.05,
                    status: "Đặt hàng thành công"
                })
            }).then((res) => { return res.json(); });
            console.log(data)
            if (!data.success) {
                window.alert(data.message);
            } else {
                window.alert("Đặt hàng thành công!");
                window.location.href = '/order-list';
            }
        } catch (err) {
            this.setState({
                errMessage: err.message
            });
        }
    }


    _Delete = (item, event) => {
        event.preventDefault();
        console.log("xoa no:", item);
        axios.delete('/cart/delete', {
            data: {
                username: localStorage.getItem('username'),
                productID: item.ProductID
            }
        })
            .then(response => {
                console.log(response.data.success);
                const i = this.state.cartInfo.indexOf(item);
                if (i != -1) {
                    this.setState({
                        cartInfo: this.state.cartInfo.splice(i, 1)
                    });
                }
                console.log(this.state.cartInfo);
            })
            .catch(err => console.log(err))
    }

    Decrease = (item, event) => {
        event.preventDefault();

    }

    Increment = (item, event) => {
        event.preventDefault();
    }

    render() {
        const cartItems = this.state.cartInfo.map(item => (
            <div className="cart-item">
                <div className="cart-checkbox">
                    <input type="checkbox" />
                </div>
                <div className="cart-img">
                    <img src={`http://localhost:5000/image/products/${item.Image}.png`} alt={item.ProductID} />
                </div>
                <div className="cart-description">
                    <span>{item.Name}</span>
                </div>
                <div className="cart-price">
                    <span>{item.Price}</span>
                </div>
                <div className="cart-quantity">
                    <div>
                        <button type="button" onClick={(event) => this.Decrease(item, event)} className="btn btn-dark" ><i className="fas fa-minus" href="/home"></i></button>
                        <input type="number" name="quantity" min="1" placeholder={item.Quantity} />
                        <button type="button" onClick={(event) => this.Increment(item, event)} className="btn btn-light"><i className="fas fa-plus"></i></button>
                    </div>
                </div>
                <div className="list-header-right">
                    <div className="list-delete">
                        <i className="fas fa-trash" onClick={(event) => { this._Delete(item, event) }}></i>
                    </div>
                </div>
            </div>
        ));
        return (
            <div>
                <NavBar products={this.props.state.products} handleSearch={this.props.handleSearch} Total={this.state.total} count={this.props.state.count} />
                <div className="cartcontent">

                    <div className="cart-bottom">
                        <div className="cart-bottom-left">
                            {/* <div className="cart-bottom-left-top">
                                <div className="list-header">
                                    <div className="list-header-left">
                                        <input type="checkbox"/>
                                        <label>Select all (3 product)</label>
                                    </div>
                                    <div className="list-header-right">
                                        <div className="list-delete">
                                            <i className="fas fa-trash"></i>
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="cart-bottom-left-bottom">
                                {cartItems}
                            </div>
                        </div>
                        <div className="cart-bottom-right">
                            <div className="product-location">
                                <div className="location-header">Địa chỉ giao hàng</div>
                                <div className="location-info">
                                    <i className="fas fa-map-marker"></i>
                                    <div>Khách hàng: {this.state.userInfo.Name}</div>
                                    <div>Địa chỉ: {this.state.userInfo.Address}</div>
                                    <div>Số điện thoại: {this.state.userInfo.Phone}</div>
                                </div>

                            </div>
                            <div className="cart-summary">
                                <div className="summary-header">
                                    Thông tin giỏ hàng
                                </div>
                                <div className="summary-content">
                                    <div className="sub-total">
                                        <div className="sub-total-left">
                                            Tạm tính:
                                        </div>
                                        <div className="sub-total-right">
                                            {this.state.total}đ
                                        </div>
                                    </div>
                                    <div className="ship-fee">
                                        <div className="ship-fee-left">Phí vận chuyển:</div>
                                        <div className="ship-fee-right">{this.state.total / 20}đ</div>
                                    </div>
                                </div>
                                {/* <div className="summary-voucher">
                                    <input type="text" className="voucher-use" placeholder="voucher" />
                                    <button className="voucher-apply btn btn-primary">Apply</button>
                                </div> */}
                                <div className="summary-total">
                                    <div className="summary-total-left">Total:</div>
                                    <div className="summary-total-right">
                                        <div>{this.state.total * 1.05}đ</div>
                                        <div>(đã bao gồm VAT)</div>
                                    </div>
                                </div>
                                <div className="summary-confirm">
                                    <button className="btn btn-danger btn-block" onClick={(event) => { this.handlePurchase(event); }}>
                                        Thanh toán
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Cart;