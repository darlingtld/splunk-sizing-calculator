import React from 'react'
import HeaderBar from './HeaderBar';
import ConfigPanel from "./ConfigPanel";
import ResourcePanel from "./ResourcePanel";
import {Grid} from 'semantic-ui-react';

const data = {};

const Root = () => (
    <div>
        <HeaderBar/>
        <Grid>
            <Grid.Column width={8}>
                <ConfigPanel data={data}/>
            </Grid.Column>
            <Grid.Column width={8}>
                <ResourcePanel data={data}/>
            </Grid.Column>
        </Grid>
    </div>
)

export default Root
