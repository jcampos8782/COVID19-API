import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';

export default class TimeSeriesLineChart extends React.Component {

  render() {
    if (this.props.data.length === 0) {
      return <div/>
    }
    
    return (
      <ResponsiveBarCanvas
        data={this.props.data}
        keys={this.props.keys}
        margin={{ top: 100, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ "scheme": "spectral" }}
        enableLabel={true}
        labelSkipWidth={10}
        labelSkipHeight={25}
        axisBottom={null}
        axisTop={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: this.props.title,
            legendPosition: 'middle',
            legendOffset: -50
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
    );
  }
}
