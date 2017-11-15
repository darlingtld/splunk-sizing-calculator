import React, {Component} from 'react';
import {Input, Button, Icon} from 'semantic-ui-react';

export default class PlusMinusInput extends Component{
    constructor(args) {
        super(args);
    }

    render(){
        return (
            <Input size='small'>
                <Button basic icon color='green' attached='left'><Icon name='plus'/></Button>
                <input />
                <Button basic icon color='red' attached='right'><Icon name='minus'/></Button>
            </Input>

        )
    }
}