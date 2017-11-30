import React, {Component} from 'react';
import {Tab, Menu, Dropdown, Header, Message} from 'semantic-ui-react';

export default class ConfigParallelTuningConfPanel extends Component {
    constructor(args) {
        super(args);
        this.options = [
            {
                key: 'search head',
                value: 'search head',
                text: 'search head'
            },
            {
                key: 'indexer',
                value: 'indexer',
                text: 'indexer'
            }
        ];
        this.searchHeadPanes = [
            {menuItem: 'local', render: this.renderLocal},
            {menuItem: 'server.conf', render: this.renderServerConf},
            {menuItem: 'limits.conf', render: this.renderLimitsConf},
        ];
        this.indexerPanes = [
            {menuItem: 'indexes.conf', render: this.renderIndexesConf},
        ];
        this.state = {type: 'search head', panes: this.searchHeadPanes, activeIndex: 0};
    }

    handleTypeChange = (event, data) => {
        this.setState(
            {
                type: data.value,
                panes: data.value === 'search head' ? this.searchHeadPanes : this.indexerPanes,
                activeIndex: 0
            }
        )
    };

    renderServerConf = () => {
        if (!this.props.data.result || !this.props.data.result.tuningConfiguration) {
            return;
        }
        return (
            <Tab.Pane attached={false}>
                <Header size='small'>
                    {`\${SPLUNK_HOME}/etc/system/local/server.conf`}
                </Header>
                [general]<br/>
                {`parallelIngestionPipelines=${this.props.data.result.tuningConfiguration.parallelIngestionPipelines}`}<br/>
            </Tab.Pane>
        )
    };

    renderLocal = () => {
        if (!this.props.data.result || !this.props.data.result.tuningConfiguration) {
            return;
        }
        return (
            <Tab.Pane attached={false}>
                <Header size='small'>
                    {`\${SPLUNK_HOME}/etc/apps/Splunk_SA_CIM/local`}
                </Header>
                [Network_Traffic]<br/>
                {`acceleration.max_concurrent=${this.props.data.result.tuningConfiguration.max_concurrent.network_traffic}`}<br/>
                {`acceleration.cron_schedule=${this.props.data.result.tuningConfiguration.cron_schedule}`}<br/>
                {`acceleration.poll_buckets_until_maxtime=${this.props.data.result.tuningConfiguration.poll_buckets_until_maxtime}`}<br/>
                [Web]<br/>
                {`acceleration.max_concurrent=${this.props.data.result.tuningConfiguration.max_concurrent.web}`}<br/>
                {`acceleration.cron_schedule=${this.props.data.result.tuningConfiguration.cron_schedule}`}<br/>
                {`acceleration.poll_buckets_until_maxtime=${this.props.data.result.tuningConfiguration.poll_buckets_until_maxtime}`}<br/>
                [Authentication]<br/>
                {`acceleration.max_concurrent=${this.props.data.result.tuningConfiguration.max_concurrent.authentication}`}<br/>
                {`acceleration.cron_schedule=${this.props.data.result.tuningConfiguration.cron_schedule}`}<br/>
                {`acceleration.poll_buckets_until_maxtime=${this.props.data.result.tuningConfiguration.poll_buckets_until_maxtime}`}
            </Tab.Pane>
        )
    };

    renderLimitsConf = () => {
        if (!this.props.data.result || !this.props.data.result.tuningConfiguration) {
            return;
        }
        return (
            <Tab.Pane attached={false}>
                <Header size='small'>
                    {`\${SPLUNK_HOME}/etc/system/local/limits.conf`}
                </Header>
                [summarize]<br/>
                {`bucket_refresh_interval_cluster=${this.props.data.result.tuningConfiguration.bucket_refresh_interval_cluster}`}<br/>
                {`bucket_refresh_interval=${this.props.data.result.tuningConfiguration.bucket_refresh_interval}`}<br/>
            </Tab.Pane>
        )
    };

    renderIndexesConf = () => {
        if (!this.props.data.result || !this.props.data.result.tuningConfiguration) {
            return;
        }
        return (
            <Tab.Pane attached={false}>
                <Header size='small'>
                    {`\${SPLUNK_HOME}/etc/system/local/indexes.conf`}
                </Header>
                {`[<index_name>]`}<br/>
                {`maxHotBuckets=${this.props.data.result.tuningConfiguration.maxHotBuckets}`}<br/>
            </Tab.Pane>
        )
    };

    handleTabChange = (event, data) => {
        this.setState({activeIndex: data.activeIndex})
    };

    render() {
        if (!this.props.data.result || !this.props.data.result.tuningConfiguration) {
            return <div>
                <Message>
                    <Message.Header>
                        No data
                    </Message.Header>
                    <p>
                        Please click the calculate button at the top right corner to do the calculation first.
                    </p>
                </Message>
            </div>;
        }
        return (
            <div>
                <Menu compact>
                    <Dropdown defaultValue={this.options[0].value} options={this.options} item
                              onChange={this.handleTypeChange}/>
                </Menu>
                <Tab menu={{secondary: true, pointing: true}} panes={this.state.panes}
                     onTabChange={this.handleTabChange} activeIndex={this.state.activeIndex}/>
            </div>
        )
    }
}