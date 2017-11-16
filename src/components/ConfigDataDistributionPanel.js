import React, {Component} from 'react';
import {Segment, Table, Item, Popup, Icon, Label, Button} from 'semantic-ui-react';
import PlusMinusInput from "./shared/PlusMinusInput";
import searchHead from '../assets/search_head_color.png';
import indexer from '../assets/indexer_color.png';
import marginOfError from '../assets/margin_of_error.png';

export default class ConfigDataDistributionPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
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

    render() {
        console.log(this.state[this.props.dataModel]);
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
                        <Table basic='very' selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Sourcetype</Table.HeaderCell>
                                    <Table.HeaderCell>Data ingestion per day</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.state[this.props.dataModel].map(item =>
                                    <Table.Row>
                                        <Table.Cell>{item.text}</Table.Cell>
                                        <Table.Cell><PlusMinusInput label='GB'/></Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </Item>
                </Item.Group>
            </Segment>
        )
    }
}