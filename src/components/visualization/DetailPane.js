import React, {Component} from 'react';
import {Grid, Icon} from 'semantic-ui-react';
import {times} from 'lodash';

export default class DetailPane extends Component {
    constructor(args) {
        super(args);
    }

    renderCoreUsage = (count, color) => {
        const columnNum = Math.ceil(count / 2);
        const columnArray = [];
        const columnArrayRest = [];

        times(columnNum, () => columnArray.push(
            <Grid.Column>
                <Icon name='microchip' color={color}/>
            </Grid.Column>
        ));
        times(count - columnArray.length, () => columnArrayRest.push(
            <Grid.Column>
                <Icon name='microchip' color={color}/>
            </Grid.Column>
        ));
        return <Grid columns={columnNum}>
            <Grid.Row>
                {columnArray}
            </Grid.Row>
            <Grid.Row>
                {columnArrayRest}
            </Grid.Row>
        </Grid>

    }

    render() {
        return (
            <div>
                <Grid textAlign='center'>
                    <Grid.Row columns={5}>
                        {this.renderCoreUsage(this.props.concurrency, 'red')}
                        {this.renderCoreUsage(this.props.dma, 'blue')}
                        {this.renderCoreUsage(this.props.search, 'yellow')}
                    </Grid.Row>
                    <Grid.Row style={{
                        border: '1px solid black',
                        borderRadius: '15px',
                        margin: '0px 20px 5px 20px'
                    }}>
                        <Icon color='red' name='circle'/>
                        Cores for concurrent searches
                        <Icon color='blue' name='circle'/>
                        Cores for DMA acceleration
                        <Icon color='yellow' name='circle'/>
                        Cores for searches
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}