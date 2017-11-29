import React, {Component} from 'react';
import {Grid, Icon, Label} from 'semantic-ui-react';
import {times} from 'lodash';

export default class DetailPane extends Component {
    constructor(args) {
        super(args);
    }

    renderCoreUsage = (count, color) => {
        if (isNaN(count)) {
            return;
        }
        const columnNum = Math.min(Math.floor(count), 9);
        const columnArray = [];
        const columnArrayRest = [];

        times(columnNum, () => columnArray.push(
            <Grid.Column>
                <Icon name='microchip' color={color} size='large'/>
            </Grid.Column>
        ));
        times(Math.min(1, count - columnArray.length), () => columnArrayRest.push(
            <Grid.Column>
                <Icon name='ellipsis horizontal' color={color} size='large'/>
            </Grid.Column>
        ));

        return <Grid columns={columnNum + 1}>
            <Grid.Row>
                {columnArray}
            </Grid.Row>
            <Grid.Row>
                {columnArrayRest}
            </Grid.Row>
        </Grid>

    }

    render() {
        const {result} = this.props.data;
        return (
            <div>
                <Grid textAlign='center'>
                    <Grid.Row columns={5}>
                        {this.renderCoreUsage(result.searchCPUPerSH, 'red')}
                        {this.renderCoreUsage(result.marginCPUPerSH, 'blue')}
                        <Grid.Column>
                            <Label.Group>
                                <Label>
                                    <Icon name='microchip' color='red'/> {Math.floor(result.searchCPUPerSH)}
                                </Label>
                                <Label>
                                    <Icon name='microchip' color='blue'/> {Math.floor(result.marginCPUPerSH)}
                                </Label>
                            </Label.Group>
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
                    <Grid.Row columns={5}>
                        {this.renderCoreUsage(result.searchCPUPerIndexer, 'red')}
                        {this.renderCoreUsage(result.marginCPUPerIndexer, 'blue')}
                        {this.renderCoreUsage(result.dmaCPUPerIndexer, 'yellow')}
                        {!isNaN(result.searchCPUPerIndexer) ?
                            <Grid.Column>
                                <Label.Group>
                                    <Label>
                                        <Icon name='microchip' color='red'/> {Math.floor(result.searchCPUPerIndexer)}
                                    </Label>
                                    <Label>
                                        <Icon name='microchip' color='blue'/> {Math.floor(result.marginCPUPerIndexer)}
                                    </Label>
                                    <Label>
                                        <Icon name='microchip' color='yellow'/> {Math.floor(result.dmaCPUPerIndexer)}
                                    </Label>
                                </Label.Group>
                            </Grid.Column> : null}
                    </Grid.Row>
                    {!isNaN(result.searchCPUPerIndexer) ?
                        <Grid.Row style={{
                            border: '1px solid black',
                            borderRadius: '15px',
                            margin: '0px 20px 5px 20px'
                        }}>
                            <Icon color='red' name='circle'/>
                            Search CPU Per Indexer
                            <Icon color='blue' name='circle'/>
                            Margin CPU Per Indexer
                            <Icon color='yellow' name='circle'/>
                            DMA CPU Per Indexer
                        </Grid.Row> : null}
                </Grid>
            </div>
        )
    }
}