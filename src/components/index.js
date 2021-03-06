import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import QueueAnim from 'rc-queue-anim';
import RcScrollAnim from 'rc-scroll-anim';
import Flip from './utils/flip/index.js';

class Index extends Component {

    constructor(props) {
        super(props);

        let blockHeight  = window.localStorage.getItem('blockHeight');
        let transactions = window.localStorage.getItem('transactions');

        this.state = {
            nodes: [1,2,3,4],
            blockHeight: blockHeight ? blockHeight : 0,
            transactions: transactions ? transactions : 0
        };
    }

    componentDidMount() {
        this.tm = setInterval(() => {
            let request = new Request('http://localhost:8000/stats');
            fetch(request).then(response => {
                if (response.ok) {
                    return response.json();
                }

            }).then(json => {

                this.setState({
                    blockHeight: json.latestblocknumber,
                    transactions: json.transactionvolume
                }, () => {
                    window.localStorage.setItem('blockHeight', this.state.blockHeight);
                    window.localStorage.setItem('transactions', this.state.transactions);
                });

            }).catch(e => {
                console.error(e)
            });
        }, 5000);

        fetch('http://localhost:8000/block').then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(json => {
            console.log(json[0]);
        }).catch(e => {
        });
    }

    componentWillUnmount() {
        window.clearInterval(this.tm);
    }

