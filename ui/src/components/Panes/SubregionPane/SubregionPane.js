import React from 'react';

import Grid from '@material-ui/core/Grid';

import TabPanel from '../TabPanel';
import TimeSeriesLineChart from '../../TimeSeriesLineChart';

import {formatDateKey} from '../../../util';

export default class SubregionPane extends React.Component {
  // For the charts, display up to 9 unique regions and then an "Others"
  // Regions to show should have highest totals (last item in totals array)
  render() {
    const {
      data,
      theme,
      columns,
      title,
      index,
      value
    } = this.props;

    return (
      <TabPanel
        value={value}
        index={index}
        children={
          Object.keys(data).map(series => {
            let { top, others } = data[series];

            // Convert to point format for graph
            let points = Object.keys(top).map(region => ({
              id: region,
              data: top[region].daily.map((val,idx) => ({
                x: formatDateKey(columns[idx]),
                y: val
              }))
            }));

            // Prepend the others data. The graphs display backwards
            points.push({
              id: "All Others",
              data: others.map((val,idx) => ({
                x: formatDateKey(columns[idx]),
                y: val
              }))
            });

            // The graph displays points descending
            points.reverse();

            return (
              <Grid item key={`${series}-subregions`} style={{height:300}} sm={12} md={12}>
                <TimeSeriesLineChart
                  theme={theme}
                  title={title}
                  data={points}
                />
              </Grid>
            );
          })
        } />
    );
  }
}
