import React, {Component} from 'react'
import {createLine} from "./LinePath";

export default class Line extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initialize()
    }

    componentDidUpdate() {
        this.initialize()
    }

    initialize() {
        createLine(this.props.name, this.props.width, this.props.height, this.props.isReverse, this.props.color, this.props.duration)
    }

    render() {
        return (
            <div>
                <svg id={this.props.name}
                     ref={node => this.node = node} height={this.props.height}/>
            </div>
        )
    }
}