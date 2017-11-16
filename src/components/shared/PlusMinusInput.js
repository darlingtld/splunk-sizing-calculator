import React, {Component} from 'react';
import {Input, Button, Icon} from 'semantic-ui-react';

export default class PlusMinusInput extends Component {
    constructor(args) {
        super(args);
    }

    render() {
        return (
            <div style={{margin: 'auto'}}>
                <Button circular color='green' icon='add square' size='tiny'/>
                {this.props.icon ?
                    <Input size='small' style={{width: '100px', marginRight: '3px'}} icon={this.props.icon}/> : ''}
                {this.props.label ?
                    <Input size='small' style={{width: '100px', marginRight: '45px'}} label={{basic: true, content: this.props.label}}
                           labelPosition='right'/> : ''}
                <Button circular color='orange' icon='minus square' size='tiny'/>
            </div>

        )
    }
}