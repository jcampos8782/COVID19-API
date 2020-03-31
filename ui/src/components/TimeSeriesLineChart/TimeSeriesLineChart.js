import React from 'react';
import { ResponsiveLine } from '@nivo/line';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const DATE_FORMAT = new Intl.DateTimeFormat('en-US');

export default class TimeSeriesLineChart extends React.Component {

  render() {
    if (this.props.data.length === 0) {
      return <div/>
    }

    return (
      <ResponsiveLine
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        data={this.props.data}
        xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'day',
        }}
        yScale={{
            type: 'linear',
            stacked: false,
        }}
        xFormat={(d) => DATE_FORMAT.format(d)}
        enablePointLabel={false}

        axisBottom={{
            format: '%b %d',
            tickSize: 15,
            tickValues: 'every 7 days'
        }}
        pointSize={3}
        pointBorderWidth={1}
        pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
        }}
        useMesh={true}
        enableSlices={false}
        enableCrosshair={true}
        legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
        ]}
      />
    );
  }
}
