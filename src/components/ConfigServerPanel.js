import React, {Component} from 'react';
import {Segment, Dropdown, Item, Popup, Icon, Label, Button} from 'semantic-ui-react';
import PlusMinusInput from "./shared/PlusMinusInput";
import searchHead from '../assets/search_head.png';
import indexer from '../assets/indexer.png';

export default class ConfigServerPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            options: [
                {
                    text: 'Single instance deployments',
                    value: 'Single instance deployments',
                    icon: 'block layout',
                },
                {
                    text: 'Distributed deployments - Base',
                    value: 'Distributed deployments - Base',
                    icon: 'sitemap',
                },
                {
                    text: 'Distributed deployments - Mid range',
                    value: 'Distributed deployments - Mid range',
                    icon: 'sitemap',
                },
                {
                    text: 'Distributed deployments - High performance',
                    value: 'Distributed deployments - High performance',
                    icon: 'sitemap',
                },
                {
                    text: 'Cloud deployments - Small scale',
                    value: 'Cloud deployments - Small scale',
                    icon: 'cloud',
                },
                {
                    text: 'Cloud deployments - Medium scale',
                    value: 'Cloud deployments - Medium scale',
                    icon: 'cloud',
                },
                {
                    text: 'Cloud deployments - Large scale',
                    value: 'Cloud deployments - Large scale',
                    icon: 'cloud',
                }
            ]
        }
    }

    render() {
        return (
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header>
                                Splunk hardware specification
                                <Popup
                                    trigger={<Icon name='question circle' size='small'/>}
                                    content='The reference hardware specification is a baseline for scoping and scaling the Splunk platform for your use.'
                                    size='small'
                                    position='bottom center'
                                    inverted
                                />
                            </Item.Header>
                            <Item.Description>
                                <Dropdown placeholder='Select Splunk hardware deployments' fluid selection options={this.state.options}/>
                            </Item.Description>

                            <Item.Content
                                as='a' style={{float:'right'}}
                                target='_blank'
                                href='http://docs.splunk.com/Documentation/Splunk/latest/Capacity/Referencehardware'>
                                Hardware reference document
                                <Icon name='external'/>
                            </Item.Content>
                        </Item.Content>
                    </Item>
                    <Item.Group divided>
                        <Item>
                            <Item.Image src={searchHead} size='tiny' />
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
                                <Item.Description><PlusMinusInput icon='microchip'/></Item.Description>
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
                                <Item.Description><PlusMinusInput icon='microchip'/></Item.Description>
                            </Item.Content>
                        </Item>

                        <Item>
                            <Item.Image src={searchHead} size='tiny'/>
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
                                <Item.Description><PlusMinusInput icon='percent'/></Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Item.Group>
            </Segment>
        )
    }
}