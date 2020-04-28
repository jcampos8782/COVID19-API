import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {light, dark} from '../../styles';

const DATE_FORMAT = new Intl.DateTimeFormat('en-US');

export default class TimeSeriesLineChart extends React.Component {

  render() {
    const {
      data,
      theme,
      curve,
      layers,
      colors, 
      labelFormat = x => x
    } = this.props;

    let palette = theme === 'light' ? light.palette : dark.palette;
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
        margin={{ top: 0, right: 30, bottom:80, left: 50 }}
        data={data}
        colors={{scheme: (colors ? colors : palette.nivo.line.colors)}}
        curve={ curve ? curve : "linear"}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: palette.nivo.line.text
              }
            }
          }
        }}
        sliceTooltip={({slice}) => {
          // All dates for a slice are the same
          let date = slice.points[0].data.xFormatted;
          return (
            <Paper style={{padding: 3}}>
              <Typography variant='button' display="block">{date}</Typography>
              <List dense style={{padding:0}}>
              {
                slice.points.map(point => (
                  <ListItem key={point.id} style={{padding: 0}}alignItems="flex-start" justify="flex-start">
                    <ListItemIcon style={{marginTop: 10, minWidth:15}}>
                      <Icon fontSize="small" className="fas fa-circle xs" style={{color: point.serieColor, fontSize: ".75em", paddingRight: 0}}/>
                    </ListItemIcon>
                    <ListItemText>
                        <strong>{point.serieId}</strong>: {labelFormat(point.data.yFormatted)}
                    </ListItemText>
                  </ListItem>
                ))
              }
              </List>
            </Paper>
          )
        }}
        xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'day',
            useUTC: false
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
            tickValues: maxSeriesLength > 7 ? 'every 7 days' : 'every day',
            itemTextColor: palette.nivo.line.text,
            tickRotation: 30
        }}
        pointSize={5}
        pointBorderWidth={1}
        pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.5]],
        }}
        useMesh={true}
        enableSlices="x"
        animate={true}
        layers={layers}
        legends={[
          {
              anchor: 'top-left',
              direction: 'column',
              justify: false,
              translateX: 5,
              translateY: 10,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 15,
              itemOpacity: 1.00,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              itemTextColor: palette.nivo.line.text,
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
