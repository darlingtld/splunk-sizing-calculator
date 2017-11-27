import React, {Component} from 'react';
import {Segment, Dropdown, Item, Popup, Icon, Transition, Label} from 'semantic-ui-react';
import PlusMinusInput from "./shared/PlusMinusInput";
import {isPositiveNumber, getRandomTransitionAnimation} from "./shared/Utils";
import {assign} from 'lodash';
import searchHead from '../assets/search_head_color.png';
import indexer from '../assets/indexer_color.png';
import marginOfError from '../assets/margin_of_error.png';

export default class ConfigServerPanel extends Component {
    constructor(args) {
        super(args);
        this.hardwareOptions = [
            {
                text: 'Single instance deployments',
                value: 'single',
                icon: 'block layout',
            },
            {
                text: 'Distributed deployments - Base',
                value: 'distribution_base',
                icon: 'sitemap',
            },
            {
                text: 'Distributed deployments - Mid range',
                value: 'distribution_mid',
                icon: 'sitemap',
            },
            {
                text: 'Distributed deployments - High performance',
                value: 'distribution_high',
                icon: 'sitemap',
            },
            {
                text: 'Cloud deployments - Small scale',
                value: 'cloud_small',
                icon: 'cloud',
            },
            {
                text: 'Cloud deployments - Medium scale',
                value: 'cloud_med',
                icon: 'cloud',
            },
            {
                text: 'Cloud deployments - Large scale',
                value: 'cloud_large',
                icon: 'cloud',
            }
        ];
        this.hardwareCoresMap = {
            single: {
                searchHeadCores: 12,
                indexerCores: 12
            },
            distribution_base: {
                searchHeadCores: 16,
                indexerCores: 12
            },
            distribution_mid: {
                searchHeadCores: 12,
                indexerCores: 24
            },
            distribution_high: {
                searchHeadCores: 16,
                indexerCores: 48
            },
            cloud_small: {
                searchHeadCores: 8,
                indexerCores: 8
            },
            cloud_med: {
                searchHeadCores: 18,
                indexerCores: 18
            },
            cloud_large: {
                searchHeadCores: 18,
                indexerCores: 18
            }
        };

        this.state = {
            hardware: this.props.data.hardware ? this.props.data.hardware : this.hardwareOptions[0].value,
            searchHeadCores: this.props.data.searchHeadCores ? this.props.data.searchHeadCores : 12,
            indexerCores: this.props.data.indexerCores ? this.props.data.indexerCores : 12,
            marginOfError: this.props.data.marginOfError ? this.props.data.marginOfError : 20
        };
        assign(this.props.data, this.state);
    }

    componentDidUpdate() {
        assign(this.props.data, this.state);
        console.log(this.props.data);
    }

    onChangeSplunkHardware = (event, data) => {
        this.setState({
            hardware: data.value,
            searchHeadCores: this.hardwareCoresMap[data.value].searchHeadCores,
            indexerCores: this.hardwareCoresMap[data.value].indexerCores
        });
    };

    onChangeSearchHeadCores = (value) => {
        if (value === 'plus') {
            this.setState({searchHeadCores: this.state.searchHeadCores + 1});
        } else {
            if (isPositiveNumber(this.state.searchHeadCores - 1)) {
                this.setState({searchHeadCores: this.state.searchHeadCores - 1});
            }
        }
    };

    onChangeIndexerCores = (value) => {
        if (value === 'plus') {
            this.setState({indexerCores: this.state.indexerCores + 1});
        } else {
            if (isPositiveNumber(this.state.indexerCores - 1)) {
                this.setState({indexerCores: this.state.indexerCores - 1});
            }
        }

    };

    onChangeMarginOfError = (value) => {
        if (value === 'plus') {
            this.setState({marginOfError: this.state.marginOfError + 1})
        } else {
            if (isPositiveNumber(this.state.marginOfError - 1)) {
                this.setState({marginOfError: this.state.marginOfError - 1})
            }
        }
    };

    onChangeSearchHeadCoresInput = (event, data) => {
        if (isPositiveNumber(data.value)) {
            this.setState({searchHeadCores: parseInt(data.value)})
        }
    };

    onChangeIndexerCoresInput = (event, data) => {
        if (isPositiveNumber(data.value)) {
            this.setState({indexerCores: parseInt(data.value)})
        }
    };

