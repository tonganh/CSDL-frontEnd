import React, { Component } from 'react';
import '../Css/order-detail.css';
import NavBar from './NavBar';

class OrderDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userInfo: [],//
            orderID: "",
            detail: {},
            orderList: []
        }
    }

    async UNSAFE_componentWillMount() {
        // FIXME: sai cơ mà kệ vẫn hơi đúng
        const username = localStorage.getItem('username');
        const orderID = window.location.pathname.split('/')[2];
        // console.log(orderID);
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
            const data = await fetch(`http://localhost:5000/order/${orderID}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            ).then((res) => { return res.json(); });
            console.log(data.data);
            this.setState({
                userInfo: userData.data,
                orderID: orderID,
                detail: data.data.detail,
                orderList: data.data.orderList
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        const orderList = this.state.orderList.map(item => (
            <div class="cart-item">

                <div class="cart-img">
                    <img src={`http://localhost:5000/image/products/${item.Image}.png`} alt={item.ProductID} />
                </div>
                <div className="cart-description">
                    <span>{item.Name}</span>
                </div>
                <div className="cart-price">
                    <span>{item.Price}</span>
                </div>
                <div class="cart-quantity">
                    <div class="quantity">
                        {item.Quantity}
                    </div>
                </div>
            </div>
        ));

        return (
            <div>
                <NavBar products={this.props.state.products} handleSearch={this.props.handleSearch} Total={this.props.state.Total} count={this.props.state.count} />
                <div class="orderdetail">
                    <div class="orderdetail-top">
                        <a href="/home">Trang chủ</a>
                        <i class="fas fa-chevron-right"></i>
                        <a href="/order-list">Đơn hàng</a>
                        <i class="fas fa-chevron-right"></i>
                        <a href="/order-detail">{this.state.orderID}</a>
                    </div>
                    <div class="orderdetail-bottom">
                        <div class="orderdetail-bottom-left">
                            <div class="orderdetail-bottom-left-top">
                                <div class="list-header">
                                    Đơn hàng {this.state.orderID}
                                </div>
                            </div>
                            <div class="orderdetail-bottom-left-bottom">
                                <div class="cart-item-header">
                                    <div class="header-name">Product</div>
                                    <div class="header-price">Price</div>
                                    <div class="header-quanity">Quantity</div>
                                </div>
                                {orderList}
                            </div>
                        </div>
                        <div class="orderdetail-bottom-right">
                            <div className="cart-summary">
                                <div className="summary-header">
                                    Thông tin đơn hàng
                                </div>
                                <div className="summary-content">
                                    <div className="sub-total">
                                        <div className="sub-total-left">
                                            Khách hàng:
                                        </div>
                                        <div className="sub-total-right">
                                            {this.state.userInfo.Name}
                                        </div>
                                    </div>
                                    <div className="sub-total">
                                        <div className="sub-total-left">
                                            Địa chỉ:
                                        </div>
                                        <div className="sub-total-right">
                                            {this.state.userInfo.Address}
                                        </div>
                                    </div>
                                    <div className="sub-total">
                                        <div className="sub-total-left">
                                            Số điện thoại:
                                        </div>
                                        <div className="sub-total-right">
                                            {this.state.userInfo.Phone}
                                        </div>
                                    </div>
                                </div>

                                <div className="summary-total">
                                    <div className="summary-total-left">Total:</div>
                                    <div className="summary-total-right">
                                        <div>{this.state.detail.Total}đ</div>
                                        <div>(đã bao gồm VAT)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderDetail;