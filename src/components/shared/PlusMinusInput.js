import React, {Component} from 'react';
import {Input, Button, Icon} from 'semantic-ui-react';

export default class PlusMinusInput extends Component {
    constructor(args) {
        super(args);
    }

    render() {
        return (
            <div style={{margin: 'auto'}}>
                <Button circular color='green' icon='add square' size='tiny'
                        onClick={() => this.props.onChange('plus')}/>
                {this.props.icon ?
                    <Input size='small' style={{width: '80px', marginRight: '3px'}} icon={this.props.icon}
                           value={this.props.value} onChange={this.props.onChangeInput}/> : null}
                {this.props.label ?
                    <Input size='small' style={{width: '80px', marginRight: '45px'}}
                           label={{basic: true, content: this.props.label}}
                           labelPosition='right' value={this.props.value}
                           onChange={this.props.onChangeInput}/> : null}
                <Button circular color='orange' icon='minus square' size='tiny'
                        onClick={() => this.props.onChange('minus')}/>
            </div>

        )
    }
}