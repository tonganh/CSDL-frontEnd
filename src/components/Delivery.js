import React, { Component } from 'react';
import '../Css/delivery.css';
import Navbar from './/NavBar';
import Footer from './Footer';

class Delivery extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="delivery">
                    <div className="delivery-top">
                    <a href="/">City fun</a>
                    <i className="fas fa-chevron-right" />
                    <a href="/menu">Menu</a>
                    <i className="fas fa-chevron-right" />
                    <a href="#">Chicken</a>
                    <i className="fas fa-chevron-right" />
                    <a href="/product">Japanese Chicken</a>
                    </div>
                    <div className="delivery-bottom">
                    <div className="delivery-bottom-left">
                        <div className="delivery-header">
                            Delivery information
                        </div>
                        <div className="delivery-delivery">
                        <div className="delivery-delivery-left">
                            <div className="input-name input-area">
                            <label htmlFor>Name</label>
                            <input type="text" placeholder="Full Name" />
                            </div>
                            <div className="input-phone input-area">
                            <label htmlFor>Phone</label>
                            <input type="number" name id placeholder="Your phone number please" />
                            </div>
                        </div>
                        <div className="delivery-delivery-right">
                            <div className="input-address-1 input-area">
                            <label htmlFor>Adress</label>
                            <input type="text" placeholder="Your address please" />
                            </div>
                            <div className="input-address-2 input-area">
                            <label htmlFor>Tinh/Thanh pho</label>
                            <input type="text" placeholder="Your address please" />
                            </div>
                            <div className="input-address-3 input-area">
                            <label htmlFor>Quan/Huyen</label>
                            <input type="text" placeholder="Your address please" />
                            </div>
                            <div className="input-address-4 input-area">
                            <label htmlFor>Phuong/Xa</label>
                            <input type="text" placeholder="Your address please" />
                            </div>
                            <div className="address-types">
                            <p>Address type</p>
                            <div className="address-select">
                                <button className="address-office btn btn-primary">
                                <i className="fas fa-briefcase " />
                                <span>Office</span>
                                </button>
                                <button className="address-home btn btn-success">
                                <i className="fas fa-home" />
                                <span>Home</span>
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="delivery-footer">
                        <div className="delivery-footer-left input-area">
                            <label htmlFor>Note</label>
                            <input type="text" placeholder="Want to say something to shipper?" />
                        </div>
                        <div className="delivery-footer-right">
                            <button className="btn btn-danger">SAVE</button>
                        </div>
                        </div>
                    </div>
                    <div className="delivery-bottom-right">
                        <div className="product-location">
                        <div className="location-header">Address</div>
                        <div className="location-info">
                            <i className="fas fa-map-marker" />
                            <div className="location-info-detail">
                            So 1 Dai Co Viet
                            </div>
                        </div>
                        </div>
                        <div className="cart-summary">
                        <div className="summary-header">
                            Cart info
                        </div>
                        <div className="summary-content">
                            <div className="sub-total">
                            <div className="sub-total-left">
                                Tam tinh (3 product)
                            </div>
                            <div className="sub-total-right">
                                100.00 đ
                            </div>
                            </div>
                            <div className="ship-fee">
                            <div className="ship-fee-left">Shipping fee</div>
                            <div className="ship-fee-right">50.000 đ</div>
                            </div>
                        </div>
                        <div className="summary-voucher">
                            <input type="text" className="voucher-use" placeholder="voucher" />
                            <button className="voucher-apply btn btn-primary">Apply</button>
                        </div>
                        <div className="summary-total">
                            <div className="summary-total-left">Total</div>
                            <div className="summary-total-right">
                            <div>200.000 đ</div>
                            <div>VAT included</div>
                            </div>
                        </div>
                        <div className="summary-confirm">
                            <a href="./delivery" target="__blank">
                            <button className="btn btn-danger btn-block">
                                Confirm
                            </button></a>   
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Delivery;