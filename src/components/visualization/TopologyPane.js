import React, {Component} from 'react';
import {Image, Grid, Statistic} from 'semantic-ui-react';
import {times, min, uniqueId} from 'lodash';
import sh from '../../assets/sh.png';
import idx from '../../assets/idx.png';
import others from '../../assets/others.svg';
import idxLine from '../../assets/arrows-mix.svg';
import crossLine from '../../assets/up-and-down-opposite-double-arrows-side-by-side.svg';

export default class TopologyPane extends Component {
    constructor(args) {
        super(args);
    }

    renderInstances(pic, type) {
        const array = [];
        const amount = type === 'searchHead' ? this.props.searchHeads : this.props.indexers;
        const max = type === 'searchHead' ? 2 : 3;
        if (type === 'searchHead') {
            if (this.props.searchHeads === 1) {
                times(2, () => array.push(<Grid.Column key={uniqueId()}/>));
            }else if (this.props.searchHeads >= 2) {
                times(1, () => array.push(<Grid.Column key={uniqueId()}/>));
            }
        } else {
            if (this.props.indexers === 1) {
                times(2, () => array.push(<Grid.Column key={uniqueId()}/>));
            } else if (this.props.indexers === 2) {
                times(1, () => array.push(<Grid.Column key={uniqueId()}/>));
            }
        }


        const count = min([amount, max]);
        for (let i = 0; i < count; i++) {
            array.push(<Grid.Column key={uniqueId()}>
                <Image src={pic} style={{margin: 'auto'}}/>
            </Grid.Column>);
            if (i < count - 1) {
                array.push(
                    <Grid.Column textAlign='center' style={{padding: 0}} key={uniqueId()}>
                        <Image src={idxLine} style={{margin: 'auto', width: '46px'}}/>
                    </Grid.Column>
                )
            }
        }

        return array;
    }

    renderOthers(pic, type) {
        const amount = type === 'searchHead' ? this.props.searchHeads : this.props.indexers;
        const max = type === 'searchHead' ? 2 : 3;
        if (amount > max) {
            return (
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column key={uniqueId()}>
                            {this.renderMore(pic, amount - max, false)}
                        </Grid.Column>
                        <Grid.Column key={uniqueId()}>
                            {this.renderMore(pic, amount - max - 3, true)}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
        }
    }

    renderMore(pic, amount, needMore) {
        if (amount <= 0) {
            return;
        }
        const more = [];
        const count = min([amount, 3]);
        for (let i = 0; i < count; i++) {
            more.push(<Image src={pic} style={{margin: 'auto'}} width={14}/>);
            if (i === count - 2 && needMore) {
                more.push(<Image src={others} style={{margin: 'auto'}} width={14}/>);
                return more;
            }
        }
        return more;
    }


    renderTransportation() {
        if (this.props.indexers === 0) {
            return;
        }
        const lineArray = [];
        lineArray.push(<Grid.Column key={uniqueId()}/>);
        lineArray.push(<Grid.Column key={uniqueId()}/>);
        lineArray.push(<Grid.Column key={uniqueId()}/>);
        if (this.props.searchHeads  >= 2) {
            lineArray.push(
                <Grid.Column key={uniqueId()}>
                    <Image src={crossLine} style={{margin: 'auto'}}/>
                </Grid.Column>
            );

            lineArray.push(<Grid.Column key={uniqueId()}/>);
            lineArray.push(
                <Grid.Column key={uniqueId()}>
                    <Image src={crossLine} style={{margin: 'auto'}}/>
                </Grid.Column>
            );
        } else if (this.props.searchHeads === 1) {
            lineArray.push(<Grid.Column key={uniqueId()}/>);
            lineArray.push(
                <Grid.Column key={uniqueId()}>
                    <Image src={crossLine} style={{margin: 'auto'}}/>
                </Grid.Column>
            );
        }

        return lineArray;
    }

    renderStatistics(type) {
        const amount = type === 'searchHead' ? this.props.searchHeads : this.props.indexers;
        const style = {
            paddingLeft: '35px'
        };
        return (
            <Grid.Column style={type === 'searchHead' ? null : style} key={uniqueId()}>
                <Statistic.Group size='mini'>
                    <Statistic>
                        <Statistic.Value>{amount}</Statistic.Value>
                        <Statistic.Label>{type}</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </Grid.Column>
        )
    }

    render() {
        return (
            <div>
                <Grid columns={10}>
                    <Grid.Row style={{
                        border: '1px dotted',
                        margin: '5px 5px 0 5px',
                        paddingBottom: '0',
                        borderRadius: '15px'
                    }}>
                        {this.renderStatistics('searchHead')}
                        <Grid.Column/>
                        {this.renderInstances(sh, 'searchHead')}
                        <Grid.Column width={2} key={uniqueId()}>
                            {this.renderOthers(sh, 'searchHead')}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched={true} style={{padding: '0'}}>
                        {this.renderTransportation()}
                    </Grid.Row>
                    <Grid.Row>
                        {this.renderStatistics('indexer')}
                        <Grid.Column/>
                        {this.renderInstances(idx, 'indexer')}
                        <Grid.Column width={2} key={uniqueId()}>
                            {this.renderOthers(idx, 'indexer')}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}