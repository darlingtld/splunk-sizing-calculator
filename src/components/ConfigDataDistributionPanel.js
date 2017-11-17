import React, {Component} from 'react';
import {Segment, Table, Item, Popup, Icon, Radio, Input} from 'semantic-ui-react';
import {isPositiveZeroNumber} from "./shared/Utils";
import PlusMinusInput from "./shared/PlusMinusInput";
import {merge, findIndex} from 'lodash';

export default class ConfigDataDistributionPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            checked: false,
            networkTraffic: [
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
            authentication: [
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
            web: [
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
            networkTrafficTotal: 0,
            authenticationTotal: 0,
            webTotal: 0
        }
    }

    toggle = () => this.setState({checked: !this.state.checked});

    onChangeData = (value, dataModel, item) => {
        console.log(value, dataModel, item);
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
    };

    render() {
        return (
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
                                        <Table.Cell textAlign='right'><PlusMinusInput label='GB'/></Table.Cell>
                                    </Table.Row>
                                }
                            </Table.Body>
                            {this.state.checked ?
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell>Total</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='right'>
                                            <Input label={{basic: true, content: 'GB'}} labelPosition='right'/>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer> : null
                            }
                        </Table>
                    </Item>
                </Item.Group>
            </Segment>
        )
    }
}