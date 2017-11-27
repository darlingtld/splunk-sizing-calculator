import React, {Component} from 'react';
import {Image, Menu, Tab, Transition} from 'semantic-ui-react';
import DetailPane from "./visualization/DetailPane";
import cpu from '../assets/cpu.svg';
import topology from '../assets/topology.svg';
import TopologyPane from "./visualization/TopologyPane";
import {getRandomTransitionAnimation} from "./shared/Utils";


export default class ConfigVizPanel extends Component {
    constructor(args) {
        super(args);
        this.panes = [
            {
                menuItem: <Menu.Item key='topology'>Topology<Image src={topology} width={22}
                                                                   style={{marginLeft: '5px'}}/></Menu.Item>,
                render: () =>
                    <Transition animation={getRandomTransitionAnimation()} duration={800} transitionOnMount={true}>
                        <Tab.Pane>
                            <TopologyPane searchHeads={this.props.searchHeads} indexers={this.props.indexers}/>
                        </Tab.Pane>
                    </Transition>
                ,
            },
            {
                menuItem: <Menu.Item key='detail'>Details<Image src={cpu} width={22}
                                                                style={{marginLeft: '5px'}}/></Menu.Item>,
                render: () =>
                    <Transition animation={getRandomTransitionAnimation()} duration={800}
                                transitionOnMount={true}>
                        <Tab.Pane>
                            <DetailPane/>
                        </Tab.Pane>
                    </Transition>,
            },
        ]
    }

    render() {
        return (
            <Tab panes={this.panes}/>
        )
    }
}