    render() {

        let points = [{
            x: 500,
            y: 260
        },{
            x: 476,
            y: 326
        },{
            x: 820,
            y: 220
        },{
            x: 560,
            y: 238
        }];

        let nodePointers = this.state.nodes.map((n, i)=> {
            let x = points[i].x + 'px';
            let y = points[i].y + 'px';
            let delay = 1000 * i;
            return (<div className="node-pointer" key={i} style={{ left: x, top: y, transitionDelay: delay + 'ms' }} ref={`node${i}`}>
                <div style={{ width: '48px',textAlign: 'center',marginLeft: '-20px', marginTop: '14px', color: '#fff'}}>{`节点${i+1}`}</div>
            </div>);
        });

        let indexPageBlocks = [];
        let indexPageTransactions = [];
        for (let i=0; i<10; i++) {
            indexPageBlocks.push(<ul key={ i } className="index-page-block-tb-body horizontal-list">
                <li>{ this.state.blockHeight - i }</li>
                <li>{ (i + 1) * 15 }秒前</li>
                <li>4</li>
                <li>0</li>
                <li className="book-keeper">sbudisaguibjdksabuydibadsadnuiasgudadsnuaidbnksabdjau</li>
                <li>1</li>
                <li>254</li>
            </ul>);

            indexPageTransactions.push(<ul key={ i } className="index-page-block-tb-body horizontal-list">
                    <li>类型{ Math.ceil(Math.random()*10) }</li>
                    <li className="book-keeper">{ randomString(64) }</li>
                    <li>{ this.state.blockHeight - 1 }</li>
                    <li>{ Math.ceil(Math.random() * 10) } 秒钟前</li>
                    <li>0</li>
                    <li>254 bytes</li>
                    <li>无</li>
                </ul>);
        }

        return (<div  className="container" ref="container" style={{ flexDirection: 'column-inverse' }} style={{"margin":"auto", textAlign:"center"}}>
            <QueueAnim  type='top' delay={200} className="nodes-map">{ nodePointers }</QueueAnim>

            <QueueAnim type={["left", "alpha"]} className="index-page-additional-info">
                <div key="1" className="adt-info">
                        <Flip style={{ display: 'inline-block' }} width={14} height={24} number={ this.state.blockHeight } duration={450} styles={{ color: '#09f' }} />
                        <div className="unit">块</div>
                        <div className="adt-info-title">当前区块高度</div>
                </div>
                <div key="2" className="adt-info">
                    <Flip style={{ display: 'inline-block', color: 'red' }} width={14} height={24} duration={450} delay={1000} number={ this.state.transactions } />
                    <div className="unit">笔</div>
                    <div className="adt-info-title">交易数量</div>
                </div>
                <div key="8" className="adt-info">
                    <Flip style={{ display: 'inline-block', color: 'yellow' }} width={14} height={24} duration={450} delay={1500} number={ this.state.blockHeight } />
                    <div className="unit">个</div>
                    <div className="adt-info-title">有效地址</div>

                </div>
                <div key="3" className="adt-info">
                    <Flip style={{ display: 'inline-block', color: '#0f0' }} width={14} height={24} duration={450} delay={2000} number={ 15 } />
                    <div className="unit">秒</div>
                    <div className="adt-info-title">出块时间</div>
                </div>

                <div key="4" className="adt-info">
                        <Flip style={{ display: 'inline-block' }} width={14} height={24} number={ 2468 } delay={ 1000 }  duration={450} styles={{ color: '#49a' }} />
                        <div className="unit">天</div>
                        <div className="adt-info-title">系统运行时间</div>
                </div>

                <div key="5" className="adt-info">
                    <Flip style={{ display: 'inline-block', color: '#98f' }} width={14} height={24} duration={450} delay={1500} number={ 100000000 - 1 } />
                    <div className="unit">个</div>
                    <div className="adt-info-title">发行量</div>
                </div>

                <div key="6" className="adt-info">
                    <Flip style={{ display: 'inline-block', color: '#960' }} width={14} height={24} duration={450} delay={2000} number={ 5487 } />
                    <div className="unit">笔</div>
                    <div className="adt-info-title">资产发行量</div>
                </div>

                <div key="7" className="adt-info">
                    <Flip style={{ display: 'inline-block', color: '#0f8' }} width={14} height={24} duration={450} delay={2500} number={ 984562 } />
                    <div className="unit">个</div>
                    <div className="adt-info-title">持有人</div>
                </div>

            </QueueAnim>


            <div className="index-blocks">
                <div className="index-block-title"></div>
            </div>

            <RcScrollAnim.Parallax animation={{ opacity: 1, x: 0, playScale: [0, 0.8] }} style={{ transform: 'translateX(100px)', opacity: 0.0 }}>
                <div className="index-page-blocks">
                    <div className="index-page-blocks-head">
                        <div className="title">区块信息</div>
                        <div className="more">
                            <RcScrollAnim.Parallax animation={{ opacity: 1, x: 0, playScale: [0.8, 1] }} style={{ transform: 'translateX(-100px)', opacity: 0.0 }}>
                                <Link to="/blocks">
                                    更多区块 <span className='fa fa-angle-double-right' />
                                </Link>
                            </RcScrollAnim.Parallax>
                        </div>
                    </div>
                    <div className="index-page-blocks-body">
                        <ul className="index-page-block-tb-head horizontal-list">
                            <li>高度</li>
                            <li>出块时间</li>
                            <li>交易数</li>
                            <li>费用</li>
                            <li className="book-keeper">记账人</li>
                            <li>版本</li>
                            <li>区块大小</li>
                        </ul>


                        <div>{ indexPageBlocks  }</div>
                    </div>
                </div>
            </RcScrollAnim.Parallax>

            <RcScrollAnim.Parallax animation={{ opacity: 1, x: 0, playScale: [0, 0.4] }} style={{ transform: 'translateX(-100px)', opacity: 0.0 }}>
                <div className="index-page-blocks">
                    <div className="index-page-blocks-head">
                        <div className="title">交易信息</div>
                        <div className="more">
                            <RcScrollAnim.Parallax animation={{ opacity: 1, x: 0, playScale: [0, 0.5] }} style={{ transform: 'translateX(-100px)', opacity: 0.0 }}>
                                <Link to="/">
                                    更多交易 <span className='fa fa-angle-double-right' />
                                </Link>
                            </RcScrollAnim.Parallax>
                        </div>
                    </div>
                    <div className="index-page-blocks-body">
                        <ul className="index-page-block-tb-head horizontal-list">
                            <li>类型</li>
                            <li className="book-keeper">哈希</li>
                            <li>块高</li>
                            <li>时间</li>
                            <li>手续费</li>
                            <li>大小</li>
                            <li>交易特性</li>
                        </ul>
                        <div type="alpha">{ indexPageTransactions }</div>
                    </div>
                </div>
            </RcScrollAnim.Parallax>

        </div>);
    }
}

export default Index;

function randomString(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    　　return pwd;
}
