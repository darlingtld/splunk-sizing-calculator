import React, {Component} from 'react';
import {Statistic, Grid, Button, Icon, Modal, Header, Table} from 'semantic-ui-react';
import './ResourcePanel.scss';
import ConfigVizPanel from "./ConfigVizPanel";
import {esCalculate} from "../calculation/esCalculator";
import {assign} from 'lodash';

export default class ResourcePanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            searchHeads: 0,
            indexers: 0,
            shCPU: 0,
            shMemory: 0,
            idxCPU: 0,
            idxMemory: 0
        }
    }

    doCalculate = () => {
        const result = esCalculate(this.props.data);
        this.setState({
            searchHeads: result.shNum,
            indexers: result.idxNum,
            shCPU: result.shCPU,
            shMemory: result.shMemory,
            idxCPU: result.idxCPU,
            idxMemory: result.idxMemory
        });
        console.log(result);
        assign(this.props.data, {result})
    };

    renderParameters = () => {
        const {data} = this.props;
        const concurrency = [];
        if (data.parallelEnableChecked) {
            concurrency.push(<Table.Row>
                <Table.Cell>
                    Network Traffic Concurrency
                </Table.Cell>
                <Table.Cell textAlign='center'>{data.networkTrafficConcurrency}</Table.Cell>
            </Table.Row>);
            concurrency.push(
                <Table.Row>
                    <Table.Cell>
                        Authentication Concurrency
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.authenticationConcurrency}</Table.Cell>
                </Table.Row>);
            concurrency.push(
                <Table.Row>
                    <Table.Cell>
                        Web Concurrency
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.webConcurrency}</Table.Cell>
                </Table.Row>);
        }
        return <Table celled striped columns={2}>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Search Head
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.searchHeadCores}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Indexer
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.indexerCores}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Margin of Error%
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.marginOfError}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Splunk Enterprise Version
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.splunkVersion}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Enterprise Security Version
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.esVersion}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Enabled Correlation Searches
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.correlationSearches}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Concurrent Users
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.concurrentUsers}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Data Distribution Across Network Traffic Data Model
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.networkTrafficTotal} GB</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Data Distribution Across Authentication Data Model
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.authenticationTotal} GB</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Data Distribution Across Web Data Model
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.webTotal} GB</Table.Cell>
                </Table.Row>
                {concurrency}
            </Table.Body>
        </Table>
    };

    render() {
        return (
            <div className='resource-panel'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Statistic.Group horizontal>
                                <Statistic>
                                    <Statistic.Value>{this.state.searchHeads}</Statistic.Value>
                                    <Statistic.Label>Search Heads</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <Statistic.Group color='green' size='tiny'>
                                <Statistic>
                                    <Statistic.Value>{this.state.shCPU}</Statistic.Value>
                                    <Statistic.Label>cores</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>{this.state.shMemory}</Statistic.Value>
                                    <Statistic.Label>(GB)RAM</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Statistic.Group horizontal>
                                <Statistic>
                                    <Statistic.Value>{this.state.indexers}</Statistic.Value>
                                    <Statistic.Label>Indexers</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <Statistic.Group color='green' size='tiny'>
                                <Statistic>
                                    <Statistic.Value>{this.state.idxCPU}</Statistic.Value>
                                    <Statistic.Label>cores</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>{this.state.idxMemory}</Statistic.Value>
                                    <Statistic.Label>(GB)RAM</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Grid.Column>
                        <Grid.Column width={6} verticalAlign='middle'>
                            <Button.Group>
                                <Button animated='fade' size='large' color='orange' onClick={this.doCalculate}>
                                    <Button.Content visible>
                                        <Icon name='calculator'/>
                                        Calculate
                                    </Button.Content>
                                    <Button.Content hidden>
                                        ES Sizing
                                    </Button.Content>
                                </Button>
                                {' '}
                                <Modal trigger={<Button icon><Icon name='setting'/></Button>}>
                                    <Modal.Header>ES Sizing Parameters</Modal.Header>
                                    <Modal.Content image>
                                        <Modal.Description>
                                            {this.renderParameters()}
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={15}>
                            <ConfigVizPanel searchHeads={this.state.searchHeads} indexers={this.state.indexers} data={this.state}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}