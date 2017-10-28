import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';

class Blocks extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: [],
            timmer: null
        }
    };

    componentDidMount() {
        setTimeout(() => {
           this.refs.container.classList.add('container-mounted-position');
        }, 10);

        let data = [];

        for (let i=0; i<10; i++) {
            data.push({
                id: i+1,
                height: i+1,
                merkle: Math.random(),
                time: new Date(),
                transactions: Math.ceil(Math.random() * 100),
                size: 245
            });
        }

        setTimeout(() => {
            this.setState({ data });
        }, 100);

        let timmer = setInterval(() => {
            let data = this.state.data;
            let len  = data.length;

            data.push({
                id: len+1,
                height: len+1,
                merkle: Math.random(),
                time: new Date(),
                transactions: Math.ceil(Math.random() * 100),
                size: 245
            });

            this.setState({ data });
        }, 1000);

        this.setState({ timmer });
    }

    componentWillUnmount() {
        clearInterval(this.state.timmer);
        this.refs.container.classList.remove('container-mounted-position');
    }
    render() {

        let body = this.state.data.map((row, i) => {
            return (<Link key={ row.id } to="/"><ul className="horizontal-list">
                <li className="block-height-tb-text">{ row.height }</li>
                <li className="block-height-tb-merkle">{ row.merkle }</li>
                <li className="block-height-tb-time">{ row.time.getTime() + i }</li>
                <li className="block-height-tb-transactions">{ row.transactions }</li>
                <li className="block-height-tb-size">{ row.size }</li>
            </ul></Link>);
        });

        return (<div className="container" ref="container">
            <div style={{
                minHeight: '640px',
                width: '90%',
                minWidth: '980px',
                display:'block',
                textAlign: 'left',
                borderRadius: '4px',
                padding: '24px',
                color: '#FFF',
                overflowX: 'hidden'}}>

                <div className="block-text">区块</div>
                <div className="table">
                    <div className="block-tb-header" style={{ height: '48px' }}>
                        <ul className="horizontal-list">
                            <li className="block-height-tb-text">高度</li>
                            <li className="block-height-tb-merkle">merkle</li>
                            <li className="block-height-tb-time">时间</li>
                            <li className="block-height-tb-transactions">交易数</li>
                            <li className="block-height-tb-size">块大小</li>
                        </ul>
                    </div>
                    <div className="block-tb-body">
                        <QueueAnim>
                            { body }
                        </QueueAnim>
                    </div>
                </div>
            </div>
        </div>);
    }
}


export default Blocks;
