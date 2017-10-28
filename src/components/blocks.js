import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

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

        this.randData();

        setInterval(() => {
            this.randData();
        }, 10000);
    }

    randData() {
        let data = [];

        this.setState({ data });

        let date = new Date();

        for (let i=0; i<15; i++) {
            data.push({
                id: i+ date.getTime(),
                height: i + date.getTime(),
                merkle: Math.random(),
                time: date,
                transactions: Math.ceil(Math.random() * 100),
                size: 245
            });
        }

        setTimeout(() => this.setState({ data }), 2000);
    }

    componentWillUnmount() {
        this.refs.container.classList.remove('container-mounted-position');
    }

    render() {
        let body = this.state.data.map((row, i) => {
            let time = `${ 1990 + row.time.getYear()}-${row.time.getMonth()+1}-${row.time.getDate()} ${row.time.getHours()}:${row.time.getMinutes()}:${row.time.getSeconds()}`;
            return (<Link key={ row.id } to="/"><QueueAnim type="bottom" component="ul" className="horizontal-list">
                <li key={row.id + 'height'} className="block-height-tb-text">{ row.height }</li>
                <li key={row.id + 'merkle'}  className="block-height-tb-merkle">{ row.merkle }</li>
                <li key={row.id + 'time'}  className="block-height-tb-time">{ time }</li>
                <li key={row.id + 'transactions'}  className="block-height-tb-transactions">{ row.transactions }</li>
                <li key={row.id + 'size'}  className="block-height-tb-size">{ row.size }</li>
            </QueueAnim></Link>);
        });

        return (<div className="container" ref="container">
            <div style={{
                minHeight: '720px',
                width: '90%',
                minWidth: '980px',
                display:'block',
                textAlign: 'left',
                borderRadius: '4px',
                padding: '24px',
                color: '#FFF',
                overflowX: 'hidden'}}>

                <div className="block-text" style={{ fontSize: '24px' }}>区块</div>
                <div className="block-table">
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
                        <QueueAnim type="top">
                            <QueueAnim
                                key="abc"
                                type={['right', 'left']}
                                ease={['easeOutQuart', 'easeInOutQuart']}>
                                { body }
                            </QueueAnim>
                        </QueueAnim>
                    </div>
                </div>
                <div className="block-pagination">
                    <QueueAnim type="bottom">
                        <ReactPaginate key="pagination" previousLabel={"上一页"}
                                       nextLabel={"下一页"}
                                       breakClassName={"break-me"}
                                       initialPage={1}
                                       pageCount={ 20 }
                                       marginPagesDisplayed={1}
                                       pageRangeDisplayed={5}
                                       onPageChange={ ()=>{} }
                                       containerClassName={"pagination"}
                                       subContainerClassName={"pages pagination"}
                                       activeClassName={"pagination-active"} />
                    </QueueAnim>
                </div>
            </div>
        </div>);
    }
}


export default Blocks;
