import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ResponsiveCalendar } from '@nivo/calendar'
import {light, dark} from '../../styles/themes';

const DATE_FORMAT = new Intl.DateTimeFormat('en-US');

export default class HeatCalendar extends React.Component {

  render() {
    const {from, to, data, theme} = this.props;
    let { palette } = theme === 'light' ? light : dark;

    // find average
    let max = data.reduce((max,d) => d.value > max ? d.value : max, 0)
    return (
      <ResponsiveCalendar
        from={from}
        to={to}
        colors={palette.nivo.calendar.colors}
        monthLegendPosition="before"
        align='left'
        margin={{left:40, top:20, bottom:20, right:40}}
        monthLegendOffset={3}
        monthBorderWidth={2}
        theme={{
          labels: {
            text: {
              fill: palette.nivo.calendar.text
            }
          },
          tooltip: {
            container: {
              background: 'rbga(0,0,0,.5)',
              boxShadow: 0
            }
          }
        }}
        dayBorderColor={palette.nivo.calendar.dayBorderColor}
        monthBorderColor={palette.nivo.calendar.monthBorderColor}
        data={data}
        minValue={0}
        maxValue={max}
        emptyColor={palette.nivo.calendar.emptyColor}
        tooltip={({date,value,color}) => (
          <Container>
            <Paper elevation={3} style={{padding: 10}}>
              <Typography variant="body2" display="block">
                <strong>{DATE_FORMAT.format(date)}</strong>: {value}
              </Typography>
            </Paper>
          </Container>
        )}
        />
      );
  }
}
