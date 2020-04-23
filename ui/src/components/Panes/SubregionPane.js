import React from 'react';

import Grid from '@material-ui/core/Grid';

import TabPanel from './TabPanel';
import TimeSeriesLineChart from '../TimeSeriesLineChart';

import {formatDateKey} from '../../util';

export default class SubregionPane extends React.Component {
  // For the charts, display up to 9 unique regions and then an "Others"
  // Regions to show should have highest totals (last item in totals array)
  render() {
    const {data, meta, view, index, value} = this.props;
    return (
      <TabPanel
        value={value}
        index={index}
        children={
          meta.subregions.length === 0 ? <div /> : Object.keys(data).map(series => {
            let regionTotals = Object.keys(data[series].data.regional).map(region => {
              let len = data[series].data.regions[region].total.length;
              return {region, total: data[series].data.regional[region].total[len -1]};
            }).sort((a,b) => b.total - a.total);

            let topRegionNames = regionTotals.slice(0,9).map(r => r.region);
            let otherRegionNames = regionTotals.slice(9).map(r => r.region);

            let regionData = topRegionNames.map(region => ({
                id: region,
                data: data[series].data.regional[region].daily.map((val,idx) => ({
                  x: formatDateKey(meta.columns[idx]),
                  y: val
                }))
            }));

            regionData.sort((a,b) => a.id < b.id ? 1 : -1);

            let otherRegionSums = Array.from({length: meta.columns.length}, n => 0);
            otherRegionNames.forEach((region) => {
              data[series].data.regional[region].daily.forEach((val,idx) => {
                otherRegionSums[idx] += val;
              })
            })

            // Add other to the front of the array
            regionData.unshift({
              id: "Other",
              data: otherRegionSums.map((val,idx) => ({
                x: formatDateKey(meta.columns[idx]),
                y: val
              }))
            });

            return (
              <Grid item key={`${series.id}-subregions`} style={{height:300}} sm={12} md={12}>
                <TimeSeriesLineChart
                  theme={view.theme}
                  title={series.id}
                  data={regionData}
                />
              </Grid>
            );
          })
        } />
    );
  }
}
