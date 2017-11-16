import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import img from '../assets/placeholder.png';

export default class ConfigVizPanel extends Component{
    constructor(args){
        super(args);
    }

    render(){
        return (
            <Image src={img}/>
        )
    }
}