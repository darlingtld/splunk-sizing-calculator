import React, {Component} from 'react';
import {assign} from 'lodash';
import {Statistic, Grid, Button, Icon, Modal, Header, Table, Dropdown} from 'semantic-ui-react';
import ConfigVizPanel from "./ConfigVizPanel";
import {esCalculate} from "../calculation/esCalculator";
import jsPDF from 'jspdf';
import './ResourcePanel.scss';

export default class ResourcePanel extends Component {
    constructor(args) {
        super(args);
        this.state = {
            searchHeads: 0,
            indexers: 0,
            shCPU: 0,
            shMemory: 0,
            idxCPU: 0,
            idxMemory: 0,
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
        assign(this.props.data, {result});
        this.props.onChange();
    };

    exportAsPDF = () => {
        const {data} = this.props;
        const pdf = new jsPDF('p', 'pt', 'letter');
        pdf.setFontSize(15);
        const concurrency = data.parallelEnableChecked ?
            `
                <tr><td>Network Traffic Concurrency</td><td>${data.searchHeadCores}</td></tr>
                <tr><td>Authentication Concurrency</td><td>${data.indexerCores}</td></tr>
                <tr><td>Web Concurrency</td><td>${data.marginOfError}</td></tr>
            ` : '';
        const source = `
            <h2>ES Sizing Calculation Report</h2>
            <h3>ES Sizing Input Parameters</h3>
            <div>
                <table>
                    <thead>
                    <tr><th>Parameter</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Search Head</td><td>${data.searchHeadCores}</td></tr>
                        <tr><td>Indexer</td><td>${data.indexerCores}</td></tr>
                        <tr><td>Margin of Error%</td><td>${data.marginOfError}</td></tr>
                        <tr><td>Splunk Enterprise Version</td><td>${data.splunkVersion}</td></tr>
                        <tr><td>Enterprise Security Version</td><td>${data.esVersion}</td></tr>
                        <tr><td>Enabled Correlation Searches</td><td>${data.correlationSearches}</td></tr>
                        <tr><td>Concurrent Users</td><td>${data.concurrentUsers}</td></tr>
                        <tr><td>Data Distribution Across Network Traffic Data Model</td><td>${data.networkTrafficTotal} GB</td></tr>
                        <tr><td>Data Distribution Across Authentication Data Model</td><td>${data.authenticationTotal} GB</td></tr>
                        <tr><td>Data Distribution Across Web Data Model</td><td>${data.webTotal} GB</td></tr>
                        ${concurrency}
                    </tbody>
                </table>
            </div>
            <h3>ES Sizing Results</h3>
            <div>
                <table>
                    <thead>
                    <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Number of Search Heads</td><td>${data.result.shNum}</td></tr>
                        <tr><td>CPU cores per Search Head</td><td>${data.result.shCPU}</td></tr>
                        <tr><td>Memory per Search Heads</td><td>${data.result.shMemory} GB</td></tr>
                        <tr><td>Number of Indexers</td><td>${data.result.idxNum}</td></tr>
                        <tr><td>CPU cores per Indexer</td><td>${data.result.idxCPU}</td></tr>
                        <tr><td>Memory per Indexer</td><td>${data.result.idxMemory} GB</td></tr>
                        <tr><td>Search CPU % Per Search Head</td><td>${data.result.searchCPUPerSH.toFixed(2)}%</td></tr>
                        <tr><td>Idle CPU % Per Search Head</td><td>${100 - data.result.searchCPUPerSH.toFixed(2)}%</td></tr>
                        <tr><td>Search CPU % Per Indexer</td><td>${data.result.searchCPUPerIndexer.toFixed(2)}%</td></tr>
                        <tr><td>DMA CPU % Per Indexer</td><td>${data.result.dmaCPUPerIndexer.toFixed(2)}%</td></tr>
                        <tr><td>Idle CPU % Per Indexer</td><td>${(100 - data.result.searchCPUPerIndexer - data.result.dmaCPUPerIndexer).toFixed(2)}%</td></tr>
                    </tbody>
                </table>
            </div>
            `;

        const margins = {
            top: 10,
            left: 60,
            width: 600
        };

        pdf.fromHTML(
            source // HTML string or DOM elem ref.
            , margins.left // x coord
            , margins.top // y coord
            , {
                'width': margins.width // max width of content on PDF
            },
            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                // this allow the insertion of new lines after html
                pdf.save('es_sizing_calculation_results.pdf');
            }
        )
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
                                <Button.Group>
                                    <Dropdown icon='anchor' floating button className='icon'>
                                        <Dropdown.Menu className='left'>
                                            <Modal trigger={<Dropdown.Item>
                                                <Icon name='settings'/>
                                                <span className='text'>View Settings</span>
                                            </Dropdown.Item>}>
                                                <Modal.Header>ES Sizing Parameters</Modal.Header>
                                                <Modal.Content image>
                                                    <Modal.Description>
                                                        {this.renderParameters()}
                                                    </Modal.Description>
                                                </Modal.Content>
                                            </Modal>
                                            <Modal
                                                trigger={<Dropdown.Item>
                                                    <Icon name='file pdf outline'/>
                                                    <span className='text'>Export PDF</span>
                                                </Dropdown.Item>}
                                                header='Export'
                                                content='Export the sizing calculation result to PDF?'
                                                actions={[
                                                    'No',
                                                    {
                                                        key: 'yes',
                                                        content: 'Yes',
                                                        positive: true,
                                                        onClick: this.exportAsPDF
                                                    },
                                                ]}
                                            />

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Button.Group>
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={15}>
                            <ConfigVizPanel searchHeads={this.state.searchHeads} indexers={this.state.indexers}
                                            data={this.props.data}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}