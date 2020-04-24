import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import {ResponsivePie} from '@nivo/pie';

import { uppercaseFirst, formatNumber } from '../../util';
import { light, dark } from '../../styles';

export default class TestingResults extends React.Component {
  render() {
    const { data, theme } = this.props;
    let palette = theme === 'light' ? light.palette : dark.palette;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Test Results</Typography>
        </Grid>
        <Grid item style={{height:250}} xs={12}>
          {
            !data
              ? <Typography variant="overline"> No Data For Region</Typography>
              : <ResponsivePie
                  data={
                    Object.keys(data).map(key => ({
                        id: key,
                        label: uppercaseFirst(key),
                        value: data[key]
                      }))
                  }
                  theme={{
                    tooltip: {
                      container: {
                        background: 'rbga(0,0,0,.5)',
                        boxShadow: 0
                      }
                    }
                  }}
                  margin={{ top: 30, left: 40 }}
                  innerRadius={0.7}
                  startAngle={270}
                  padAngle={2}
                  cornerRadius={3}
                  enableSlicesLabels={false}
                  colors={{ scheme: palette.nivo.pie.colors }}
                  borderWidth={1}
                  fitWidth={true}
                  borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor={palette.nivo.pie.text}
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={8}
                  radialLabelsLinkHorizontalLength={8}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{ from: 'color' }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#333333"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  tooltip={({ id, value, label, color }) => {
                    return (
                      <Paper style={{padding: 3}}>
                        <Typography variant="button">{formatNumber(value)}</Typography>
                      </Paper>
                    )
                  }}
                  defs={[
                      {
                          id: 'dots',
                          type: 'patternDots',
                          background: 'inherit',
                          color: 'rgba(255, 255, 255, 0.3)',
                          size: 4,
                          padding: 1,
                          stagger: true
                      },
                      {
                          id: 'lines',
                          type: 'patternLines',
                          background: 'inherit',
                          color: 'rgba(255, 255, 255, 0.3)',
                          rotation: -45,
                          lineWidth: 6,
                          spacing: 10
                      }
                  ]}
                  fill={[
                      {
                          match: {
                              id: 'pending'
                          },
                          id: 'dots'
                      },
                      {
                          match: {
                              id: 'negative'
                          },
                          id: 'lines'
                      },
                  ]}
                  legends={[
                      {
                          anchor: 'bottom-right',
                          direction: 'column',
                          translateX: 30,
                          translateY: 0,
                          itemWidth: 100,
                          itemHeight: 18,
                          itemTextColor: '#999',
                          symbolSize: 18,
                          symbolShape: 'circle',
                          effects: [
                              {
                                  on: 'hover',
                                  style: {
                                      itemTextColor: '#000'
                                  }
                              }
                          ]
                      }
                  ]}
                />
          }
        </Grid>
      </Grid>
    );
  }
}
