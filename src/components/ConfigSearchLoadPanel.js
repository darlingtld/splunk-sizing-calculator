import React, {Component} from 'react';
import {Segment, Dropdown, Item, Popup, Icon, Label, Button} from 'semantic-ui-react';
import PlusMinusInput from "./shared/PlusMinusInput";
import correlationSearches from '../assets/correlation_searches_color.png';
import concurrentUsers from '../assets/concurrent_users.svg';

export default class ConfigSearchLoadPanel extends Component {
    constructor(args) {
        super(args);
    }

    render() {
        return (
            <Segment>
                <Item.Group relaxed={true}>
                    <Item>
                        <Item.Content>
                            <Item.Header>
                                Search Load
                                <Popup
                                    trigger={<Icon name='question circle' size='small'/>}
                                    content='How a customer is using ES.'
                                    size='small'
                                    position='bottom center'
                                    inverted
                                />
                            </Item.Header>
                        </Item.Content>
                    </Item>
                    <Item.Group divided>
                        <Item>
                            <Item.Image src={correlationSearches} size='tiny'/>
                            <Item.Content>
                                <Item.Header>
                                    Enabled Correlation Searches
                                </Item.Header>
                                <Item.Description><PlusMinusInput icon='map signs'/></Item.Description>
                            </Item.Content>
                        </Item>

                        <Item>
                            <Item.Image src={concurrentUsers} size='tiny'/>

                            <Item.Content>
                                <Item.Header>
                                    Concurrent Users
                                </Item.Header>
                                <Item.Description><PlusMinusInput icon='users'/></Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Item.Group>
            </Segment>
        )
    }
}