import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import HomeContent from '../components/HomeContent';
import Footer from '../components/Footer';

class Home extends Component {
    state={

    }
    render() {
        return (
            <div>
                <NavBar products={this.props.state.products} handleSearch={this.props.handleSearch} Total={this.props.state.Total} count={this.props.state.count}/>
                <HomeContent total={this.props.total} addtoCart={this.props.addtoCart}/>
                <Footer/>
            </div>
        );
    }
}

export default Home;