import React, { Component } from 'react';

class Blocks extends Component {

    componentDidMount() {
        setTimeout(() => {
           this.refs.container.classList.add('container-mounted-position');
        }, 10);
    }

    componentWillUnmount() {
        this.refs.container.classList.remove('container-mounted-position');
    }
    render() {
        return (<div className="container" ref="container">
                <h2>This is block-page</h2>
                </div>);
    }
}


export default Blocks;
