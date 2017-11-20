import React, {Component} from 'react';
import {Segment, Table, Item, Popup, Icon, Radio, Statistic, Transition} from 'semantic-ui-react';
import {isPositiveZeroNumber, getRandomTransitionAnimation} from "./shared/Utils";
import PlusMinusInput from "./shared/PlusMinusInput";
import {findIndex, sumBy, assign} from 'lodash';

export default class ConfigDataDistributionPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            checked: false,
            networkTraffic: this.props.data.networkTraffic ?
                this.props.data.networkTraffic :
                [
                    {
                        text: 'juniper*',
                        value: 'juniper*',
                        data: 0
                    },
                    {
                        text: 'cisco*',
                        value: 'cisco*',
                        data: 0
                    },
                    {
                        text: 'mcafee*',
                        value: 'mcafee*',
                        data: 0
                    },
                    {
                        text: 'symantec*',
                        value: 'symantec*',
                        data: 0
                    },
                    {
                        text: 'websense*',
                        value: 'websense*',
                        data: 0
                    },
                    {
                        text: 'bluecoat*',
                        value: 'bluecoat*',
                        data: 0
                    },
                    {
                        text: '*network',
                        value: '*network',
                        data: 0
                    },
                    {
                        text: 'syslog',
                        value: 'syslog',
                        data: 0
                    },
                    {
                        text: 'stash',
                        value: 'stash',
                        data: 0
                    }
                ],
            authentication: this.props.data.authentication ?
                this.props.data.authentication :
                [
                    {
                        text: '*security',
                        value: '*security',
                        data: 0
                    },
                    {
                        text: 'cisco*',
                        value: 'cisco*',
                        data: 0
                    },
                    {
                        text: 'ps',
                        value: 'ps',
                        data: 0
                    },
                    {
                        text: 'stash',
                        value: 'stash',
                        data: 0
                    },
                    {
                        text: 'juniper:sslvpn',
                        value: 'juniper:sslvpn',
                        data: 0
                    },
                    {
                        text: 'ossec',
                        value: 'ossec',
                        data: 0
                    }
                ],
            web: this.props.data.web ? this.props.data.web :
                [
                    {
                        text: 'bluecoat*',
                        value: 'bluecoat*',
                        data: 0
                    },
                    {
                        text: 'websense*',
                        value: 'websense*',
                        data: 0
                    }
                ],
            networkTrafficTotal: this.props.data.networkTrafficTotal ? this.props.data.networkTrafficTotal : 0,
            authenticationTotal: this.props.data.authenticationTotal ? this.props.data.authenticationTotal : 0,
            webTotal: this.props.data.webTotal ? this.props.data.webTotal : 0
        };
        assign(this.props.data, this.state);
    }

    componentDidUpdate() {
        assign(this.props.data, this.state);
        console.log(this.props.data);
    }

    toggle = () => {
        // 'checked' is about to set to true.  At this line of code, it is false
        if (!this.state.checked) {
            this.updateTotalVolume();
        }
        this.setState({checked: !this.state.checked})
    };

    onChangeData = (value, dataModel, item) => {
        if (value === 'plus') {
            item.data = item.data + 1;
            let index;
            switch (dataModel) {
                case 'networkTraffic':
                    const networkTraffic = this.state.networkTraffic;
                    index = findIndex(networkTraffic, {text: item.text});
                    networkTraffic.splice(index, 1, item);
                    this.setState({
                        networkTraffic: networkTraffic
                    });
                    break;
                case 'authentication':
                    const authentication = this.state.authentication;
                    index = findIndex(authentication, {text: item.text});
                    authentication.splice(index, 1, item);
                    this.setState({
                        authentication: authentication
                    });
                    break;
                case 'web':
                    const web = this.state.web;
                    index = findIndex(web, {text: item.text});
                    web.splice(index, 1, item);
                    this.setState({
                        web: web
                    });
                    break;
            }
        } else {
            if (isPositiveZeroNumber(item.data - 1)) {
                item.data = item.data - 1;
                let index;
                switch (dataModel) {
                    case 'networkTraffic':
                        const networkTraffic = this.state.networkTraffic;
                        index = findIndex(networkTraffic, {text: item.text});
                        networkTraffic.splice(index, 1, item);
                        this.setState({
                            networkTraffic: networkTraffic
                        });
                        break;
                    case 'authentication':
                        const authentication = this.state.authentication;
                        index = findIndex(authentication, {text: item.text});
                        authentication.splice(index, 1, item);
                        this.setState({
                            authentication: authentication
                        });
                        break;
                    case 'web':
                        const web = this.state.web;
                        index = findIndex(web, {text: item.text});
                        web.splice(index, 1, item);
                        this.setState({
                            web: web
                        });
                        break;
                }
            }
        }
        this.updateTotalVolume();
    };

    onChangeDataTotal = (value, dataModel) => {
        if (value === 'plus') {
            switch (dataModel) {
                case 'networkTraffic':
                    this.setState({
                        networkTrafficTotal: this.state.networkTrafficTotal + 1
                    });
                    break;
                case 'authentication':
                    this.setState({
                        authenticationTotal: this.state.authenticationTotal + 1
                    });
                    break;
                case 'web':
                    this.setState({
                        webTotal: this.state.webTotal + 1
                    });
                    break;
            }
        } else {
            switch (dataModel) {
                case 'networkTraffic':
                    if (isPositiveZeroNumber(this.state.networkTrafficTotal - 1)) {
                        this.setState({
                            networkTrafficTotal: parseInt(this.state.networkTrafficTotal - 1)
                        });
                    }
                    break;
                case 'authentication':
                    if (isPositiveZeroNumber(this.state.authenticationTotal - 1)) {
                        this.setState({
                            authenticationTotal: parseInt(this.state.authenticationTotal - 1)
                        });
                    }
                    break;
                case 'web':
                    if (isPositiveZeroNumber(this.state.webTotal - 1)) {
                        this.setState({
                            webTotal: parseInt(this.state.webTotal - 1)
                        });
                    }
                    break;
            }
        }
    };

    onChangeDataTotalInput = (dataModel, data) => {
        if (!isPositiveZeroNumber(data.value)) {
            return;
        }
        switch (dataModel) {
            case 'networkTraffic':
                this.setState({
                    networkTrafficTotal: parseInt(data.value)
                });
                break;
            case 'authentication':
                this.setState({
                    authenticationTotal: parseInt(data.value)
                });
                break;
            case 'web':
                this.setState({
                    webTotal: parseInt(data.value)
                });
                break;
        }
    };

    onChangeDataInput = (dataModel, item, data) => {
        if (!isPositiveZeroNumber(data.value)) {
            return;
        }
        let index;
        item.data = parseInt(data.value);
        switch (dataModel) {
            case 'networkTraffic':
                const networkTraffic = this.state.networkTraffic;
                index = findIndex(networkTraffic, {text: item.text});
                networkTraffic.splice(index, 1, item);
                this.setState({
                    networkTraffic: networkTraffic
                });
                break;
            case 'authentication':
                const authentication = this.state.authentication;
                index = findIndex(authentication, {text: item.text});
                authentication.splice(index, 1, item);
                this.setState({
                    authentication: authentication
                });
                break;
            case 'web':
                const web = this.state.web;
                index = findIndex(web, {text: item.text});
                web.splice(index, 1, item);
                this.setState({
                    web: web
                });
                break;
        }
        this.updateTotalVolume();
    };

    updateTotalVolume = () => {
        this.setState({
            networkTrafficTotal: sumBy(this.state.networkTraffic, 'data'),
            authenticationTotal: sumBy(this.state.authentication, 'data'),
            webTotal: sumBy(this.state.web, 'data')
        })

    };

    render() {
        return (
            <Transition animation={getRandomTransitionAnimation()} duration={800} transitionOnMount={true}>
                <Segment>
                    <Item.Group relaxed={true}>
                        <Item>
                            <Item.Content>
                                <Item.Header>
                                    Data Distribution Across {this.props.name} Data Model
                                    <Popup
                                        trigger={<Icon name='question circle' size='small'/>}
                                        content='The reference hardware specification is a baseline for scoping and scaling the Splunk platform for your use.'
                                        size='small'
                                        position='bottom center'
                                        inverted
                                    />
                                </Item.Header>

                            </Item.Content>
                        </Item>
                        <Item>
                            <Item.Content style={{textAlign: 'right'}}>
                                <Radio slider label='Sourcetype settings'
                                       onChange={this.toggle}
                                       checked={this.state.checked}/>
                            </Item.Content>
                        </Item>
                        <Item>
                            <Table basic='very' selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Sourcetype</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center'>Data ingestion per day</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.state.checked ?
                                        this.state[this.props.dataModel].map(item =>
                                            <Table.Row key={item.value}>
                                                <Table.Cell>{item.text}</Table.Cell>
                                                <Table.Cell textAlign='right'>
                                                    <PlusMinusInput label='GB'
                                                                    value={item.data}
                                                                    onChange={(value) => this.onChangeData(value, this.props.dataModel, item)}
                                                                    onChangeInput={(event, data) => this.onChangeDataInput(this.props.dataModel, item, data)}
                                                    />
                                                </Table.Cell>
                                            </Table.Row>
                                        ) :
                                        <Table.Row key='total'>
                                            <Table.Cell>Total</Table.Cell>
                                            <Table.Cell textAlign='right'>
                                                <PlusMinusInput label='GB'
                                                                value={this.state[this.props.dataModel + 'Total']}
                                                                onChange={(value) => this.onChangeDataTotal(value, this.props.dataModel)}
                                                                onChangeInput={(event, data) => this.onChangeDataTotalInput(this.props.dataModel, data)}
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    }
                                </Table.Body>
                                {this.state.checked ?
                                    <Table.Footer>
                                        <Table.Row>
                                            <Table.HeaderCell>Total</Table.HeaderCell>
                                            <Table.HeaderCell textAlign='right'>
                                                <Statistic.Group horizontal size='tiny'
                                                                 style={{float: 'right', marginRight: '48px'}}>
                                                    <Statistic>
                                                        <Statistic.Value>{this.state[this.props.dataModel + 'Total']}</Statistic.Value>
                                                        <Statistic.Label>GB</Statistic.Label>
                                                    </Statistic>
                                                </Statistic.Group>
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer> : null
                                }
                            </Table>
                        </Item>
                    </Item.Group>
                </Segment>
            </Transition>
        )
    }
}