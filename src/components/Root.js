import React from 'react'
import HeaderBar from './HeaderBar';
import ConfigPanel from "./ConfigPanel";
import ResourcePanel from "./ResourcePanel";
import {Grid} from 'semantic-ui-react';

const Root = () => (
    <div>
        <HeaderBar/>
        <Grid>
            <Grid.Column width={8}>
                <ConfigPanel/>
            </Grid.Column>
            <Grid.Column width={8}>
                <ResourcePanel/>
            </Grid.Column>
        </Grid>
    </div>
)

export default Root
