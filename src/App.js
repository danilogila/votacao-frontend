import React, { Component } from 'react';
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Routes from './routes'
// import Modal from './components/Modal/AnimatedModal'
import { loadReCaptcha } from 'react-recaptcha-google'

export default class App extends Component{
  componentDidMount() {
    loadReCaptcha();
  }
  render(){
    return (
      <div className="App">
        <Header />
        <Routes />
        <Footer />
      </div>
    );
}
}

