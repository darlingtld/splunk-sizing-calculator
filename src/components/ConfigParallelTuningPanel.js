import React, {Component} from 'react';
import {Segment, Statistic, Item, Transition, Radio, Divider} from 'semantic-ui-react';
import SliderBar from "./shared/SliderBar";
import {getRandomTransitionAnimation} from "./shared/Utils";
import {assign} from 'lodash';

export default class ConfigParallelTuningPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            enableChecked: false,
            autoTuningChecked: false,
            networkTrafficConcurrency: 3,
            authenticationConcurrency: 3,
            webConcurrency: 3
        }
        assign(this.props.data, this.state);

    }

    componentDidUpdate(){
        assign(this.props.data, this.state);
        console.log(this.props.data);
    }

    toggleEnable = () => this.setState({enableChecked: !this.state.enableChecked});

    toggleAutoTuning = () => this.setState({autoTuningChecked: !this.state.autoTuningChecked});

    onChangeNetworkTrafficConcurrency = (value) => this.setState({networkTrafficConcurrency: value});

    onChangeAuthenticationConcurrency = (value) => this.setState({authenticationConcurrency: value});

    onChangeWebConcurrency = (value) => this.setState({webConcurrency: value});

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
                                       checked={this.state.enableChecked}/>
                                <Radio slider label='Auto Tuning'
                                       style={{float: 'right'}}
                                       onChange={this.toggleAutoTuning}
                                       checked={this.state.autoTuningChecked}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                    {this.state.enableChecked && !this.state.autoTuningChecked ?
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
                                        <SliderBar onChange={this.onChangeNetworkTrafficConcurrency}/>
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
                                        <SliderBar onChange={this.onChangeAuthenticationConcurrency}/>
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
                                        <SliderBar onChange={this.onChangeWebConcurrency}/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group> : null}
                </Segment>
            </Transition>
        )
    }
}