import React, {Component} from 'react';
import {Statistic, Grid} from 'semantic-ui-react';
import './ResourcePanel.scss';
import ConfigVizPanel from "./ConfigVizPanel";

export default class ResourcePanel extends Component {
    constructor(args) {
        super(args);
    }

    render() {
        return (
            <div className='resource-panel'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Statistic.Group horizontal>
                                <Statistic>
                                    <Statistic.Value>3</Statistic.Value>
                                    <Statistic.Label>Search Heads</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Statistic.Group horizontal>
                                <Statistic>
                                    <Statistic.Value>8</Statistic.Value>
                                    <Statistic.Label>Indexers</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <ConfigVizPanel/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}