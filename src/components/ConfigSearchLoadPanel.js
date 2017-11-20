import React, {Component} from 'react';
import {Segment, Transition, Item, Popup, Icon, Label, Button} from 'semantic-ui-react';
import PlusMinusInput from "./shared/PlusMinusInput";
import {isPositiveNumber, getRandomTransitionAnimation} from "./shared/Utils";
import {assign} from 'lodash';
import correlationSearches from '../assets/correlation_searches_color.png';
import concurrentUsers from '../assets/concurrent_users.svg';

export default class ConfigSearchLoadPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            correlationSearches: 20,
            concurrentUsers: 6
        };
        assign(this.props.data, this.state);

    }

    componentDidUpdate(){
        assign(this.props.data, this.state);
        console.log(this.props.data);
    }

    onChangeCorrelationSearches = (value) => {
        if (value === 'plus') {
            this.setState({correlationSearches: this.state.correlationSearches + 1})
        } else {
            if (isPositiveNumber(this.state.correlationSearches - 1)) {
                this.setState({correlationSearches: this.state.correlationSearches - 1})
            }
        }
    };

    onChangeConcurrentUsers = (value) => {
        if (value === 'plus') {
            this.setState({concurrentUsers: this.state.concurrentUsers + 1})
        } else {
            if (isPositiveNumber(this.state.concurrentUsers - 1)) {
                this.setState({concurrentUsers: this.state.concurrentUsers - 1})
            }
        }
    };

    onChangeCorrelationSearchesInput = (event, data) => {
        if (isPositiveNumber(data.value)) {
            this.setState({correlationSearches: parseInt(data.value)})
        }
    };

    onChangeConcurrentUsersInput = (event, data) => {
        if (isPositiveNumber(data.value)) {
            this.setState({concurrentUsers: parseInt(data.value)})
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
                                    <Item.Description>
                                        <PlusMinusInput icon='map signs'
                                                        value={this.state.correlationSearches}
                                                        onChange={this.onChangeCorrelationSearches}
                                                        onChangeInput={this.onChangeCorrelationSearchesInput}
                                        />
                                    </Item.Description>
                                </Item.Content>
                            </Item>

                            <Item>
                                <Item.Image src={concurrentUsers} size='tiny'/>

                                <Item.Content>
                                    <Item.Header>
                                        Concurrent Users
                                    </Item.Header>
                                    <Item.Description>
                                        <PlusMinusInput icon='users'
                                                        value={this.state.concurrentUsers}
                                                        onChange={this.onChangeConcurrentUsers}
                                                        onChangeInput={this.onChangeConcurrentUsersInput}
                                        />
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Item.Group>
                </Segment>
            </Transition>
        )
    }
}