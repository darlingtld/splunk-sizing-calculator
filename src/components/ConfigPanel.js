import React, {Component} from 'react';
import {Grid, Menu, Segment} from 'semantic-ui-react';
import './ConfigPanel.scss';

export default class ConfigPanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            activeItem: 'Server Specifications',
            configItems: [
                {
                    name: 'Server Specifications',
                    subs: []
                },
                {
                    name: 'Splunk Enterprise Version',
                    subs: []
                },
                {
                    name: 'Search Load',
                    subs: []
                },
                {
                    name: 'Data Distribution',
                    subs: ['Network Traffic', 'Authentication', 'Web'],
                },
                {
                    name: 'Parallel Configuration Tuning',
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
                    <Grid.Column width={3}>
                        <Menu fluid vertical pointing>
                            {this.state.configItems.map(item => {
                                    if (item.subs.length === 0) {
                                        return <Menu.Item name={item.name} active={activeItem === item.name}
                                                          onClick={this.handleItemClick}/>;
                                    } else {
                                        return <Menu.Item>
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

                    <Grid.Column stretched width={5}>
                        <Segment>
                            This is an stretched grid column. This segment will always match the tab height
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}