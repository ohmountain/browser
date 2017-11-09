import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Number extends Component {

    render() {

        var _style = Object.assign({
            overflow: 'hidden'
        }, {
            height: `${this.props.height}px`,
            width: `${this.props.width}px`,
            lineHeight: `${this.props.height}px`,
            display: 'inline-block',
            verticalAlign: 'top'
        });

        let numberStyle = Object.assign({
            transform: `translateY(${-this.props.number * this.props.height}px)`,
            transitionDuration: this.props.duration + 'ms',
            transitionDelay: this.props.delay + 'ms',
            transitionTimingFunction: this.props.timingFunction
        }, _style, this.props.style)

        let numbers = [];

        for (let i=0; i<10;i++) {
            numbers.push(<div key={i} style={ numberStyle }>{i}</div>);
        }

        return (<div style={ _style } >{ numbers }</div>);
    }
}

Number.defaultProps = {
    number: 0,
    height: 32,
    width: 32,
    duration: 250,
    delay: 0,
    style: {},
    timingFunction: 'linear'
};

Number.propTypes = {
    number: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,0]),
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    duration: PropTypes.number,
    delay: PropTypes.number,
    style: PropTypes.object,
    timingFunction: PropTypes.oneOf(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'])
}

let tm1 = null;

class Flip extends Component {
    constructor(props) {
        super(props);

        let { number } = this.props;
        let len    = number.toString().length;
        let starter = '';

        for (let i=0; i<len; i++) {
            starter += '0';
        }

        this.state = {
            starter,
            number,
            to: starter
        }
    }

    componentWillReceiveProps(props) {
            this.setState({
                to: props.number.toString()
            });
    }

   componentDidMount() {
        setTimeout(() => {
            this.setState({
                to: this.state.number.toString()
            });
        }, 1000);
    }

    render() {
        let numbers = this.state.to.split('');
        let len     = numbers.length;
        let child   = numbers.map((n, i) => {
            return (<Number key={i} number={ parseInt(n)} height={36} width={24} duration={ (len - i) * 450}/>);
        });

        return <div>{ child }</div>
    }
}

export default Flip
