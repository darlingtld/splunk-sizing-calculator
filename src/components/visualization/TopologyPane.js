import React, {Component} from 'react';
import {Image, Grid} from 'semantic-ui-react';
import sh from '../../assets/sh.png';
import idx from '../../assets/idx.png';
import Line from "./widget/Line";

export default class TopologyPane extends Component {
    constructor(args) {
        super(args);
    }

    render() {
        return (
            <div>
                <Grid columns={5}>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src={sh} style={{margin: 'auto'}}/>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Line name='shline1' width={100} height={15} isReverse={false} color='lightskyblue' duration={1000}/>
                            <Line name='shline2' width={100} height={15} isReverse={true} duration={600}/>
                            <Line name='shline3' width={100} height={15} isReverse={false} color='orange' duration={800}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Image src={sh} style={{margin:'auto'}}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Image src={idx} style={{margin: 'auto'}}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Line name='idxline1' width={100} height={15} isReverse={false} color='lightskyblue' duration={1000}/>
                            <Line name='idxline2' width={100} height={15} isReverse={true} duration={600}/>
                            <Line name='idxline3' width={100} height={15} isReverse={false} color='orange' duration={800}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Image src={idx} style={{margin: 'auto'}}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}