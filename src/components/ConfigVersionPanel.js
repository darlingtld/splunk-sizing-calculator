import React, {Component} from 'react';
import {Segment, Dropdown, Item, Popup, Icon, Label, Button} from 'semantic-ui-react';
import PlusMinusInput from "./shared/PlusMinusInput";
import searchHead from '../assets/search_head.png';
import indexer from '../assets/indexer.png';

export default class ConfigVersionPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            splunkVersions: [
                {
                    text: '7.0 (Minty)',
                    value: '7.0',
                },
                {
                    text: '6.6 (Kimono)',
                    value: '6.6',
                },
                {
                    text: '6.5.1612 (Jackhammer)',
                    value: '6.5.1612',
                },
                {
                    text: '6.5 (Ivory)',
                    value: '6.5',
                },
                {
                    text: '6.4 (Galaxy)',
                    value: '6.4',
                },
                {
                    text: '6.3 (Ember)',
                    value: '6.3',
                },
                {
                    text: '6.2 (Dash)',
                    value: '6.2',
                }
            ],
            esVersions: [
                {
                    text: '4.7.2 (Exige)',
                    value: '4.7.2',
                },
                {
                    text: '4.4.0 (Caterham)',
                    value: '4.4.0',
                },
                {
                    text: '4.2.0 (Balboni)',
                    value: '4.2.0',
                },
                {
                    text: '4.1.0 (Apollo)',
                    value: '4.1.0',
                }
            ]
        }
    }

    render() {
        return (
            <Segment>
                <Item.Group relaxed={true}>
                    <Item>
                        <Item.Content>
                            <Item.Header>
                                Splunk Enterprise Version
                                <Popup
                                    trigger={<Icon name='question circle' size='small'/>}
                                    content='Select the Splunk Enterprise version on which you plan to deploy Splunk Enterprise Security.'
                                    size='small'
                                    position='bottom center'
                                    inverted
                                />
                            </Item.Header>
                            <Item.Meta>
                                <span className='cinema'>Assuming the use of the latest maintenance versions.</span>
                            </Item.Meta>
                            <Item.Description>
                                <Dropdown placeholder='Select Splunk enterprise version' fluid selection options={this.state.splunkVersions}/>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header>
                                Enterprise Security Version
                                <Popup
                                    trigger={<Icon name='question circle' size='small'/>}
                                    content='Select the Enterprise Security version which you plan to deploy. '
                                    size='small'
                                    position='bottom center'
                                    inverted
                                />
                            </Item.Header>
                            <Item.Meta>
                                <span className='cinema'>Assuming the use of the latest maintenance versions.</span>
                            </Item.Meta>
                            <Item.Description>
                                <Dropdown placeholder='Select Enterprise security version' fluid selection options={this.state.esVersions}/>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        )
    }
}