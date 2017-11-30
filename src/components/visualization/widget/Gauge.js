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
        loadLiquidFillGauge(this.props.id, this.props.value);
    }

    render() {
        return (
            <div>
                <svg id={this.props.id}
                     ref={node => this.node = node}
                     width={50} height={50}/>
            </div>
        )
    }
}