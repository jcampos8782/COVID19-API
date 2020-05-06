import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Defs } from '@nivo/core'
import { area, curveMonotoneX } from 'd3-shape'

import TimeSeriesLineChart from '../TimeSeriesLineChart';

import { formatDateKey } from '../../util';
import { light, dark } from '../../styles';

const MIN = .7;
const MAX = 1.7;

export default class Recent extends React.Component {
  render() {
    const {
      theme,
      data,
      columns,
      sipOrderDate
    } = this.props;

    if (!data) {
      return <CircularProgress style={{margin:150}} />
    }

    const { palette } = theme === 'light' ? light : dark;

    return (
      <Grid container style={{paddingTop: 10}}>
        <Grid item xs={12}>
          <Typography variant="h6">Effective Reproduction Rate (R<sub>t</sub>)</Typography>
        </Grid>
        <Grid item xs={12}>
          {
            Object.keys(data).length === 0 ? <Typography variant="overline">No Data</Typography> :
            <>
              <Grid container>
                <Grid item xs={12} md={6}>
                </Grid>
              </Grid>
              <Grid container style={{height: 300}}>
                <TimeSeriesLineChart
                  theme={theme}
                  labelFormat={v => v.toFixed(2)}
                  min={MIN}
                  max={MAX}
                  layers={[
                    'grid',
                    'markers',
                    'areas',
                    AreaLayer(data, palette),
                    'lines',
                    'slices',
                    'axes',
                    'points'
                ]}
                  curve="monotoneX"
                  areaBaselineValue={1}
                  lineWidth={2}
                  enablePoints={false}
                  enableGridX={false}
                  enableArea={false}
                  markers={generateMarkers(sipOrderDate, palette)}
                  data={
                    [{
                      id: "median",
                      data: data.median
                        ? data["median"].map((val, idx) => ({
                            x: formatDateKey(columns[idx]),
                            y: val
                          }))
                        : []
                    },

                  ]
                  }
                />
              </Grid>
            </>
          }
        </Grid>
      </Grid>
    );
  }
}

const generateMarkers = (sipOrderDate, palette) => {
  let markers = [
    {
      axis: 'y',
      value: 1,
      lineStyle: {
        stroke: palette.nivo.bar.itemTextColor,
        strokeWidth: 3,
        strokeDasharray: '12, 8',
      },
      legend: "Spreading/Slowing"
    }
  ];

  if (sipOrderDate) {
    markers.push({
      axis: 'x',
      value: sipOrderDate,
      legend: "Shelter-in-Place Order",
      lineStyle: {
        strokeDasharray: '1, 8',
        strokeWidth: 3,
        strokeLinejoin: 'round',
        strokeLinecap: 'round'
      },
      textStyle: {
        fill: palette.nivo.line.text
      },
      legendOffsetY: 50
    });
  }

  return markers
}

const AreaLayer = (data, palette) => (props) => {
  let { series, xScale, yScale, innerHeight } = props;

    const lower90 = area()
        .x(d => xScale(d.data.x))
        .y0((d,idx) => data["lower_90"][idx] > MIN ? yScale(data["lower_90"][idx]) : innerHeight)
        .y1((d,idx) => yScale(d.data.y))
        .curve(curveMonotoneX);

    const upper90 = area()
        .x(d => xScale(d.data.x))
        .y0((d,idx) => yScale(d.data.y))
        .y1((d,idx) => yScale(data["upper_90"][idx]))
        .curve(curveMonotoneX);

      const lower50 = area()
          .x(d => xScale(d.data.x))
          .y0((d,idx) => data["lower_50"][idx] > MIN ? yScale(data["lower_50"][idx]) : innerHeight)
          .y1((d,idx) => yScale(d.data.y))
          .curve(curveMonotoneX);

      const upper50 = area()
          .x(d => xScale(d.data.x))
          .y0((d,idx) => yScale(d.data.y))
          .y1((d,idx) => yScale(data["upper_50"][idx]))
          .curve(curveMonotoneX);

      const goodArea = area()
        .x(d => xScale(d.data.x))
        .y0(d => yScale(1))
        .y1(d => yScale(.7));

      const badArea = area()
        .x(d => xScale(d.data.x))
        .y0(d => yScale(1))
        .y1(d => yScale(1.7));

    return (
        <>
            <Defs
                defs={[
                  {
                      id: 'fill',
                      type: 'patternLines',
                      background: palette.primary.light,
                      color: palette.primary.light,
                  },
                  {
                      id: 'good',
                      type: 'patternLines',
                      background: palette.success.light,
                      color: palette.success.light,
                  },
                  {
                      id: 'bad',
                      type: 'patternLines',
                      background: palette.error.light,
                      color: palette.error.light,
                  }
                ]}
            />
            <path
                d={upper90(series[0].data)}
                fill="url(#fill)"
                fillOpacity={0.3}
                strokeWidth={0}
            />

            <path
                d={lower90(series[0].data)}
                fill="url(#fill)"
                fillOpacity={0.3}
                strokeWidth={0}
            />

            <path
                d={upper50(series[0].data)}
                fill="url(#fill)"
                fillOpacity={0.5}
                strokeWidth={0}
            />

            <path
                d={lower50(series[0].data)}
                fill="url(#fill)"
                fillOpacity={0.5}
                strokeWidth={0}
            />

            <path
              d={goodArea(series[0].data)}
              fill="url(#good)"
              fillOpacity={.2}
              strokeWidth={0}
            />

            <path
              d={badArea(series[0].data)}
              fill="url(#bad)"
              fillOpacity={.2}
              strokeWidth={0}
            />
        </>
    )
}