    onChangeMarginOfErrorInput = (event, data) => {
        if (isPositiveNumber(data.value)) {
            this.setState({marginOfError: parseInt(data.value)})
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
                                    Splunk Hardware Specification
                                    <Popup
                                        trigger={<Icon name='question circle' size='small'/>}
                                        content='The reference hardware specification is a baseline for scoping and scaling the Splunk platform for your use.'
                                        size='small'
                                        position='bottom center'
                                        inverted
                                    />
                                </Item.Header>
                                <Item.Description>
                                    <Dropdown placeholder='Select Splunk hardware deployments' fluid selection
                                              options={this.hardwareOptions}
                                              value={this.state.hardware}
                                              onChange={this.onChangeSplunkHardware}/>
                                </Item.Description>

                                <Item.Content
                                    as='a' style={{float: 'right'}}
                                    target='_blank'
                                    href='http://docs.splunk.com/Documentation/Splunk/latest/Capacity/Referencehardware'>
                                    Hardware reference document
                                    <Icon name='external'/>
                                </Item.Content>
                            </Item.Content>
                        </Item>
                        <Item.Group divided>
                            <Item>
                                <Item.Image src={searchHead} size='tiny'/>
                                <Item.Content>
                                    <Item.Header>
                                        Search Head
                                        <Popup
                                            trigger={<Icon name='question circle' size='small'/>}
                                            content='Please use number of physical cores if you do not want your load average to exceed the number of physical CPUs. You may need to change max searches per cpu in limits.conf in order to get the max concurrent search limit to line up with what the indexers can support.'
                                            size='small'
                                            position='bottom center'
                                            inverted
                                        /></Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>Maximum processor cores</span>
                                    </Item.Meta>
                                    <Item.Description>
                                        <PlusMinusInput icon='microchip'
                                                        value={this.state.searchHeadCores}
                                                        onChange={this.onChangeSearchHeadCores}
                                                        onChangeInput={this.onChangeSearchHeadCoresInput}
                                                        style={{float: 'left'}}
                                        />
                                        {this.renderRangeString(this.state.searchHeadCores)}
                                    </Item.Description>
                                </Item.Content>
                            </Item>

                            <Item>
                                <Item.Image src={indexer} size='tiny'/>

                                <Item.Content>
                                    <Item.Header>Indexer
                                        <Popup
                                            trigger={<Icon name='question circle' size='small'/>}
                                            content='Please use number of physical cores if you do not want your load average to exceed the number of physical CPUs.'
                                            size='small'
                                            position='bottom center'
                                            inverted
                                        /></Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>Maximum processor cores</span>
                                    </Item.Meta>
                                    <Item.Description>
                                        <PlusMinusInput icon='microchip'
                                                        value={this.state.indexerCores}
                                                        onChange={this.onChangeIndexerCores}
                                                        onChangeInput={this.onChangeIndexerCoresInput}
                                        />
                                        {this.renderRangeString(this.state.indexerCores)}
                                    </Item.Description>
                                </Item.Content>
                            </Item>

                            <Item>
                                <Item.Image src={marginOfError} size='tiny'/>
                                <Item.Content>
                                    <Item.Header>
                                        Margin of Error %
                                        <Popup
                                            trigger={<Icon name='question circle' size='small'/>}
                                            content='Margin of Error is a fudge factor. Increase it if you want to increase headroom or if you have apps besides ES. If the other app is about as heavyweight as ES, increase margin of error to 50%.'
                                            size='small'
                                            position='bottom center'
                                            inverted
                                        /></Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>additional headroom</span>
                                    </Item.Meta>
                                    <Item.Description>
                                        <PlusMinusInput icon='percent'
                                                        value={this.state.marginOfError}
                                                        onChange={this.onChangeMarginOfError}
                                                        onChangeInput={this.onChangeMarginOfErrorInput}/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Item.Group>
                </Segment>
            </Transition>
        )
    }

    renderRangeString(cores) {
        const upper = Math.floor((100 + this.state.marginOfError) * cores/100);
        const lower = Math.ceil((100 - this.state.marginOfError) * cores/100);
        return (
            <Label color='olive' image style={{float: 'right'}}>
                Range
                <Label.Detail>
                    {lower} ~ {upper}
                </Label.Detail>
            </Label>
        )
    }
}