import React, {Component} from 'react';
import {Segment, Table, Item, Popup, Icon, Radio, Input} from 'semantic-ui-react';
import PlusMinusInput from "./shared/PlusMinusInput";
import SliderBar from "./shared/SliderBar";

export default class ConfigParallelTuningPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            enableChecked: false,
            autoTuningChecked: false,
        }
    }

    toggleEnable = () => this.setState({enableChecked: !this.state.enableChecked});

    toggleAutoTuning = () => this.setState({autoTuningChecked: !this.state.autoTuningChecked});

    render() {
        return (
            <Segment>
                <Item.Group relaxed={true}>
                    <Item>
                        <Item.Content>
                            <Item.Header>
                                Parallel Configuration Tuning
                            </Item.Header>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Radio slider label='Enable'
                                   onChange={this.toggleEnable}
                                   checked={this.state.enableChecked}/>
                            <Radio slider label='Auto Tuning'
                                   style={{float: 'right'}}
                                   onChange={this.toggleAutoTuning}
                                   checked={this.state.autoTuningChecked}/>
                        </Item.Content>
                    </Item>
                    <Item>
                        <SliderBar/>
                    </Item>
                </Item.Group>
            </Segment>
        )
    }
}