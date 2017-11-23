import React, {Component} from 'react';
import Gauge from "./visualization/Gauge";

export default class ConfigVizPanel extends Component {
    constructor(args) {
        super(args);
    }

    render() {
        return (
            <div>
                <Gauge name="cpu" value={50}/>
                <Gauge name="memory" value={56}/>
            </div>
        )
    }
}