import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar'
import {light, dark} from '../../styles/themes';

// HACK!
const colors = theme => {
  let palette = theme.palette;
  let type = palette.type;
  return {
    colors: [
      palette.success.light,
      palette.success.main,
      palette.success.dark,
      palette.warning.light,
      palette.warning.main,
      palette.warning.dark,
      palette.error.light,
      palette.error.main,
      palette.error.dark
    ],
    dayBorderColor: type === 'light' ? palette.grey[300] : palette.grey[600],
    monthBorderColor: palette.grey[900],
    emptyColor: palette.background.default,
    text: palette.text.primary
  }
}

export default class HeatCalendar extends React.Component {

  render() {
    const {data, theme} = this.props;
    let palette = colors(theme === 'light' ? light : dark)
    // find average
    let max = data.reduce((max,d) => d.value > max ? d.value : max, 0)
    return (
      <ResponsiveCalendar
        from="2020-1-01"
        to="2020-12-31"
        colors={palette.colors}
        monthLegendPosition="before"
        textColor="white"
        align='left'
        margin={{left:40, bottom:20}}
        monthLegendOffset={-20}
        monthBorderWidth={2}
        theme={{labels: {text: {fill: palette.text}}}}
        dayBorderColor={palette.dayBorderColor}
        monthBorderColor={palette.monthBorderColor}
        data={data}
        minValue={0}
        maxValue={max}
        emptyColor={palette.emptyColor}
        />
      );
  }
}
