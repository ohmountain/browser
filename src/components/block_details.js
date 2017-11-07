import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';

class BlockDetails extends Component {

  componentDidMount() {

    const blockId = this.props.match.params.id;

    let timmer = setTimeout(() => {
      this.refs.container.classList.add('container-mounted-position');
      window.clearTimeout(timmer);
    }, 10);

  }

  render() {
    return (<div ref="container" className="container">
      <QueueAnim delay={450} type="right" className="block-details-wrapper">
        <div key="1" className="block-details">
          <div className="block-details-inner-wrapper">
            <div className="bd-heading"><span className="fa fa-soccer-ball-o fa-spin" style={{ color: '#09F' }} /> 区块明细</div>
            <div className="bd-body">
              <div className="bd-item">
                <div className="bd-item-key">区块高度:</div>
                <div className="bd-item-value">191112</div>
              </div>
              <div className="bd-item">
                <div className="bd-item-key">出快时间:</div>
                <div className="bd-item-value">191112</div>
              </div>
              <div className="bd-item">
                <div className="bd-item-key">交易数量:</div>
                <div className="bd-item-value">19</div>
              </div>
              <div className="bd-item">
                <div className="bd-item-key">区块hash:</div>
                <div className="bd-item-value">45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe</div>
              </div>
              <div className="bd-item">
                <div className="bd-item-key">区块MerKle根:</div>
                <div className="bd-item-value">45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe</div>
              </div>
            </div>
          </div>
        </div>
        <div key="2" className="block-transaction-list">
          <div className="block-transaction-list-inner-wrapper">
            <div className="bt-heading"><span className="fa fa-institution" style={{ color: 'red' }} /> 区块交易列表</div>
            <div className="bt-body">
              <ul className="horizontal-list bt-tb-head">
                <li>交易ID</li>
                <li>时间</li>
                <li>高度</li>
                <li>类型</li>
              </ul>

              <ul className="horizontal-list bt-item">
                <li title="45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe">45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe</li>
                <li>201712222324</li>
                <li>95426548425458</li>
                <li>转帐交易</li>
              </ul>

              <ul className="horizontal-list bt-item">
                <li title="45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe">45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe</li>
                <li>201712222324</li>
                <li>95426548425458</li>
                <li>发行交易</li>
              </ul>
              <ul className="horizontal-list bt-item">
                <li title="45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe">45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe</li>
                <li>201712222324</li>
                <li>95426548425458</li>
                <li>转帐交易</li>
              </ul>
              <ul className="horizontal-list bt-item">
                <li title="45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe">45dsadsa7das1d2wq4a1d2WaazXxaaw$saasaadsd4sa56socizm,zpbjioe</li>
                <li>201712222324</li>
                <li>95426548425458</li>
                <li>转帐交易</li>
              </ul>

              <div className="bt-tb-pagination">
                <i className="fa fa-backward" aria-hidden="true" />
                <i className="fa fa-forward" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <div key="3" className="transaction-detail">交易详情</div>
      </QueueAnim>
    </div>);
  }
}

export default BlockDetails;
