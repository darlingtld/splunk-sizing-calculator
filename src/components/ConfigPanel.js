import React, {Component} from 'react';
import {Grid, Menu, Segment, Icon} from 'semantic-ui-react';
import './ConfigPanel.scss';

export default class ConfigPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            activeItem: 'Server Specifications',
            configItems: [
                {
                    name: 'Server Specifications',
                    icon: 'server',
                    subs: []
                },
                {
                    name: 'Splunk Enterprise Version',
                    icon: 'product hunt',
                    subs: []
                },
                {
                    name: 'Search Load',
                    icon: 'industry',
                    subs: []
                },
                {
                    name: 'Data Distribution',
                    icon: 'cubes',
                    subs: ['Network Traffic', 'Authentication', 'Web'],
                },
                {
                    name: 'Parallel Configuration Tuning',
                    icon: 'openid',
                    subs: []
                }

            ]
        }
    }


    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;

        return (
            <div className="config-panel">
                <Grid>
                    <Grid.Column width={6}>
                        <Menu fluid vertical pointing>
                            {this.state.configItems.map(item => {
                                    if (item.subs.length === 0) {
                                        return <Menu.Item name={item.name} active={activeItem === item.name}
                                                          onClick={this.handleItemClick}>
                                            <Icon name={item.icon}/>
                                            {item.name}
                                        </Menu.Item>;
                                    } else {
                                        return <Menu.Item>
                                            <Icon name={item.icon}/>
                                            {item.name}
                                            <Menu.Menu>
                                                {item.subs.map(sub =>
                                                    <Menu.Item name={sub} active={activeItem === sub}
                                                               onClick={this.handleItemClick}/>
                                                )}
                                            </Menu.Menu>
                                        </Menu.Item>
                                    }
                                }
                            )}
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={10}>
                        <Segment>
                            This is an stretched grid column. This segment will always match the tab height
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}