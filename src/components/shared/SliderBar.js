import React, {Component} from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './SliderBar.scss';

export default class SliderBar extends Component {
    constructor(args) {
        super(args);
        this.state = {
            value: this.props.data[this.props.domain] ? this.props.data[this.props.domain].value : 3,
            sliderValue: this.props.data[this.props.domain] ? this.props.data[this.props.domain].sliderValue : 30,
            min: this.props.data[this.props.domain] ? this.props.data[this.props.domain].min : 30,
            max: this.props.data[this.props.domain] ? this.props.data[this.props.domain].max : 200,
            sliderColor: ['low', 'medium', 'normal', 'high']
        }
    }

    componentDidUpdate() {
        this.props.data[this.props.domain] = this.state;
    }

    handleChange = (value) => {
        this.setState({
            sliderValue: value,
            value: Math.floor(value / 10)
        });
        this.props.onChange(Math.floor(value / 10));
    };

    render() {
        const {sliderValue, min, max, sliderColor} = this.state;
        const colorIndex = Math.floor(((sliderValue - min) / (max - min)) * (sliderColor.length - 1));
        return (
            <div className='slider orientation-reversed slider-bar' style={{width: '100%'}}>
                <div className={`slider-horizontal ${this.state.sliderColor[colorIndex]}`}>
                    <Slider
                        min={this.state.min}
                        max={this.state.max}
                        value={sliderValue}
                        tooltip={false}
                        orientation='horizontal'
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }

}