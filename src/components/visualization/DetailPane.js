import React, {Component} from 'react';
import {Grid, Icon, Label} from 'semantic-ui-react';
import {times} from 'lodash';
import Gauge from "./widget/Gauge";

export default class DetailPane extends Component {
    constructor(args) {
        super(args);
    }

    renderCoreUsage = (id, count, color) => {
        if (isNaN(count)) {
            return null;
        }
        return (
            <Grid.Column>
                <Gauge id={'gauge_' + id} value={count} color={color}/>
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
                    <Grid.Row columns={5}>
                        {this.renderCoreUsage('sh1', result.searchCPUPerSH, 'red')}
                        {this.renderCoreUsage('sh2', 100 - result.searchCPUPerSH, 'blue')}
                    </Grid.Row>
                    <Grid.Row style={{
                        border: '1px solid black',
                        borderRadius: '15px',
                        margin: '0px 20px 5px 20px'
                    }}>
                        <Icon color='red' name='circle'/>
                        Search CPU % Per Search Head
                        <Icon color='blue' name='circle'/>
                        Idle CPU % Per Search Head
                    </Grid.Row>
                    {!isNaN(result.searchCPUPerIndexer) ?
                        <Grid.Row columns={7}>
                            {this.renderCoreUsage('idx1', result.searchCPUPerIndexer, 'red')}

                            {this.renderCoreUsage('idx2', result.dmaCPUPerIndexer, 'yellow')}

                            {this.renderCoreUsage('idx3', 100 - result.searchCPUPerIndexer - result.dmaCPUPerIndexer, 'blue')}

                        </Grid.Row> : null}
                    {!isNaN(result.searchCPUPerIndexer) ?
                        <Grid.Row style={{
                            border: '1px solid black',
                            borderRadius: '15px',
                            margin: '0px 20px 5px 20px'
                        }}>
                            <Icon color='red' name='circle'/>
                            Search CPU % Per Indexer
                            <Icon color='yellow' name='circle'/>
                            DMA CPU % Per Indexer
                            <Icon color='blue' name='circle'/>
                            Idle CPU % Per Indexer
                        </Grid.Row>
                        : null}
                </Grid>
            </div>
        )
    }
}