import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

class Blocks extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: [],
            timmer: null,
            timmer1: null
        }
    };

    componentDidMount() {
        setTimeout(() => {
           this.refs.container.classList.add('container-mounted-position');
        }, 10);

        this.randData();

        let timmer = setInterval(() => {
            this.randData();
        }, 10000);

        this.setState({ timmer });
    }

    handleCloseBlockDetails() {
        this.refs.block_detail.style.width="0px";
        this.refs.block_detail.style.opacity=0;
        this.refs.block_detail.style.transform = "translateX(480px)";
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

        let timmer1 = setTimeout(() => this.setState({ data }), 2000);
        this.setState({ timmer1 });
    }

    handleBlockItemClick() {
        this.refs.block_detail.style.transform = "translateX(0px)";
        this.refs.block_detail.style.opacity=1;
        this.refs.block_detail.style.width="460px";
    }

    componentWillUnmount() {
        clearInterval(this.state.timmer);
        clearTimeout(this.state.timmer1);
        this.refs.container.classList.remove('container-mounted-position');
    }

    render() {
        let body = this.state.data.map((row, i) => {
            let time = `${ 1990 + row.time.getYear()}-${row.time.getMonth()+1}-${row.time.getDate()} ${row.time.getHours()}:${row.time.getMinutes()}:${row.time.getSeconds()}`;
            return (<a onClick={ this.handleBlockItemClick.bind(this) } key={ row.id }><QueueAnim type="bottom" component="ul" className="horizontal-list">
                <li key={row.id + 'height'} className="block-height-tb-text">{ row.height }</li>
                <li key={row.id + 'merkle'}  className="block-height-tb-merkle">{ row.merkle }</li>
                <li key={row.id + 'time'}  className="block-height-tb-time">{ time }</li>
                <li key={row.id + 'transactions'}  className="block-height-tb-transactions">{ row.transactions }</li>
                <li key={row.id + 'size'}  className="block-height-tb-size">{ row.size }</li>
            </QueueAnim></a>);
        });

        return (<div className="container" ref="container">
            <div style={{
                minHeight: '720px',
                width: '90%',
                minWidth: '980px',
                display:'flex',
                flexDirection: 'column',
                textAlign: 'left',
                borderRadius: '4px',
                padding: '24px',
                color: '#FFF',
                overflowX: 'hidden'}}>

                <div className="block-text" style={{ fontSize: '24px' }}>区块</div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <div className="block-table" style={{flex:1}}>
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
                    <div style={{
                        width: '0px',
                        opacity: 0,
                        marginLeft: '16px',
                        marginTop: '16px',
                        height: '380px',
                        overflow: 'hidden',
                        transitionProperty: 'width,opacity, transform',
                        transitionDuration: '1s',
                    }} ref="block_detail">
                        <div className="block-detail-head">区块详情 <span onClick={ this.handleCloseBlockDetails.bind(this) } className="fa fa-close" style={{float:"right"}}></span></div>
                        <div className="block-detail-body">
                            <div className="block-detail-item">
                                <div className="key"><div style={{ padding: "0 14px" }}>高度</div></div>
                                <div className="value"><div style={{ padding: "0 14px" }}>192831231</div></div>
                            </div>
                            <div className="block-detail-item">
                                <div className="key"><div style={{ padding: "0 14px" }}>出块时间</div></div>
                                <div className="value"><div style={{ padding: "0 14px" }}>2017-11-21 19:00:00</div></div>
                            </div>
                            <div className="block-detail-item">
                                <div className="key"><div style={{ padding: "0 14px" }}>区块Hash</div></div>
                                <div className="value"><div style={{ padding: "0 14px" }}>b0498b62e12644d2d9a73d1aa44b8b25675d393b1d76d309dfae09069edb75ad</div></div>
                            </div>
                            <div className="block-detail-item">
                                <div className="key"><div style={{ padding: "0 14px" }}>交易数</div></div>
                                <div className="value"><div style={{ padding: "0 14px" }}>1231</div></div>
                            </div>
                            <div className="block-detail-item">
                                <div className="key"><div style={{ padding: "0 14px" }}>块大小</div></div>
                                <div className="value"><div style={{ padding: "0 14px" }}>245</div></div>
                            </div>
                            <div className="block-detail-item">
                                <div className="key"><div style={{ padding: "0 14px" }}>区块Merkle</div></div>
                                <div className="value"><div style={{ padding: "0 14px" }}>b0498b62e12644d2d9a73d1aa44b8b25675d393b1d76d309dfae09069edb75ad</div></div>
                            </div>
                       </div>
                    </div>
                </div>

                <div className="block-pagination">
                    <QueueAnim type="bottom">
                        <ReactPaginate key="pagination" previousLabel={"<"}
                                       nextLabel={">"}
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
