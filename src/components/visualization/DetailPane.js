import React, {Component} from 'react';
import Gauge from "./widget/Gauge";
import {Grid, Image} from 'semantic-ui-react';
import sh from '../../assets/sh.png';
import idx from '../../assets/idx.png';

export default class DetailPane extends Component {
    constructor(args) {
        super(args);
    }

    render() {
        return (
            <div>
                <Grid columns={10}>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src={sh}/>
                            <span>Search Head</span>
                        </Grid.Column>
                        <Grid.Column>
                            <Gauge id='shCpu' name="cpu" value={20}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Gauge id='shMem' name="memory" value={82}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src={idx}/>
                            <span>Indexer</span>
                        </Grid.Column>
                        <Grid.Column>
                            <Gauge id='idxCpu' name="cpu" value={50}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Gauge id='idxMem' name="memory" value={70}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}