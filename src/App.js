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
import BlockDetails from './components/block_details.js';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <div className="nav">
                    <Link className="logo" to="/" style={{ textDecoration: 'none' }}>区块链浏览器</Link>
                    <ul className="menu">
                        <li><Link to="/">首页</Link></li>
                        <li><Link to="/blocks">区块</Link></li>
                    </ul>
                </div>

                <div className="content">
                    <Route path="/" exact component={ Index } />
                    <Route path="/blocks" component={ Blocks } />
                    <Route path="/block_details/:id" component={ BlockDetails } />
                </div>

                <div className="footer">&copy;贵州远东诚信管理有限公司</div>
            </div>
        </Router>
    );
  }
}

export default App;
