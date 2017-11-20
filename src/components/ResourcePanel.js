import React, {Component} from 'react';
import {Statistic, Grid, Button, Icon} from 'semantic-ui-react';
import './ResourcePanel.scss';
import ConfigVizPanel from "./ConfigVizPanel";
import {esCalculate} from "../calculation/esCalculator";

export default class ResourcePanel extends Component {
    constructor(args) {
        super(args);
    }

    doCalculate=()=>{
        const result = esCalculate(this.props.data);
        console.log(result);
    };

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
                        <Grid.Column width={6} verticalAlign='middle'>
                            <Button animated='fade' size='large' color='green' onClick={this.doCalculate}>
                                <Button.Content visible>
                                    <Icon name='calculator'/>
                                    Calculate
                                </Button.Content>
                                <Button.Content hidden>
                                    ES Sizing
                                </Button.Content>
                            </Button>
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