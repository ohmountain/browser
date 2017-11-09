import React, { Component } from 'react';
import CountUp from 'react-countup';
import QueueAnim from 'rc-queue-anim';
import echarts from 'echarts';
import Flip from './utils/flip/index.js';

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nodes: [1,2,3,4]
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
                                // shadowBlur:3,
                                // shadowOffsetX: 2,
                                // shadowOffsetY: 2,
                                // shadowColor: '#999',
                                // padding: [0, 7],
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 16,
                                        align: 'center'
                                    },
                                    // abg: {
                                    //     backgroundColor: '#333',
                                    //     width: '100%',
                                    //     align: 'right',
                                    //     height: 22,
                                    //     borderRadius: [4, 4, 0, 0]
                                    // },
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

    }

    render() {

        let x0 = 180;
        let y0 = 130;

        let nodePointers = this.state.nodes.map((n, i)=> {
            let x = (x0 + i*20) + 'px';
            let y = (y0 + (i % 2) * 50) + 'px';
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
                    <div key="1" className="info-number"><Flip number={ 10291 } sep=',' /></div>
                </QueueAnim>
                <QueueAnim type="left" className="info-wrapper">
                    <div className="info-title">节点数量</div>
                    <div key="2" className="info-number">4</div>
                </QueueAnim>
                <QueueAnim type="alpha" duration="2000" className="info-wrapper">
                    <div className="info-title">交易数量</div>
                    <div key="3" className="info-number">124</div>
                </QueueAnim>
            </div>
            <QueueAnim type='alpha' delay={1200} className="nodes-info">
                <ul key="1" className="horizontal-list nodes-info-head">
                    <li>节点名称</li>
                    <li>出块状态</li>
                    <li>网络状态</li>
                    <li>启动时间</li>
                    <li>操作</li>
                </ul>
                <ul key="2" className="horizontal-list nodes-info-body">
                    <li>Node_1</li>
                    <li>正常出块</li>
                    <li>链接正常</li>
                    <li>201711111901</li>
                    <li>详细</li>
                </ul>
                <ul key="3" className="horizontal-list nodes-info-body">
                    <li>Node_2</li>
                    <li>正常出块</li>
                    <li>链接正常</li>
                    <li>201711101901</li>
                    <li>详细</li>
                </ul>
                <ul key="4" className="horizontal-list nodes-info-body">
                    <li>Node_3</li>
                    <li>正常出块</li>
                    <li>链接正常</li>
                    <li>201711121901</li>
                    <li>详细</li>
                </ul>
                <ul key="5" className="horizontal-list nodes-info-body">
                    <li>Node_4</li>
                    <li>正常出块</li>
                    <li>链接正常</li>
                    <li>201711121901</li>
                    <li>详细</li>
                </ul>
            </QueueAnim>

            <div className="nodes-type" style={{ displa:'flex', flexDirection:"column", zIndex: '99' }}>
                <div key="1" style={{ display: 'inline-block', width: '50%', verticalAlign: 'top'}}>
                    <div ref="nodeType" style={{ height: '240px'}}></div>
                </div>
                <div key="2" style={{ display: 'inline-block', width: '50%', height: '100%'}}>
                    <div ref="nodeHealth" style={{ height: '240px' }}></div>
                </div>
            </div>
        </div>);
    }
}

export default Index;
