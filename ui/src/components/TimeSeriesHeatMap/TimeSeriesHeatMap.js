import React from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import ColorableCell from './ColorableCell';

import { ResponsiveHeatMap } from '@nivo/heatmap'
import {light, dark} from '../../styles';

const DATE_FORMAT = new Intl.DateTimeFormat('en-US');

const Palette = colors => ( value => {
  let c;
  if (value === 0) {
    c = colors.emptyColor;
  } else if (value < 5) {
    c = colors.spectrum[0];
  } else if (value < 10) {
    c = colors.spectrum[1];
  } else if (value < 15) {
    c = colors.spectrum[2];
  } else if (value < 20) {
    c = colors.spectrum[3];
  } else {
    c = colors.spectrum[4];
  }
  return c;
});

const lightPalette = Palette(light.palette.nivo.heatmap.colors);
const darkPalette = Palette(dark.palette.nivo.heatmap.colors);

export default class TimeSeriesHeatMap extends React.Component {
  render() {
    const {keys, classes, data, theme } = this.props;
    let palette = theme === 'light' ?  lightPalette: darkPalette;
    let styles = theme === 'light' ? light : dark;

    return (
      <ResponsiveHeatMap
        keys={keys}
        indexBy="series"
        margin={{left: 60}}
        cellShape={props => ColorableCell({...props, palette})}
        enableLabels={false}
        labelTextColor={styles.palette.text.primary}
        axisTop={null}
        axisBottom={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legendOffset: 36
        }}
        axisRight={null}
        minValue={-100}
        maxValue={300}
        data={data}
        cellOpacity={1}
        defs={[
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(0, 0, 0, 0.1)',
                rotation: -45,
                lineWidth: 4,
                spacing: 7
            }
        ]}
        fill={[ { id: 'lines' } ]}
        animate={false}
        hoverTarget="cell"
        tooltip={({ xKey, yKey, value, color }) => {
          let iconClass = value < 0 ? 'fas fa-arrow-down xs' : ' fas fa-arrow-up xs';
          let iconColor = value < 0 ? classes.green : classes.red;
          let date = new Date(Date.parse(xKey));
          let lastWeek = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 7);
          return (
            <Paper style={{padding: 3}}>
              <Typography variant="button" display="block">{DATE_FORMAT.format(date)}</Typography>
              <Icon className={`${iconClass} ${classes.xsIcon} ${iconColor}`}/> {value}% from {DATE_FORMAT.format(lastWeek)}
            </Paper>
          )
        }}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: styles.palette.text.primary
              }
            }
          },
          tooltip: {
            container: {
              background: 'rbga(0,0,0,.5)',
              boxShadow: 0
            }
          }
        }}
      />
    )
  }
}
