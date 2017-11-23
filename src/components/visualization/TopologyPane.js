import React, {Component} from 'react';
import {Image, Grid, Statistic} from 'semantic-ui-react';
import {random, min} from 'lodash';
import sh from '../../assets/sh.png';
import idx from '../../assets/idx.png';
import others from '../../assets/others.svg';
import Line from "./widget/Line";

export default class TopologyPane extends Component {
    constructor(args) {
        super(args);
    }

    renderInstances(pic, type) {
        const array = [];
        const amount = type === 'searchHead' ? this.props.searchHeads : this.props.indexers;
        const count = min([amount, 4]);
        for (let i = 0; i < count; i++) {
            array.push(<Grid.Column>
                <Image src={pic} style={{margin: 'auto'}}/>
            </Grid.Column>);
            if (i < count - 1) {
                array.push(<Grid.Column textAlign='center' style={{padding: 0}}>
                    <Line name={type + `line1` + i} width={60} height={15} isReverse={false}
                          color='lightskyblue' duration={random(1000, 1500)}/>
                    <Line name={type + `line2` + i} width={60} height={15} isReverse={true}
                          duration={random(1000, 1500)}/>
                    <Line name={type + `line3` + i} width={60} height={15} isReverse={false}
                          color='orange' duration={random(1000, 1500)}/>
                </Grid.Column>)
            }
        }

        return array;
    }

    renderOthers(pic, type) {
        const amount = type === 'searchHead' ? this.props.searchHeads : this.props.indexers;
        if (amount > 4) {
            return (
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            {this.renderMore(pic, amount - 4, false)}
                        </Grid.Column>
                        <Grid.Column>
                            {this.renderMore(pic, amount - 7, true)}
                        </Grid.Column>
                        <Grid.Column>
                            <Statistic.Group size='mini'>
                                <Statistic>
                                    <Statistic.Value>{amount}</Statistic.Value>
                                    <Statistic.Label>{type}</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
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
            more.push(<Image src={pic} style={{margin: 'auto'}} width={40}/>);
            if (i === count - 2 && needMore) {
                more.push(<Image src={others} style={{margin: 'auto'}} width={40}/>);
                return more;
            }
        }
        return more;
    }

    render() {
        return (
            <div>
                <Grid columns={10}>
                    <Grid.Row style={{
                        border: '1px dotted',
                        margin: '5px',
                        borderRadius: '15px'
                    }}>
                        {this.renderInstances(sh, 'searchHead')}
                        <Grid.Column width={3}>
                            {this.renderOthers(sh, 'searchHead')}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    </Grid.Row>
                    <Grid.Row>
                        {this.renderInstances(idx, 'indexer')}
                        <Grid.Column width={3}>
                            {this.renderOthers(idx, 'indexer')}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}