import React, {Component} from 'react';
import {Input, Button, Icon} from 'semantic-ui-react';

export default class PlusMinusInput extends Component {
    constructor(args) {
        super(args);
    }

    render() {
        return (
            <div style={{margin:'auto'}}>
                <Button circular color='green' icon='add square' size='tiny'/>
                <Input size='small' style={{width: '80px', marginRight:'3px'}} icon={this.props.icon}/>
                <Button circular color='orange' icon='minus square' size='tiny'/>
            </div>

        )
    }
}