import React, { Component } from 'react';
import '../Css/home.css';
import logo from '../Images/logo.png';

class Footer extends Component {
    render() {
        return (
            // footer
            <div className="footer">
                <div className="top-footer">
                    <div className="top-footer-left">
                        <div className="top-footer-left-logo">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="top-footer-left-description">
                            <h3>
                                Etiam consequat sem ullamcorper, euismod metus sit amet, tristique justo. Vestibulum mattis, nisi ut faucibus commodo, risus ex commodo.
                            </h3>
                        </div>
                        <div className="top-footer-left-icon">
                            <a href="https://www.facebook.com/tatuan19" target="__blank"><i className="fab fa-facebook"></i></a>
                            <i className="fab fa-youtube"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fas fa-envelope-square"></i>
                        </div>
                    </div>
                    <div className="top-footer-right">
                            <div className="top-footer-right-header">
                                <h2>Contact Info</h2>
                            </div>
                            <div className="top-footer-right-content">
                                <div className="info location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div>
                                        <h3>Our location</h3>
                                        <p>
                                            150 teuk laak 2 near Khan Tuol Kouk, Phnom Penh
                                        </p>
                                    </div>
                                </div>
                                <div className="info phone">
                                    <i className="fas fa-phone"></i>
                                    <div>
                                        <h3>Phones</h3>
                                        <p>+855-086-8634-836</p>
                                    </div>
                                    
                                </div>
                                <div className="info mail">
                                    <i className="fas fa-envelope-open-text"></i>
                                    <div>
                                        <h3>Email</h3>  
                                        <p>blahblah@example.com</p>
                                    </div>
                                    
                                </div>
                            </div>
                    </div>
                </div>
                <div className="bottom-footer"></div>
            </div>
        );
    }
}

export default Footer;