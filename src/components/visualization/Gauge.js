import React, {Component} from 'react'
import {loadLiquidFillGauge} from "./LiquidFillGauge";

export default class Gauge extends Component {
    constructor(props) {
        super(props);
        this.createGauge = this.createGauge.bind(this)
    }

    componentDidMount() {
        this.createGauge()
    }

    componentDidUpdate() {
        this.createGauge()
    }

    createGauge() {
        loadLiquidFillGauge(this.props.name, this.props.value);
    }

    render() {
        return <svg id={this.props.name}
                    ref={node => this.node = node}
                    width={50} height={50}/>
    }
}