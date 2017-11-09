import React, { Component } from 'react';
import CountUp from 'react-countup';
import QueueAnim from 'rc-queue-anim';
import RcScrollAnim from 'rc-scroll-anim';
import echarts from 'echarts';
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
        setTimeout(() => {
            this.refs.container.classList.add('container-mounted-position');

            // 基于准备好的dom，初始化echarts实例
            var typeChart = echarts.init(this.refs.nodeType);
            var healthChart = echarts.init(this.refs.nodeHealth);

            let option1 = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['服务节点','验证节点'],
                    textStyle:{
                        color:'#909090',
                        fontSize:12
                    }
                },
                color: ['#09f', '#039'],
                series : [
                    {
                        name:'节点数量',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '18',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:3, name:'服务节点'},
                            {value:1, name:'验证节点'},
                        ]
                    }
                ]
            };

            let option2 = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['正常节点','故障节点'],
                    textStyle:{    //图例文字的样式
                        color:'#909090',
                        fontSize:12
                    }
                },
                color: ['#09f', '#f22'],
                series : [
                    {
                        name:'节点状态',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 16,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 24
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:3, name:'正常节点'},
                            {value:1, name:'故障节点'},
                        ]
                    }
                ]
            };

            setTimeout(() => {
                typeChart.setOption(option1);
                healthChart.setOption(option2);
            }, 10);

        }, 150);


        this.tm = setInterval(() => {

            let { blockHeight, transactions } = this.state;

            blockHeight = parseInt(blockHeight);
            transactions = parseInt(transactions);

            blockHeight += 2;
            transactions += Math.ceil(Math.random() * 10);

            window.localStorage.setItem('blockHeight', blockHeight);
            window.localStorage.setItem('transactions', transactions);

            this.setState({
                blockHeight,
                transactions
            });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.tm);
    }

    render() {

        let x0 = 272;
        let y0 = 194;

        let points = [{
            x: 500,
            y: 350
        },{
            x: 500,
            y: 410
        },{
            x: 810,
            y: 300
        },{
            x: 566,
            y: 310
        }];

        let nodePointers = this.state.nodes.map((n, i)=> {
            let x = points[i].x + 'px';
            let y = points[i].y + 'px';
            let delay = 1000 * i;
            return (<div className="node-pointer" key={x} style={{ left: x, top: y, transitionDelay: delay + 'ms' }} ref={`node${i}`}>
                <div style={{ width: '48px',textAlign: 'center',marginLeft: '-20px', marginTop: '14px', color: '#fff'}}>{`节点${i+1}`}</div>
            </div>);
        });

        return (<div  className="container" ref="container" style={{ flexDirection: 'column-inverse' }} style={{"margin":"auto", textAlign:"center"}}>
            <QueueAnim  type='top' delay={200} className="nodes-map">{ nodePointers }</QueueAnim>

                <div className="general-info-wrapper">
                    <QueueAnim type={["right"]} duration={1250} className="info-wrapper">
                        <div className="info-title">当前区块高度</div>
                        <div key="1" className="info-number"><Flip number={ this.state.blockHeight } sep=',' /></div>
                    </QueueAnim>
                    <QueueAnim type="left" className="info-wrapper">
                        <div className="info-title">节点数量</div>
                        <div key="2" className="info-number">4</div>
                    </QueueAnim>
                    <QueueAnim type="alpha" duration="2000" className="info-wrapper">
                        <div className="info-title">交易数量</div>
                        <div key="3" className="info-number"><Flip number={ this.state.transactions } sep=',' /></div>
                    </QueueAnim>
                </div>

                <RcScrollAnim.Parallax animation={{ opacity: 1, scale:1, playScale: [0, 1] }}
                                  style={{ transform: 'scale(0.9)', opacity: 0.9 }}>
                    <div className="nodes-type" style={{ displa:'flex', flexDirection:"column", zIndex: '99' }}>
                        <div key="1" style={{ display: 'inline-block', width: '50%', verticalAlign: 'top'}}>
                            <div ref="nodeType" style={{ height: '240px'}}></div>
                        </div>
                        <div key="2" style={{ display: 'inline-block', width: '50%', height: '100%'}}>
                            <div ref="nodeHealth" style={{ height: '240px' }}></div>
                        </div>
                    </div>
                </RcScrollAnim.Parallax >

                <div className="index-blocks">
                    <div className="index-block-title"></div>
                </div>

                <div className="index-page-blocks">
                    <div className="index-page-blocks-head">
                        <div className="title">区块信息</div>
                        <div className="more"><span className='fa fa-next' /></div>
                    </div>
                </div>
        </div>);
    }
}

export default Index;
