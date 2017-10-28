import React, { Component } from 'react';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
          blockHeight: 1990,
          timmer: null
        };
    }

    componentDidMount() {
        let timmer = setInterval(() => {
            this.setState({
                blockHeight: this.state.blockHeight + 1
            });
        }, 1000);

        this.setState({ timmer });

        setTimeout(() => {
           this.refs.container.classList.add('container-mounted-position');
        }, 10);
    }

    componentWillUnmount() {
        clearInterval(this.state.timmer);
        this.refs.container.classList.remove('container-mounted-position');
    }

    render() {
        return (<div className="container" ref="container">
                    <div className="block-height-wrapper">
                        <div>
                            <span className="fa fa-fire fa-4x" style={{color: 'red', marginRight: '12px'}}></span>
                            <span className="block-height-text">{ this.state.blockHeight }</span>
                        </div>
                        <div className="block-height-title">块高</div>
                    </div>

                    <div className="transaction-wrapper">
                        <div>
                            <span className="fa fa-bolt fa-4x" style={{color: 'red', marginRight: '12px'}}></span>
                            <span className="transaction-number-text">199099</span>
                        </div>
                        <div className="transaction-title">交易量</div>
                    </div>
                </div>);
    }
}

export default Index;
