import React, {Component} from 'react';
import {Grid, Icon, Label} from 'semantic-ui-react';
import {times, uniqueId} from 'lodash';
import Gauge from "./widget/Gauge";

export default class DetailPane extends Component {
    constructor(args) {
        super(args);
    }

    renderCoreUsage = (count, color) => {
        if (isNaN(count)) {
            return null;
        }
        return (
            <Grid.Column>
                <Gauge id={'gauge' + uniqueId()} value={count}/>
            </Grid.Column>
        )
    }

    render() {
        const {result} = this.props.data;
        if (!result || !result.searchCPUPerSH) {
            return null;
        }
        return (
            <div>
                <Grid textAlign='center'>
                    <Grid.Row columns={7}>
                        {this.renderCoreUsage(result.searchCPUPerSH, 'red')}
                        <Grid.Column verticalAlign='middle'>
                            <Label>
                                <Icon name='microchip' color='red'/>
                            </Label>
                        </Grid.Column>
                        {this.renderCoreUsage(100 - result.searchCPUPerSH, 'blue')}
                        <Grid.Column verticalAlign='middle'>
                            <Label>
                                <Icon name='microchip' color='blue'/>
                            </Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{
                        border: '1px solid black',
                        borderRadius: '15px',
                        margin: '0px 20px 5px 20px'
                    }}>
                        <Icon color='red' name='circle'/>
                        Search CPU Per Search Head
                        <Icon color='blue' name='circle'/>
                        Margin CPU Per Search Head
                    </Grid.Row>
                    {!isNaN(result.searchCPUPerIndexer) ?
                        <Grid.Row columns={9}>
                            {this.renderCoreUsage(result.searchCPUPerIndexer, 'red')}
                            <Grid.Column verticalAlign='middle'>
                                <Label>
                                    <Icon name='microchip' color='red'/>
                                </Label>
                            </Grid.Column>
                            {this.renderCoreUsage(result.dmaCPUPerIndexer, 'yellow')}
                            <Grid.Column verticalAlign='middle'>
                                <Label>
                                    <Icon name='microchip' color='yellow'/>
                                </Label>
                            </Grid.Column>
                            {this.renderCoreUsage(100 - result.searchCPUPerIndexer - result.dmaCPUPerIndexer, 'blue')}
                            <Grid.Column verticalAlign='middle'>
                                <Label>
                                    <Icon name='microchip' color='blue'/>
                                </Label>
                            </Grid.Column>
                        </Grid.Row> : null}
                    {!isNaN(result.searchCPUPerIndexer) ?
                        <Grid.Row style={{
                            border: '1px solid black',
                            borderRadius: '15px',
                            margin: '0px 20px 5px 20px'
                        }}>
                            <Icon color='red' name='circle'/>
                            Search CPU Per Indexer
                            <Icon color='yellow' name='circle'/>
                            DMA CPU Per Indexer
                            <Icon color='blue' name='circle'/>
                            Margin CPU Per Indexer
                        </Grid.Row>
                        : null}
                </Grid>
            </div>
        )
    }
}