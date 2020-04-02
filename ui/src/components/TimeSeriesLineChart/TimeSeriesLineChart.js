import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const DATE_FORMAT = new Intl.DateTimeFormat('en-US');
const DEFAULT_COLOR_SCHEME = "nivo";

export default class TimeSeriesLineChart extends React.Component {

  render() {
    const { data, view } = this.props;

    if (data.length === 0) {
      return <div/>
    }

    const maxSeriesLength = data.reduce((max,series) =>
      series.data.length > max ? series.data.length : max, 0);

    let maxValue = data.reduce((max,series) => {
      let localMax = series.data.reduce((local,val) => val.y > local ? val.y : local, 0);
      return localMax > max ? localMax : max;
    }, 0);

    let yMax = maxValue + Math.ceil(maxValue/10);

    return (
      <ResponsiveLine
        margin={{ top: 0, right: 110, bottom: 80, left: 60 }}
        data={data}
        colors={{ scheme: view && view.scheme ? view.scheme : DEFAULT_COLOR_SCHEME}}
        xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'day',
        }}
        yScale={{
            type: 'linear',
            stacked: false,
            max: yMax > 10 ? yMax : 10,
            min: 0
        }}
        xFormat={(d) => DATE_FORMAT.format(d)}
        enablePointLabel={false}
        enableArea={true}
        axisBottom={{
            format: '%b %d',
            tickSize: 15,
            tickValues: maxSeriesLength > 7 ? 'every 7 days' : 'every day'
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
