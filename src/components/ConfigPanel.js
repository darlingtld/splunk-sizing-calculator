import React, {Component} from 'react';
import {Grid, Menu, Icon} from 'semantic-ui-react';
import './ConfigPanel.scss';
import ConfigServerPanel from './ConfigServerPanel';
import ConfigVersionPanel from './ConfigVersionPanel';
import ConfigSearchLoadPanel from "./ConfigSearchLoadPanel";
import ConfigDataDistributionPanel from "./ConfigDataDistributionPanel";
import ConfigParallelTuningPanel from "./ConfigParallelTuningPanel";
import {assign} from "lodash";

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
            ],
            changeCount: 0
        }
    }



    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    renderConfigItemPanel = activeItem => {
        switch (activeItem) {
            case 'Server Specifications':
                return <ConfigServerPanel data={this.props.data}/>;
            case 'Splunk Enterprise Version':
                return <ConfigVersionPanel data={this.props.data}/>;
            case 'Search Load':
                return <ConfigSearchLoadPanel data={this.props.data}/>;
            case 'Network Traffic':
                return <ConfigDataDistributionPanel name='Network Traffic' dataModel='networkTraffic'
                                                    data={this.props.data}/>;
            case 'Authentication':
                return <ConfigDataDistributionPanel name='Authentication' dataModel='authentication'
                                                    data={this.props.data}/>;
            case 'Web':
                return <ConfigDataDistributionPanel name='Web' dataModel='web' data={this.props.data}/>;
            case 'Parallel Configuration Tuning':
                return <ConfigParallelTuningPanel data={this.props.data}/>;
        }

    };

    renderSubInfo = (item) => {
        const subInfoStyle = {
            fontSize: 'small',
            color: 'darkgray',
            marginTop: '5px'
        };
        switch (item.name) {
            case 'Server Specifications':
                return <div
                    style={subInfoStyle}>{`SH:${this.props.data.searchHeadCores} IDX:${this.props.data.indexerCores} Margin:${this.props.data.marginOfError}%`}</div>;
            case 'Splunk Enterprise Version':
                return <div
                    style={subInfoStyle}>{`Splunk:${this.props.data.splunkVersion} ES:${this.props.data.esVersion}`}</div>;
            case 'Search Load':
                return <div
                    style={subInfoStyle}>{`Corre searches:${this.props.data.correlationSearches} Concur users:${this.props.data.concurrentUsers}`}</div>;
            case 'Data Distribution':
                return <div
                    style={subInfoStyle}>{`Net:${this.props.data.networkTrafficTotal}GB Auth:${this.props.data.authenticationTotal}GB Web:${this.props.data.webTotal}GB`}</div>;
            case 'Parallel Configuration Tuning':
                return this.props.data.parallelEnableChecked ?
                    <div style={subInfoStyle}>
                        {`Net:${this.props.data.networkTrafficConcurrency} Auth:${this.props.data.authenticationConcurrency} Web:${this.props.data.webConcurrency}`}
                    </div> : null;
        }
    };

    render() {
        const {activeItem} = this.state;

        return (
            <div className="config-panel">
                <Grid>
                    <Grid.Column width={6}>
                        <Menu fluid vertical pointing size='huge'>
                            {this.state.configItems.map(item => {
                                    if (item.subs.length === 0) {
                                        return <Menu.Item name={item.name} key={item.name} active={activeItem === item.name}
                                                          onClick={this.handleItemClick}>
                                            <Icon name={item.icon}/>
                                            {item.name}
                                            {this.renderSubInfo(item)}
                                        </Menu.Item>;
                                    } else {
                                        return <Menu.Item key={item.name}>
                                            <Icon name={item.icon}/>
                                            {item.name}
                                            <Menu.Menu>
                                                {item.subs.map(sub =>
                                                    <Menu.Item name={sub} key={sub} active={activeItem === sub}
                                                               onClick={this.handleItemClick}/>
                                                )}
                                            </Menu.Menu>
                                            {this.renderSubInfo(item)}
                                        </Menu.Item>
                                    }
                                }
                            )}
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={10}>
                        {this.renderConfigItemPanel(this.state.activeItem)}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}