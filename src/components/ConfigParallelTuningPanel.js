import React, {Component} from 'react';
import {Segment, Statistic, Item, Transition, Radio, Divider, Button, Modal} from 'semantic-ui-react';
import SliderBar from "./shared/SliderBar";
import {getRandomTransitionAnimation} from "./shared/Utils";
import {assign} from 'lodash';
import ConfigParallelTuningConfPanel from "./ConfigParallelTuningConfPanel";

export default class ConfigParallelTuningPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            parallelEnableChecked: this.props.data.parallelEnableChecked ? this.props.data.parallelEnableChecked : false,
            autoTuningChecked: this.props.data.autoTuningChecked ? this.props.data.autoTuningChecked : false,
            networkTrafficConcurrency: this.props.data.networkTrafficConcurrency ? this.props.data.networkTrafficConcurrency : 3,
            authenticationConcurrency: this.props.data.authenticationConcurrency ? this.props.data.authenticationConcurrency : 3,
            webConcurrency: this.props.data.webConcurrency ? this.props.data.webConcurrency : 3
        };
        assign(this.props.data, this.state);

    }

    componentDidUpdate() {
        assign(this.props.data, this.state);
        console.log(this.props.data);
    }

    toggleEnable = () => this.setState({parallelEnableChecked: !this.state.parallelEnableChecked});

    toggleAutoTuning = () => this.setState({autoTuningChecked: !this.state.autoTuningChecked});

    onChangeNetworkTrafficConcurrency = (value) => this.setState({networkTrafficConcurrency: this.adjustValue(value)});

    onChangeAuthenticationConcurrency = (value) => this.setState({authenticationConcurrency: this.adjustValue(value)});

    onChangeWebConcurrency = (value) => this.setState({webConcurrency: this.adjustValue(value)});

    adjustValue = (value) => {
        if (value >= 20) {
            return 20;
        } else if (value >= 10) {
            return 10;
        } else if (value >= 5) {
            return 5;
        } else if (value >= 3) {
            return 3;
        } else {
            return 3;
        }

    };

    render() {
        return (
            <Transition animation={getRandomTransitionAnimation()} duration={800} transitionOnMount={true}>
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
                                       checked={this.state.parallelEnableChecked}/>
                                <Radio slider label='Auto Tuning'
                                       style={{float: 'right'}}
                                       onChange={this.toggleAutoTuning}
                                       checked={this.state.autoTuningChecked}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>

                    {this.state.parallelEnableChecked && !this.state.autoTuningChecked ?
                        <Item.Group relaxed={true}>
                            <Divider horizontal section={true}>Parallel Settings</Divider>
                            <Item>
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header>
                                        Network Traffic
                                    </Item.Header>
                                    <Item.Content style={{float: 'right'}}>
                                        <Statistic horizontal size='mini'>
                                            <Statistic.Label style={{marginRight: '5px'}}>Concurrency</Statistic.Label>
                                            <Statistic.Value>{this.state.networkTrafficConcurrency}</Statistic.Value>
                                        </Statistic>
                                    </Item.Content>
                                    <Item.Meta>
                                        Select max Network Traffic concurrency.
                                    </Item.Meta>
                                    <Item.Description>
                                        <SliderBar onChange={this.onChangeNetworkTrafficConcurrency}
                                                   data={this.props.data} domain='networkTrafficSlider'/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                            <Item>
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header>Authentication</Item.Header>
                                    <Item.Content style={{float: 'right'}}>
                                        <Statistic horizontal size='mini'>
                                            <Statistic.Label style={{marginRight: '5px'}}>Concurrency</Statistic.Label>
                                            <Statistic.Value>{this.state.authenticationConcurrency}</Statistic.Value>
                                        </Statistic>
                                    </Item.Content>
                                    <Item.Meta>
                                        Select max Authentication concurrency.
                                    </Item.Meta>
                                    <Item.Description>
                                        <SliderBar onChange={this.onChangeAuthenticationConcurrency}
                                                   data={this.props.data} domain='authenticationSlider'/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                            <Item>
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header>Web</Item.Header>
                                    <Item.Content style={{float: 'right'}}>
                                        <Statistic horizontal size='mini'>
                                            <Statistic.Label style={{marginRight: '5px'}}>Concurrency</Statistic.Label>
                                            <Statistic.Value>{this.state.webConcurrency}</Statistic.Value>
                                        </Statistic>
                                    </Item.Content>
                                    <Item.Meta>
                                        Select max Web concurrency.
                                    </Item.Meta>
                                    <Item.Description>
                                        <SliderBar onChange={this.onChangeWebConcurrency} data={this.props.data}
                                                   domain='webSlider'/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                            <Item>
                                <Item.Content>
                                    <Modal trigger={<Button floated='right' color='green'>View .conf files</Button>}>
                                        <Modal.Header>Splunk .conf files</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <ConfigParallelTuningConfPanel data={this.props.data}/>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                </Item.Content>
                            </Item>
                        </Item.Group> : null}
                    {this.state.autoTuningChecked ?
                        <Item.Group relaxed={true}>
                            <Item>
                                <Item.Content>
                                    <Modal trigger={<Button floated='right' color='green'>View .conf files</Button>}>
                                        <Modal.Header>Splunk .conf files</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <ConfigParallelTuningConfPanel data={this.props.data}/>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                </Item.Content>
                            </Item>
                        </Item.Group>: null}
                </Segment>
            </Transition>
        )
    }
}