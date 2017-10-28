import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import './App.css';
import Index from './components/index.js';
import Blocks from './components/blocks.js';
import Transactions from './components/transactions.js';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <div className="nav">
                    <div className="logo">区块链浏览器</div>
                    <ul className="menu">
                        <li><Link to="/">首页</Link></li>
                        <li><Link to="/blocks">区块</Link></li>
                        <li><Link to="/transactions">交易</Link></li>
                    </ul>
                </div>

                <div className="content">
                    <Route path="/" exact component={ Index } />
                    <Route path="/blocks" component={ Blocks } />
                    <Route path="/transactions" component={ Transactions } /> 
                </div>
            </div>
        </Router>
    );
  }
}

export default App;
