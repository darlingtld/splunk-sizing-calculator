import React, {Component} from 'react';
import {Segment, Table, Item, Popup, Icon, Radio, Input} from 'semantic-ui-react';
import PlusMinusInput from "./shared/PlusMinusInput";

export default class ConfigDataDistributionPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            checked: false,
            networkTraffic: [
                {
                    text: 'juniper*',
                    value: 'juniper*',
                },
                {
                    text: 'cisco*',
                    value: 'cisco*',
                },
                {
                    text: 'mcafee*',
                    value: 'mcafee*',
                },
                {
                    text: 'symantec*',
                    value: 'symantec*',
                },
                {
                    text: 'websense*',
                    value: 'websense*',
                },
                {
                    text: 'bluecoat*',
                    value: 'bluecoat*',
                },
                {
                    text: '*network',
                    value: '*network',
                },
                {
                    text: 'syslog',
                    value: 'syslog',
                },
                {
                    text: 'stash',
                    value: 'stash',
                }
            ],
            authentication: [
                {
                    text: '*security',
                    value: '*security',
                },
                {
                    text: 'cisco*',
                    value: 'cisco*',
                },
                {
                    text: 'ps',
                    value: 'ps',
                },
                {
                    text: 'stash',
                    value: 'stash',
                },
                {
                    text: 'juniper:sslvpn',
                    value: 'juniper:sslvpn',
                },
                {
                    text: 'ossec',
                    value: 'ossec',
                }
            ],
            web: [
                {
                    text: 'bluecoat*',
                    value: 'bluecoat*',
                },
                {
                    text: 'websense*',
                    value: 'websense*',
                }
            ]
        }
    }

    toggle = () => this.setState({checked: !this.state.checked})

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
                                            <Table.Cell textAlign='right'><PlusMinusInput label='GB'/></Table.Cell>
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