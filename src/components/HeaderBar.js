/**
 * Created by lingda on 04/11/2017.
 */
import React, {Component} from 'react';
import {Grid, Icon} from 'semantic-ui-react';

export default class HeaderBar extends Component {
    
    render() {
        return (
            <Grid celled='internally' verticalAlign='middle' style={{
                height: 50,
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9999
            }} divided>
                <Grid.Row color='teal'>
                    <Grid.Column width={13}>
                        <span style={{fontSize: '1.3em'}}>ES Sizing Calculator</span>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Icon name='user'/>
                        <span>Hello, Splunker!</span>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}