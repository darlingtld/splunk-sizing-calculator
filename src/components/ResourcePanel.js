import React, {Component} from 'react';
import {Statistic, Grid, Button, Icon} from 'semantic-ui-react';
import './ResourcePanel.scss';
import ConfigVizPanel from "./ConfigVizPanel";
import {esCalculate} from "../calculation/esCalculator";

export default class ResourcePanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            searchHeads: 0,
            indexers: 0,
            shCPU: 0,
            shMemory: 0,
            idxCPU: 0,
            idxMemory: 0
        }
    }

    doCalculate = () => {
        const result = esCalculate(this.props.data);
        this.setState({
            searchHeads: result.shNum,
            indexers: result.idxNum,
            shCPU: result.shCPU,
            shMemory: result.shMemory,
            idxCPU: result.idxCPU,
            idxMemory: result.idxMemory
        });
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
                                    <Statistic.Value>{this.state.searchHeads}</Statistic.Value>
                                    <Statistic.Label>Search Heads</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <Statistic.Group color='green' size='tiny'>
                                <Statistic>
                                    <Statistic.Value>{this.state.shCPU}</Statistic.Value>
                                    <Statistic.Label>cores</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>{this.state.shMemory}</Statistic.Value>
                                    <Statistic.Label>(GB)RAM</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Statistic.Group horizontal>
                                <Statistic>
                                    <Statistic.Value>{this.state.indexers}</Statistic.Value>
                                    <Statistic.Label>Indexers</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <Statistic.Group color='green' size='tiny'>
                                <Statistic>
                                    <Statistic.Value>{this.state.idxCPU}</Statistic.Value>
                                    <Statistic.Label>cores</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>{this.state.idxMemory}</Statistic.Value>
                                    <Statistic.Label>(GB)RAM</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Grid.Column>
                        <Grid.Column width={6} verticalAlign='middle'>
                            <Button animated='fade' size='large' color='orange' onClick={this.doCalculate}>
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
                        <Grid.Column width={15}>
                            <ConfigVizPanel/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}