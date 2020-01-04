import React, { Component } from 'react';
import '../Css/order-list.css';
import Navbar from './NavBar';

class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderDetails: [],
            total: 0
        }
    }

    async UNSAFE_componentWillMount() {
        const username = localStorage.getItem('username');
        try {
            const data = await fetch(`http://localhost:5000/order/list/${username}`,
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
                orderDetails: data.data.recordset,
                total: data.data.total
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {

        const OrderList = this.state.orderDetails.map(item => (
            <div key={item.OrderID} class="orderlist-item" >
                <a class="order-id" href={`/order-detail/${item.OrderID}`}>{item.OrderID}</a>
                <div class="order-date">{item.CreateDate}</div>
                <div class="order-name">{item.Username}</div>
                <div class="order-total">{item.Total}</div>
                <div class="order-status">{item.Status}</div>
            </div>
        ));

        return (
            <div>
                <Navbar products={this.props.state.products} handleSearch={this.props.handleSearch} Total={this.props.state.Total} count={this.props.state.count} />
                <div class="orderlist">
                    <div class="orderlist-top">
                        <a href="/home">Trang chủ</a>
                        <i class="fas fa-chevron-right"></i>
                        <a href="/order-list">Đơn hàng</a>
                    </div>
                    <div class="orderlist-bottom">
                        <div class="order-list-header">
                            Đơn hàng đã đặt
                        </div>
                        <div class="order-list-orderlist">
                            <div class="orderlist-header">
                                <div class="order-id">Mã đơn hàng</div>
                                <div class="order-date">Ngày đặt hàng</div>
                                <div class="order-name">Tên khách hàng</div>
                                <div class="order-total">Tổng giá trị</div>
                                <div class="order-status">Trạng thái</div>
                            </div>
                            <div>{OrderList}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Order;