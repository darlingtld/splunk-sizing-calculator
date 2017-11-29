import React, {Component} from 'react';
import {Image, Menu, Tab, Transition} from 'semantic-ui-react';
import DetailPane from "./visualization/DetailPane";
import cpu from '../assets/cpu.svg';
import topology from '../assets/topology.svg';
import TopologyPane from "./visualization/TopologyPane";


export default class ConfigVizPanel extends Component {
    constructor(args) {
        super(args);
        this.panes = [
            {
                menuItem: <Menu.Item key='topology'>Topology<Image src={topology} width={22}
                                                                   style={{marginLeft: '5px'}}/></Menu.Item>,
                render: () =>
                    <Tab.Pane>
                        <TopologyPane searchHeads={this.props.searchHeads} indexers={this.props.indexers}/>
                    </Tab.Pane>
                ,
            },
            {
                menuItem: <Menu.Item key='detail'>Details<Image src={cpu} width={22}
                                                                style={{marginLeft: '5px'}}/></Menu.Item>,
                render: () =>
                    <Tab.Pane>
                        <DetailPane data={this.props.data}/>
                    </Tab.Pane>,
            },
        ]
    }

    render() {
        return (
            <Tab panes={this.panes}/>
        )
    }
}