import React, { Component } from 'react';
import CountUp from 'react-countup';
import QueueAnim from 'rc-queue-anim';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
          blockHeight: 199009112,
          originHeight: 0,
          timmer: null
        };
    }

    componentDidMount() {
        let timmer = setInterval(() => {
            this.setState({
                originHeight: this.state.blockHeight ? this.state.blockHeight - 100: 0,
                blockHeight: this.state.blockHeight + 1
            });
        }, 5000);

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
        return (<div className="container" ref="container" style={{ flexDirection: 'column' }}>
            <div style={{ width: '100%',display:'flex'}}>
                <div className="block-height-wrapper">
                    <div>
                        <span className="fa fa-fire fa-4x" style={{color: 'red', marginRight: '12px'}}></span>
                        <span className="block-height-text">
                            <CountUp
                                start={this.state.originHeight}
                                end={this.state.blockHeight}
                                useEasing={false}
                                useGrouping={true}/>
                        </span>
                    </div>
                    <div className="block-height-title">块高</div>
                </div>

                <div className="transaction-wrapper">
                    <div>
                        <span className="fa fa-bolt fa-4x" style={{color: 'red', marginRight: '12px'}}></span>
                        <span className="transaction-number-text">
                            <CountUp
                                start={this.state.originHeight - 10002321}
                                end={this.state.blockHeight - 10002321}
                                useEasing={false}
                                useGrouping={true}/>
                        </span>
                    </div>
                    <div className="transaction-title">交易量</div>
                </div>
            </div>

            <div className="nodes-wrapper">
                    <QueueAnim className="nodes-list-table" type="bottom" animConfig={{ opacity:[0,1] }} delay={1000}>
                        <div className="nodes-list-head">
                            <ul className="horizontal-list">
                                <li className="node-identifier">标识</li>
                                <li className="node-type">类型</li>
                                <li className="node-ip">IP</li>
                                <li className="node-status">状态</li>
                            </ul>
                        </div>
                        <div className="nodes-list-body">
                            <ul className="horizontal-list" key={1}>
                                <li className="node-identifier">node_01</li>
                                <li className="node-type">类型1</li>
                                <li className="node-ip">192.168.1.2</li>
                                <li className="node-status">正常</li>
                            </ul>

                            <ul className="horizontal-list" key={2}>
                                <li className="node-identifier">node_02</li>
                                <li className="node-type">类型2</li>
                                <li className="node-ip">192.168.1.2</li>
                                <li className="node-status">正常</li>
                            </ul>

                            <ul className="horizontal-list" key={3}>
                                <li className="node-identifier">node_03</li>
                                <li className="node-type">类型1</li>
                                <li className="node-ip">192.168.1.3</li>
                                <li className="node-status">正常</li>
                            </ul>
                            <ul className="horizontal-list" key={4}>
                                <li className="node-identifier">node_04</li>
                                <li className="node-type">类型1</li>
                                <li className="node-ip">192.168.1.4</li>
                                <li className="node-status">正常</li>
                            </ul>
                            <ul className="horizontal-list" key={5}>
                                <li className="node-identifier">node_5</li>
                                <li className="node-type">类型2</li>
                                <li className="node-ip">192.168.1.5</li>
                                <li className="node-status">正常</li>
                            </ul>
                        </div>
                    </QueueAnim>
            </div>
        </div>);
    }
}

export default Index;
