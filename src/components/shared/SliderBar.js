import React, {Component} from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './SliderBar.scss';

export default class SliderBar extends Component {
    constructor(args) {
        super(args);
        this.state = {
            value: 3,
            min: 3,
            max: 20,
            sliderColor: ['low', 'medium', 'normal', 'high']
        }

    }

    handleChange = (value) => {
        this.setState({
            value: value,
        })
    }

    render() {
        const {value, min, max, sliderColor} = this.state;
        const colorIndex = Math.floor(((value - min) / (max - min)) * (sliderColor.length - 1));
        return (
            <div className='slider orientation-reversed slider-bar' style={{width: '100%'}}>
                <div className={`slider-horizontal ${this.state.sliderColor[colorIndex]}`}>
                    <Slider
                        min={3}
                        max={20}
                        value={value}
                        orientation='horizontal'
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }

}